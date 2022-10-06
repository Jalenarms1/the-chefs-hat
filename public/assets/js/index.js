let reviewBody = document.querySelector("#review-body");
let rating = document.querySelector("#rating-select");
let mealId = document.querySelector("#meal-id");
let hiddenId = document.querySelector("#hidden")
let loadingImgCreate = document.querySelector("#loading-img-create");
let loadingImgUpdate = document.querySelector("#loading-img-update");
let delMainBtn = document.querySelectorAll(".del-mainCourse");
let delSideBtn = document.querySelectorAll(".del-side");
let delDrinkBtn = document.querySelectorAll(".del-drink");
let delDessertBtn = document.querySelectorAll(".del-dessert");

const delMainCourse = async (event) => {
    try{
        console.log("Hello");
        let response = await fetch(`/api/user/main-course/${event.target.id}`, {
            method: 'DELETE'
        })

        if(response.ok){
            location.replace("/user/inventory")
        }
    }catch(err){
        console.log(err);
    }
}

if(delMainBtn){
    delMainBtn.forEach(button => {
        button.addEventListener("click", delMainCourse)
    })
}

const delSideItem = async (event) => {
    try{
        console.log("Hello");
        let response = await fetch(`/api/user/side-dish/${event.target.id}`, {
            method: 'DELETE'
        })

        if(response.ok){
            location.replace("/user/inventory")
        }
    }catch(err){
        console.log(err);
    }
}

if(delSideBtn){
    delSideBtn.forEach(button => {
        button.addEventListener("click", delSideItem)
    })
}

const delDrinkItem = async (event) => {
    try{
        console.log("Hello");
        let response = await fetch(`/api/user/drink/${event.target.id}`, {
            method: 'DELETE'
        })

        if(response.ok){
            location.replace("/user/inventory")
        }
    }catch(err){
        console.log(err);
    }
}

if(delDrinkBtn){
    delDrinkBtn.forEach(button => {
        button.addEventListener("click", delDrinkItem)
    })
}

const delDessertItem = async (event) => {
    try{
        console.log("Hello");
        let response = await fetch(`/api/user/dessert/${event.target.id}`, {
            method: 'DELETE'
        })

        if(response.ok){
            location.replace("/user/inventory")
        }
    }catch(err){
        console.log(err);
    }
}

if(delDessertBtn){
    delDessertBtn.forEach(button => {
        button.addEventListener("click", delDessertItem)
    })
}

// Place script code here
async function newFormHandler(event) {
    event.preventDefault();
    loadingImgCreate.classList.remove("hide");

    let mealName = document.querySelector("#creationName");

    let emptyArrayToStoreMainValues = [];
    let emptyArrayToStoresidesValues = [];
    let emptyArrayToStoredrinksValues = [];
    let emptyArrayToStoreDessertValues = [];

    let mainArr = document.querySelectorAll('.main');
    let sidesArr = document.querySelectorAll('.sides');
    let drinksArr = document.querySelectorAll('.drinks');
    let image = document.querySelector('#file-pick');
    let dessertArr = document.querySelectorAll(".desserts")

    if(mainArr){
        mainArr.forEach(box => {
            if(box.checked){
                emptyArrayToStoreMainValues.push(box.value)
            }
        });

    }

    sidesArr.forEach(box => {
        if(box.checked){
            emptyArrayToStoresidesValues.push(box.value)
        }
    });

    drinksArr.forEach(box => {
        if(box.checked){
            emptyArrayToStoredrinksValues.push(box.value)
        }
    });

    dessertArr.forEach(box => {
        if(box.checked){
            emptyArrayToStoreDessertValues.push(box.value)
        }
    });

    let imageFile = image.files[0];
    let reader = new FileReader();

    
    reader.addEventListener('load', async () => {
        let response = await fetch(`/api/user/meal`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: mealName.value,
                image: reader.result.toString(),
                mainCourseIds: emptyArrayToStoreMainValues,
                sideIds: emptyArrayToStoresidesValues,
                drinkIds: emptyArrayToStoredrinksValues,
                dessertIds: emptyArrayToStoreDessertValues
            })
            
           
        })
        if (response.ok) {
            document.location.replace('/user/profile');
        } else {
            alert('Failed to load');
        }

    });
    reader.readAsDataURL(imageFile);


}

if(document.querySelector('#new-meal-btn')){
    document.querySelector('#new-meal-btn').addEventListener('click', newFormHandler);
}
const deleteBtn = document.querySelector(".delete-btn");

