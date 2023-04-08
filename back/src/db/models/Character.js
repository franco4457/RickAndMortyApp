const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Character",
    {
      id: {
        type: DataTypes.INTEGER,
      //   autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Alive", "Dead", "unknown"),
        defaultValue: "Alive",
      },
      species: DataTypes.STRING,

      gender: {
        type: DataTypes.ENUM("Female", "Male", "Genderless", "unknown"),
        defaultValue: "unknown",
      },
      origin: DataTypes.STRING,

      image: DataTypes.STRING,

      location: DataTypes.STRING,
    },
    { timestamps: false }
  );
};
