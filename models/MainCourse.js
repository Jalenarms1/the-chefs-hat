const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MainCourse extends Model {}

MainCourse.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
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
        modelName: 'main_course'
    }
);

module.exports = MainCourse;