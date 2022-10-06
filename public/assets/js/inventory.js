// for updating inventory
const updMainName = document.querySelector("#upd-main-name");
const updMainCalories = document.querySelector("#upd-main-calories");
const updSideName = document.querySelector("#upd-side-name");
const updSideCalories = document.querySelector("#upd-side-calories");
const updDrinkName = document.querySelector("#upd-drink-name");
const updDrinkCalories = document.querySelector("#upd-drink-calories");
const updDessertName = document.querySelector("#upd-dessert-name");
const updDessertCalories = document.querySelector("#upd-dessert-calories");
const updMainBtn = document.querySelectorAll(".upd-main-btn");
let delMainBtn = document.querySelectorAll(".del-mainCourse");
let delSideBtn = document.querySelectorAll(".del-side");
let delDrinkBtn = document.querySelectorAll(".del-drink");
let delDessertBtn = document.querySelectorAll(".del-dessert");


const updMainItem = async (e) => {
    try{
        let response = await fetch(`/api/user/main-course/${e.target.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              name: updMainName.value,
              calories: parseInt(updMainCalories.value)
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        });

        if(response.ok){
            location.replace("/user/inventory");
        }

    }catch(err){
        console.log(err);
    }
}

if(updMainBtn){
    updMainBtn.forEach(button => {
        button.addEventListener("click", updMainItem)
    })
}

const delMainCourse = async (event) => {
    try{
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