module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define("CartProduct", {
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "User",
    //     key: "id",
    //   },
    //   onDelete: "CASCADE",
    //   unique: "coUnique",
    // },
    // product_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Product",
    //     key: "id",
    //   },
    // onDelete: "CASCADE",
    // unique: "coUnique",
    // },
  });

  return CartProduct;
};
