const router = require("express").Router();
const {
    Restaurant,
    Owner,
    Meal,
    MainCourse,
    Side,
    Drink,
    Dessert,
    Review,
    MealTicket
} = require("../models");
const { loginCheck } = require("../utils/helpers");
const cloudinary = require("cloudinary").v2;

// main page that will prompt user for choice between viewing catalog of reataurants, signing up or loggin in
router.get("/", (req, res) => {



    res.render("homepage", {
        isLoggedIn: req.session.isLoggedIn,
        currUserId: req.session.user_id
    });
})

router.get("/signup", (req, res) => {
    res.render("signup", {
        isLoggedIn: req.session.isLoggedIn,
        currUserId: req.session.user_id
    })
})

router.get("/login", (req, res) => {
    res.render("login", {
        isLoggedIn: req.session.isLoggedIn,
        currUserId: req.session.user_id
    });
})

// when user chooses to search through restaurants rather than login or sign up
router.get("/catalog", async (req, res) => {
    try{
        let restaurantList = await Restaurant.findAll();

        let restaurants = restaurantList.map(item => {
            return item.get({plain: true})
        })
        



        res.render('cx-restaurant-views', {
            isLoggedIn: req.session.isLoggedIn,
            restaurants
        })

    } catch(err){
        console.log(err);
        res.json(err)
    }

})

// if the user clicks on a particular restaurant to view
router.get("/catalog/:id", (req, res) => {

})

// when a non-account-holder trys to access a certail meal within that restaurant's menu
router.get("/catalog/:id/:mealId/", (req, res) => {

})

// when a non-account-holder trys to access a certail meal's reviews 
router.get("/catalog/:id/:mealId/reviews", (req, res) => {

})

// page to add individual items
router.get("/user/add", loginCheck, (req, res) => {
    res.render("addnewfoods", {
        isLoggedIn: req.session.isLoggedIn,
        currUserId: req.session.user_id
    })
})

// page to construct a meal 
router.get("/user/create", loginCheck, async (req, res) => {
    try{
        let mealItems = await Restaurant.findOne({
            where: {
                id: req.session.user_id
            },
            include: [{model: MainCourse}, {model: Side}, {model: Dessert}, {model: Drink}]
        })

        let pureMealItemList = mealItems.get({plain: true});
        console.log(pureMealItemList);

        res.render("mealcreation", {
            isLoggedIn: req.session.isLoggedIn,
            currUserId: req.session.user_id,
            mealItems: pureMealItemList
        })
    } catch(err){
        console.log(err);
        res.json(err)
    }

})

// will load up related-info for the logged-in user on the profile/dashboard-- currUser id
router.get("/user/profile", loginCheck, async (req, res) => {
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

        // console.log(mealsData);

        let allMeals = mealsData.map(item => {
            return item.get({plain:true})
        })
        
        console.log(allMeals);

    
        console.log("Gage timing");

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
})

// when initiated, will load up the chosen item of the user's menu that they want to view
router.get("/user/meal/:id", loginCheck, async (req, res) => {
    try{
        let getMeal = await Meal.findByPk(req.params.id, {
            include: [{model: MainCourse}, {model: Side}, {model: Dessert}, {model: Drink}]
        })

        let pureMealInfo = getMeal.get({plain: true});

        // let sizedPic = await cloudinary.uploader.explicit(pureMealInfo.image, {
        //     type: 'upload',
        //         eager: [{width: 450, height: 250}]
        // })
        // // console.log(sizedPic);
        // pureMealInfo.cloudImage = sizedPic.eager[0].url

        // cloudinary.search.expression(`public_id:${sizedPic.public_id}`).execute().then(result => {
        //     console.log(result);
        // })
        console.log(pureMealInfo);
        // res.json(pureMealInfo);
        let totalCal = getMeal.getTotalCalories(pureMealInfo)



        res.render("one-meal", {
            meal: pureMealInfo,
            isLoggedIn: req.session.isLoggedIn,
            currUserId: req.session.user_id,
            totalCal
        })


    } catch(err){
        console.log(err);
        res.json(err)
    }
})

//loads the reviews for the item the customer is choosing to display
router.get("/user/profile/:id/reviews", loginCheck, (req, res) => {

})



module.exports = router;