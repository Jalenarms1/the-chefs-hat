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
router.get("/catalog", (req, res) => {

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
router.get("/user/add", (req, res) => {
    res.render("addnewfoods", {
        isLoggedIn: req.session.isLoggedIn,
        currUserId: req.session.user_id
    })
})

// page to construct a meal 
router.get("/user/create", (req, res) => {
    res.render("mealcreation", {
        isLoggedIn: req.session.isLoggedIn,
        currUserId: req.session.user_id
    })
})

// will load up related-info for the logged-in user on the profile/dashboard
router.get("/user/profile", (req, res) => {

})

// when initiated, will load up the chosen item of the user's menu that they want to view
router.get("/user/profile/:id", (req, res) => {

})

//loads the reviews for the item the customer is choosing to display
router.get("/user/profile/:id/reviews", (req, res) => {

})



module.exports = router;