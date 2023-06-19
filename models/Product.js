module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    picURL: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,

      validate: {
        notEmpty: true,
      },
    },
    // numberOfRaters: {},
  });

  return Product;
};
