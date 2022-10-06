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