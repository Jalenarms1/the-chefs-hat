// Place script code for models here
// Place script code for models here
const  Restaurant  = require("./Restaurant");
const  Owner  = require("./Owner");
const  Meal  = require("./Meal");
const  MainCourse  = require("./MainCourse");
const  Side  = require("./Side");
const  Drink  = require("./Drink");
const  Dessert  = require("./Dessert");
const  Review  = require("./Review");
const MealTicket = require("./MealTicket");

Restaurant.hasOne(Owner, {
    foreignKey: 'owner_id'
});

Owner.belongsTo(Restaurant, {
    foreignKey: 'owner_id'
});

Restaurant.hasMany(Meal, {
    foreignKey: 'restaurant_id'
});

Meal.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id'
});

Meal.hasMany(Review, {
    foreignKey: 'meal_id'
});

Review.belongsTo(Meal, {
    foreignKey: 'meal_id'
});

Meal.belongsToMany(MainCourse, {
    through: {
        model: 'meal_ticket',
        unique: false
    }
});

MainCourse.belongsToMany(Meal, {
    through: {
        model: 'meal_ticket',
        unique: false
    }
});

Meal.belongsToMany(Side, {
    through: {
        model: 'meal_ticket',
        unique: false
}});

Side.belongsToMany(Meal, {
    through: {
        model: 'meal_ticket',
        unique: false
    }
});

Meal.belongsToMany(Dessert, {
    through: {
        model: 'meal_ticket',
        unique: false
    }})

Dessert.belongsToMany(Meal, {
    through: {
        model: 'meal_ticket',
        unique: false
    }
});

Meal.belongsToMany(Drink, {
    through: {
        model: 'meal_ticket',
        unique: false
    }});

Drink.belongsToMany(Meal, {
    through: {
        model: 'meal_ticket',
        unique: false
    }
})

module.exports = {
    Restaurant,
    Owner,
    Meal,
    MainCourse,
    Side,
    Drink,
    Dessert,
    Review,
    MealTicket
}

