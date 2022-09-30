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

//post, put, delete to add,edit and remove new main-course options for when constructing a new meal
// format {
//      name: (string),
//      calories: (integer)
// }
router.post("/main-course", async (req, res) => {
    try{
        let newMainCourse = await MainCourse.create(req.body);

        if(newMainCourse){
            // res.render("new-item", {
            //     isLoggedIn: req.session.isLoggedIn,
            //     currUserId: req.session.user_id
            // })
            res.json(newMainCourse);
            console.log(newMainCourse);
        }
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

router.put("/main-course/:id", async (req, res) => {
    try{
        let newMainCourse = await MainCourse.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        console.log(newMainCourse);
        res.json(newMainCourse)
    } catch(err){
        console.log(err);
        res.json(err);
    }
})

router.delete("/main-course/:id", async (req, res) => {
    try{
        let removedItem = await MainCourse.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(removedItem);
        console.log(removedItem);
    } catch(err){
        res.json(err);
        console.log(err);
    }
})



//post, put, delete to add, edit and remove new side dish
// format {
//      name: (string),
//      calories: (integer)
// }
router.post("/side-dish", async (req, res) => {
    try{
        let newSide = await Side.create(req.body);

        if(newSide){
            res.json(newSide)
            console.log(newSide);
        }

    } catch(err){
        console.log(err);
        res.json(err)
    }
})

router.put("/side-dish/:id", async (req, res) => {
    try{
        let newSideInfo = await Side.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.json(newSideInfo);
        console.log(newSideInfo);
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

router.get("/side-dish", async (req, res) => {
    try{
        let response = await Side.findAll();

        res.json(response);
    } catch(err){
        res.json(err)
    }
})

router.delete("/side-dish/:id", async (req, res) => {
    try{
        let remSideInfo = await Side.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(remSideInfo);
        console.log(remSideInfo);
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

//post, put, delete to add, edit and remove new dessert dish
// format {
//      name: (string),
//      calories: (integer)
// }
router.post("/dessert", async (req, res) => {
    try{
        let newDessert = await Dessert.create(req.body);

        if(newDessert){
            res.json(newDessert)
            console.log(newDessert);
        }
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

router.put("/dessert/:id", async (req, res) => {
    try{
        let newDessert = await Dessert.create(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(newDessert){
            res.json(newDessert)
        }
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

router.delete("/dessert/:id", async (req, res) => {
    try{
        let remDessert = await Dessert.destroy({
            where: {
                id: req.params.id
            }
        });

        if(remDessert){
            res.json({msg: 'success'})
        }
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

//post, put, delete to add, edit and remove new drink
// format {
//      name: (string),
//      calories: (integer)
// }
router.post("/drink", async (req, res) => {
    try{
        let newDrink = await Drink.create(req.body);

        if(newDrink){
            res.json(newDrink)
            console.log(newDrink);
        }
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

router.put("/drink/:id", async (req, res) => {
    try{
        let newDrink = await Drink.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(newDrink){
            res.json(newDrink)
        }
    } catch(err){
        console.log(err);
        res.json(err)
    }
})

router.delete("/drink/:id", async (req, res) => {
    try{
        let remDrink = await Drink.destroy({
            where: {
                id: req.params.id
            }
        });

        if(remDrink){
            res.json(remDrink)
        }
    } catch(err){
        console.log(err);
        res.json(err)
    }
})




module.exports = router;