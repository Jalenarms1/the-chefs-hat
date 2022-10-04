const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Meal extends Model {
    async getMealPic(id){
        try{
            let response = await cloudinary.search.expression(`public_id:${id}`).execute()
            console.log(response);
            return response

        } catch(err){
            console.log(err);
            
        }
        
    };

    getTotalCalories(arr){
        let totalCal = 0;



        arr.main_courses.map(main => {
            totalCal += main.calories
        })
        console.log(totalCal);
        console.log("--");
        arr.sides.map(side => {
            totalCal += side.calories
        })
        console.log(totalCal);
        console.log("--");
        arr.drinks.map(drink => {
            totalCal += drink.calories
        })
        console.log(totalCal);
        console.log("--");
        arr.desserts.map(dessert => {
            totalCal += parseInt(dessert.calories)
        })

        return totalCal
    }
}

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