const delAcct = async () => {
    try{
        let response = await fetch('/api/user/delete-account', {
            method: 'DELETE',
            body: {}
        })

        if(response.ok){
            location.replace("/")
        }

    }catch(err){
        console.log(err);
    }
}

let delAcctBtn = document.querySelector("#del-acct-btn")

if(delAcctBtn){
    delAcctBtn.addEventListener("click", delAcct);
}


const delMeal = async (event) => {
    try{

        let response = await fetch(`/api/user/meal/${event.target.id}`, {
            method: 'DELETE',
            body: {}

        })
        if(response.ok){
            location.replace("/user/profile")
    }
    } catch (err){
        console.log(err);
    }
}

let mealUp = document.querySelector("#has-been")
let hideSec = document.querySelector(".scroll-footer");

let sendRevBtn = document.querySelector("#send-review");

const postReview = async () => {
    try{

        let response = await fetch(`/api/reviews/new/${mealId.value}`, {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({
                ownerId: hiddenId.value,
                content: reviewBody.value,
                rating: rating.value
            })
        })

        mealUp.classList.remove("hide");
        hideSec.classList.add("hide");


    }catch(err){
        console.log(err);
    }
}

if(sendRevBtn){
    sendRevBtn.addEventListener("click", postReview);
}

if(deleteBtn){
    deleteBtn.addEventListener('click', delMeal );
}

let updateMealBtn = document.querySelector("#update-meal-btn");

const updateMeal = async (event) => {
    try{
        event.preventDefault();
        loadingImgUpdate.classList.remove("hide");
        let mealId = document.querySelector("#meal-id")
    
        let mealName = document.querySelector("#new-meal-name");
    
        let emptyArrayToStoreMainValues = [];
        let emptyArrayToStoresidesValues = [];
        let emptyArrayToStoredrinksValues = [];
        let emptyArrayToStoreDessertValues = [];
    
        let mainArr = document.querySelectorAll('.upd-main');
        let sidesArr = document.querySelectorAll('.upd-side');
        let drinksArr = document.querySelectorAll('.upd-drink');
        let image = document.querySelector('#updated-img');
        let dessertArr = document.querySelectorAll(".upd-dessert")
    
        if(mainArr){
            mainArr.forEach(box => {
                if(box.checked){
                    emptyArrayToStoreMainValues.push(box.value)
                }
            });
    
        }
        
        if(sidesArr){
            sidesArr.forEach(box => {
                if(box.checked){
                    emptyArrayToStoresidesValues.push(box.value)
                }
            });

        }
    
        drinksArr.forEach(box => {
            if(box.checked){
                emptyArrayToStoredrinksValues.push(box.value)
            }
        });
    
        dessertArr.forEach(box => {
            if(box.checked){
                emptyArrayToStoreDessertValues.push(box.value)
            }
        });
        console.log(emptyArrayToStoreMainValues)
        console.log(emptyArrayToStoresidesValues)
        console.log(emptyArrayToStoredrinksValues)
        console.log(emptyArrayToStoreDessertValues)
    
        if(image.files[0]){
            let imageFile = image.files[0];
            let reader = new FileReader();
            reader.addEventListener('load', async () => {
                let response = await fetch(`/api/user/meal/${mealId.value}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: mealName.value,
                        image: reader.result.toString(),
                        mainCourseIds: emptyArrayToStoreMainValues,
                        sideIds: emptyArrayToStoresidesValues,
                        drinkIds: emptyArrayToStoredrinksValues,
                        dessertIds: emptyArrayToStoreDessertValues
                    })
                    
                   
                })
                if (response.ok) {
                    document.location.replace('/user/profile');
                } else {
                    alert('Failed to load');
                }
        
            });
            reader.readAsDataURL(imageFile);
        }else{
            let response = await fetch(`/api/user/meal/${mealId.value}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: mealName.value,
                    mainCourseIds: emptyArrayToStoreMainValues,
                    sideIds: emptyArrayToStoresidesValues,
                    drinkIds: emptyArrayToStoredrinksValues,
                    dessertIds: emptyArrayToStoreDessertValues
                })
            })

            if (response.ok) {
                document.location.replace('/user/profile');
            } else {
                alert('Failed to load');
            }
        }
    
        
    }catch(err){
        console.log(err);
    }
    
}

if(updateMealBtn){
    updateMealBtn.addEventListener("click", updateMeal);
}