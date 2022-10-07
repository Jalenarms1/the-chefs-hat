// Place script code for helper functions here
const { Owner, Meal, MainCourse, Side, Drink, Dessert, Restaurant } = require("../models");

module.exports = {
    loginCheck: (req, res, next) =>{
        if(!req.session.isLoggedIn){
            res.render("login", {
                isLoggedIn: req.session.isLoggedIn,
                
            })
        }else{
            next();
        }
    },

    loginCheckForHomePage: async (req, res, next) => {
        if(req.session.isLoggedIn){
            try {
                let currOwner = await Owner.findByPk(req.session.user_id, {
                    include: [{model: Restaurant}]
                })
        
                let pureOwnerData = currOwner.get({plain: true});
                
        
                let mealsData = await Meal.findAll({
                    where: {
                        restaurantId: pureOwnerData.restaurant.id
                    },
                    include: [{model: MainCourse}, {model: Side}, {model: Dessert}, {model: Drink}]
                })
        
        
                let allMeals = mealsData.map(item => {
                    return item.get({plain:true})
                })
                
        
            
        
                if(pureOwnerData && allMeals){
                    res.render("user-profile", {
                        isLoggedIn: req.session.isLoggedIn,
                        currUserId: req.session.user_id,
                        owner: pureOwnerData,
                        meals: allMeals
        
        
                    })
                }
            } catch(err){
                console.log(err);
                res.json(err);
            }

        }else{
            next();
        }
    }

}