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
        // notEmpty: true,
      },
    },
    picURL: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        // notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: true,
        min: 0,
      },
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,

      validate: {
        notEmpty: true,
        min: 0,
      },
    },
    // numberOfRaters: {},
  });

  return Product;
};
