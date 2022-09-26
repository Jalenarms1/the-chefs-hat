const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MealTicket extends Model {}

MealTicket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        mealId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'meal',
                key: 'id'
            }
        },
        mainCourseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'main_course',
                key: 'id'
            }
        },
        sideId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'side',
                key: 'id'
            }
        },
        dessertId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dessert',
                key: 'id'
            }
        },
        drinkId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'drink',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: "meal_ticket"
    }
);

module.exports = MealTicket;