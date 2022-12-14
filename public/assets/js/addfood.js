const main_course_name = document.querySelector('#meal');
const main_calorie = document.querySelector('#mealcal');
let mainCourseBtn = document.querySelector('#mealBtn');
let sideBtn = document.querySelector('#sideBtn');
let drinksBtn = document.querySelector('#drinksBtn');
let dessertsBtn = document.querySelector('#desertBtn');
let loadingImgMain = document.querySelector("#loading-img-mainAdd");
let loadingImgSide = document.querySelector("#loading-img-sideAdd");
let loadingImgDrink = document.querySelector("#loading-img-drinkAdd");
let loadingImgDessert = document.querySelector("#loading-img-dessertAdd");


async function newFood(event) {
  event.preventDefault();

  loadingImgMain.classList.remove("hide");
 
  const response = await fetch(`/api/user/main-course`, {
    method: 'POST',
    body: JSON.stringify({
      name: main_course_name.value,
      calories: parseInt(main_calorie.value)
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/user/add');
  } else {
    alert('Failed to add');
  }
}

if(mainCourseBtn){

  mainCourseBtn.addEventListener('click', newFood);
}

async function newFoodSides(event) {
  event.preventDefault();
  loadingImgSide.classList.remove("hide");

  
  const side_dish_name = document.querySelector('#sides');
  const side_calorie = document.querySelector('#sidecal');
  const response = await fetch(`/api/user/side-dish`, {
    method: 'POST',
    body: JSON.stringify({
      name : side_dish_name.value,
      calories: parseInt(side_calorie.value)
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/user/add');
  } else {
    alert('Failed to add');
  }
}
  
if(sideBtn){
  sideBtn.addEventListener('click', newFoodSides);
}


async function drinksName(event) {
  event.preventDefault();
  loadingImgDrink.classList.remove("hide");

  
  const drinks_name = document.querySelector('#drinks');
  const drinks_calorie = document.querySelector('#drinksCal');
  const response = await fetch('/api/user/drinks', {
    method: 'POST',
    body: JSON.stringify({
      name : drinks_name.value,
      calories: parseInt(drinks_calorie.value)
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/user/add');
  } else {
    alert('Failed to add');
  }
}

if(drinksBtn){
  drinksBtn.addEventListener('click', drinksName);

}


async function dessertsName(event) {
  event.preventDefault();
  loadingImgDessert.classList.remove("hide");

  
  const desserts_name = document.querySelector('#desert');
  const desserts_calories = document.querySelector('#desertCal');
  const response = await fetch(`/api/user/dessert`, {
    method: 'POST',
    body: JSON.stringify({
      name : desserts_name.value,
      calories: parseInt(desserts_calories.value)
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/user/add');
  } else {
    alert('Failed to add');
  }
}

if(dessertsBtn){
  dessertsBtn.addEventListener('click', dessertsName);
}


  