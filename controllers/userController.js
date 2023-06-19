const { User } = require("../models");

const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

const validatePassword = (password, verifyPassword) => {
  if (password.length < 8 || password.length > 20) return false;
  return password === verifyPassword;
};

// [userID]
const createToken = (userID) => {
  const access_token = jsonwebtoken.sign(
    { user_id: userID },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const refresh_token = jsonwebtoken.sign(
    { user_id: userID },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "80d",
    }
  );
  return { access_token, refresh_token };
};

// [email, password, verifyPassword,firstName,lastName]
exports.sigUp = async (req, res) => {
  try {
    const { email, password, verifyPassword, firstName, lastName } = req.body;

    if (!validatePassword(password, verifyPassword))
      return res.status(400).json({
        message:
          "Password And VerifyPassword Must Match And The Length Need To Be More Then 8 Char And Less Then 20 Char",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email,
      password: hashPassword,
      firstName,
      lastName,
    });
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [email, password]
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user == null)
      return res.status(400).json({ message: "User Not Found" });

    const bcryptPassword = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!bcryptPassword)
      return res.status(400).json({ message: "Password Incorrect" });
    console.log(
      user.id,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET
    );
    const { access_token, refresh_token } = createToken(user.id);

    res
      .status(200)
      .cookie("refresh_token", refresh_token, {
        maxAge: 900000,
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      })
      .json({ message: "login", token: access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("refresh_token")
      .json({ message: "Delete Cookie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    console.log("refreshToken");
    const cookiesArray = req.headers.cookie.split(";");
    let refreshToken = null;

    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key == "refresh_token") refreshToken = value;
    });
    console.log(refreshToken, "refreshToken2");
    const verifyRefreshToken = jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!verifyRefreshToken)
      return res.status(401).json({ message: "Invalid Refresh Token" });

    const { access_token } = createToken(verifyRefreshToken.user_id);
    res
      .status(200)
      .json({ message: "Token Refresh", newAccessToken: access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userID = req.userID;

    const user = await User.findByPk(userID);
    if (!user) return res.status(400).json({ message: "User Not Found" });
    res
      .status(200)
      .json({
        message: "User Found",
        user: { firstName: user.firstName, lastName: user.lastName },
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
