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
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
})

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};


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
        let {image, owner, email, password, restName, address, phoneNumber} = req.body
        
        let newCloudPic = await cloudinary.uploader.upload(image, options);
        console.log(newCloudPic);

        let sizedPic = await cloudinary.uploader.explicit(newCloudPic.public_id, {
            type: 'upload',
                eager: [{width: 450, height: 300}]
        })


        if(image && owner && email && password && restName && address && phoneNumber){

            let newOwner = await Owner.create({
                fullName: req.body.owner,
                email: req.body.email,
                password: req.body.password
            })

            let newRestaurant = await Restaurant.create({
                name: req.body.restName,
                image: sizedPic.eager[0].secure_url,
                ownerId: newOwner.id,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber
            })

            console.log(newRestaurant);
            
            req.session.save(() => {
                req.session.isLoggedIn = true,
                req.session.user_id = newOwner.id,
                
                //change to path of profile page
                res.render("user-profile", {
                    isLoggedIn: req.session.isLoggedIn,
                    currUserId: req.session.user_id
                })
                
            })
        
        }

    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

//post to authenticate login
router.post("/login", async (req, res) => {
    try{
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
            res.render("user-profile", {
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
            res.status(204).end();
            
        })
    }
});

router.delete("/delete-account", async(req, res) => {
    try{

        let deleteRestaurant = await Restaurant.destroy({
            where: {
                ownerId: req.session.user_id
            }
        })
        
        let deletedAccount = await Owner.destroy({
            where: {
                id: req.session.user_id
            }
        })

        
        if(req.session.isLoggedIn){
            req.session.destroy(() => {
                res.status(204).end();
                
            })
        }
        

    }catch(err){
        console.log(err);
        res.json(err)
    }
})

