const {User} = require("../models");

exports.sigUp = async (req, res) => {
  try {
    await User.create({email: "email", password: "password"});
    res.status(201).json({message: "success"});
  } catch (error) {
    res.status(500).json({error: error.message}); //internal server error
  }
};
