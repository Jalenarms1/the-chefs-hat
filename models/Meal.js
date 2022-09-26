const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Meal extends Model {}

Meal.init(
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
        restaurantId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'restaurant',
                key: 'id'
            }
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'meal'
    }
);

module.exports = Meal;