//post, put, delete to add,edit and remove new main-course options for when constructing a new meal
// format {
//      name: (string),
//      calories: (integer)
// }
router.post("/main-course/", async (req, res) => {
    try{
        let findRestaurant = await Restaurant.findOne({
            where: {
                ownerId: req.session.user_id
            }
        })


        let newMainCourse = await MainCourse.create({
            name: req.body.name,
            calories: req.body.calories,
            restaurantId: findRestaurant.id
        });

        if(newMainCourse){
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
router.post("/side-dish/", async (req, res) => {
    try{
        let findRestaurant = await Restaurant.findOne({
            where: {
                ownerId: req.session.user_id
            }
        })

        let newSide = await Side.create({
            name: req.body.name,
            calories: req.body.calories,
            restaurantId: findRestaurant.id
        });

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
router.post("/dessert/", async (req, res) => {
    try{
        let findRestaurant = await Restaurant.findOne({
            where: {
                ownerId: req.session.user_id
            }
        })

        let newDessert = await Dessert.create({
            name: req.body.name,
            calories: req.body.calories,
            restaurantId: findRestaurant.id
        });

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
        let newDessert = await Dessert.update(req.body, {
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
router.post("/drinks", async (req, res) => {
    try{
    
        let findRestaurant = await Restaurant.findOne({
            where: {
                ownerId: req.session.user_id
            }
        })

        let newDrink = await Drink.create({
            name: req.body.name,
            calories: req.body.calories,
            restaurantId: findRestaurant.id
        });

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

// front-end body format to post meal {
//     name: (string),
//     image: (string -- dataURL),
//     mainCourseIds: (array),
//     sideIds: (array),
//     dessertIds: (array),
//     drinkIds: (array)
// }
//
router.post("/meal", async (req, res) => {
    try{
        let {image} = req.body;

        let imgData = await cloudinary.uploader.upload(image, options);

        let sizedImg = await cloudinary.uploader.explicit(imgData.public_id, {
            type: 'upload',
                eager: [{width: 450, height: 300}]
        })

        let currRestaurant = await Restaurant.findOne({
            where: {
                ownerId: req.session.user_id
            }
        })
        
        let constructMealTicket = [];
        let newMeal = await Meal.create({
            name: req.body.name,
            image: sizedImg.eager[0].secure_url,
            restaurantId: currRestaurant.id
        });

        if(req.body.mainCourseIds){
            req.body.mainCourseIds.map(item => {
                constructMealTicket.push({
                    mealId: newMeal.id,
                    mainCourseId: item
                })
            })

        }

        if(req.body.sideIds){
            req.body.sideIds.map(item => {
                constructMealTicket.push({
                    mealId: newMeal.id,
                    sideId: item
                })
            })

        }

        if(req.body.dessertIds){
                req.body.dessertIds.map(item => {
                    constructMealTicket.push({
                        mealId: newMeal.id,
                        dessertId: item
                    })
                })
        }

        if(req.body.drinkIds){
            req.body.drinkIds.map(item => {
                constructMealTicket.push({
                    mealId: newMeal.id,
                    drinkId: item
                })
            })
        }

        let newMainMealTicket = await MealTicket.bulkCreate(constructMealTicket)
        res.json(newMainMealTicket);

    } catch(err){
        console.log(err);
        res.json(err)
    }
})

// route to update meal --tested successfully
router.put("/meal/:id", async (req, res) => {
    try{
        if(req.body.image){
            let { image } = req.body;
            let imgData = await cloudinary.uploader.upload(image, options);

            let sizedImg = await cloudinary.uploader.explicit(imgData.public_id, {
                type: 'upload',
                    eager: [{width: 450, height: 300}]
            })

            let mealToUpdate = await Meal.update(
                {
                    name: req.body.name,
                    image: sizedImg.eager[0].secure_url
                }, {
                where: {
                    id: req.params.id
                }
            })
        }else{
            let mealToUpdate = await Meal.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

        }

        
        let newMealTickets = [];
        let mealTicketsToUpdate = await MealTicket.findAll({
            where: {
                mealId: req.params.id
            }
        })

        if(req.body.mainCourseIds){
            let mainCourseIds = mealTicketsToUpdate.map(({ mainCourseId }) => mainCourseId);
            let newMainCourseIds = req.body.mainCourseIds.filter(item => !mainCourseIds.includes(item)).map(newItem => {
                return newMealTickets.push({
                    mealId: req.params.id,
                    mainCourseId: newItem
                })
            })
            let mainCourseIdsToRemove = mainCourseIds.filter(item => {
                return !req.body.mainCourseIds.includes(item)
            })
            let removingMainIds = await MealTicket.destroy({
                where: {
                    mainCourseId: mainCourseIdsToRemove
                }
            })
            
        }
        //
        if(req.body.sideIds){
            let sideIds = mealTicketsToUpdate.map(({ sideId }) => sideId);
            let newSideIds = req.body.sideIds.filter(item => !sideIds.includes(item)).map(newItem => {
                return newMealTickets.push({
                    mealId: req.params.id,
                    sideId: newItem
                });
            })
            //
            let sideIdsToRemove = sideIds.filter(item => {
                return !req.body.sideIds.includes(item)
            })
            let removingSideIds = await MealTicket.destroy({
                where: {
                    sideId: sideIdsToRemove
                }
            })
        }
        

        if(req.body.dessertIds){
            let dessertIds = mealTicketsToUpdate.map(({ dessertId }) => dessertId);
            let newDessertIds = req.body.dessertIds.filter(item => !dessertIds.includes(item)).map(newItem => {
                return newMealTickets.push({
                    mealId: req.params.id,
                    dessertId: newItem
                })
            })
            let dessertIdsToRemove = dessertIds.filter(item => {
                return !req.body.dessertIds.includes(item)
            })
            let removingDessertIds = await MealTicket.destroy({
                where: {
                    dessertId: dessertIdsToRemove
                }
            })
            
        }
        //
        if(req.body.drinkIds){
            let drinkIds = mealTicketsToUpdate.map(({ drinkId }) => drinkId);
            let newDrinkIds = req.body.drinkIds.filter(item => !drinkIds.includes(item)).map(newItem => {
                return newMealTickets.push({
                    mealId: req.params.id,
                    drinkId: newItem
                })
            })
            let drinkIdsToRemove = drinkIds.filter(item => {
                return !req.body.drinkIds.includes(item)
            })
            let removingDrinkIds = await MealTicket.destroy({
                where: {
                    drinkId: drinkIdsToRemove
                }
            })
        }

        let updatedMealTickets = await MealTicket.bulkCreate(newMealTickets);

        res.json(updatedMealTickets)

        
    } catch(err){
        console.log(err);
    }
})

// route to delete meal
router.delete('/meal/:id', async(req, res) => {
    try{
        let mealTicketToDelete = await MealTicket.destroy({
            where: {
                mealId: req.params.id
            }
        })

        let mealDeleted = await Meal.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(mealDeleted);
        

    }catch(err){
        console.log(err);
        res.json(err)
    }
})


module.exports = router;