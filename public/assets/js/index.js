let reviewBody = document.querySelector("#review-body");
let rating = document.querySelector("#rating-select");
let mealId = document.querySelector("#meal-id");
let hiddenId = document.querySelector("#hidden")
console.log(hiddenId);

// Place script code here
async function newFormHandler(event) {
    event.preventDefault();

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
    console.log(emptyArrayToStoreMainValues);

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

    console.log(image.files[0]);
    let imageFile = image.files[0];
    let reader = new FileReader();

    console.log(emptyArrayToStoreMainValues);
    console.log(emptyArrayToStoresidesValues);
    console.log(emptyArrayToStoredrinksValues);
    console.log(emptyArrayToStoreDessertValues);

    
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
        console.log(response);
        // if (response.ok) {
        //     document.location.replace('/user/profile');
        // } else {
        //     alert('Failed to load');
        // }

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
        console.log(response);

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
        console. log(event);

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
        console.log(hiddenId.value);

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

const updateMeal = async (event) => {
    try{
        console.log(event);
        let response = await fetch(`/api/user/meal/${event.target.id}`, {
            method: 'PUT',
            body: {}

        })
        if(response.ok){
            location.replace("/user/profile")
    }
    } catch (err){
        console.log(err);
    }
}
