const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Dessert extends Model {};

Dessert.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calories: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'resturant',
                key: 'id'
                
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'dessert'
    }
);

module.exports = Dessert;