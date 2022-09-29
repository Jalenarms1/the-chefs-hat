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
} = require("../../models");

// api/user

//initial post on creating a new account
//format {
//    owner: (string),
//    email: (string),
//    password: (string).
//    restName: (string),
//    address: (string),
//    phoneNumber: (string)
// }
router.post("/signup", async (req, res) => {
    try{
        let newOwner = await Owner.create({
            fullName: req.body.owner,
            email: req.body.email,
            password: req.body.password
        })

        let newRestaurant = await Restaurant.create({
            name: req.body.restName,
            ownerId: newOwner.id,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber
        })

        console.log(newRestaurant);

        req.session.save(() => {
            req.session.isLoggedIn = true,
            req.session.user_id = newOwner.id,

            //change to path of profile page
            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn,
                currUserId: req.session.user_id
            })

        })


    } catch(err){
        console.log(err);
        res.json(err)
    }
})

//post to authenticate login
router.post("/login", async (req, res) => {
    try{
        console.log(req.body.password);
        let reqUserSignIn = await Owner.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!reqUserSignIn){
            res.status(404).json({errMsg: "Invalid"})
            return
        }

        let validatePassword = await reqUserSignIn.checkPassword(req.body.password);

        if(!validatePassword){
            res.status(400).json({errMsg: "Invalid"})
            return 
        }

        req.session.save(() => {
            req.session.isLoggedIn = true,
            req.session.user_id = reqUserSignIn.id,

            // change to path of profile page
            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn,
                currUserId: req.session.user_id
            })

        })
    } catch (err){
        console.log(err);
        res.json(err);
    }
})

//post to logout current user
router.post("/logout", (req, res) => {
    if(req.session.isLoggedIn){
        req.session.destroy(() => {
            res.render("/", {
                isLoggedIn: req.session.isLoggedIn,
                currUserId: req.session.user_id
            })
        })
    }
});




module.exports = router;