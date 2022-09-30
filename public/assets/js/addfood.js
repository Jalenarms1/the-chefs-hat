async function newFood(event) {
  event.preventDefault();
  
  const main_course_name = document.querySelector('#meal').value;
  const main_calorie = document.querySelector('#mealcal').value;
  const response = await fetch(`/api/main-course`, {
    method: 'POST',
    body: JSON.stringify({
       name: main_course_name,
       name: main_calorie
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add');
  }
}

document.querySelector('#mealBtn').addEventListener('submit', newFood);

async function newFoodSides(event) {
    event.preventDefault();
    
    const side_dish_name = document.querySelector('#sides').value;
    const side_calorie = document.querySelector('#sidecal').value;
    const response = await fetch(`/api/side`, {
      method: 'POST',
      body: JSON.stringify({
          name : side_dish_name,
          name: side_calorie
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add');
    }
  }
  
  document.querySelector('#sideBtn').addEventListener('submit', newFoodSides);


  async function drinksName(event) {
    event.preventDefault();
    
    const drinks_name = document.querySelector('#drinks').value;
    const drinks_calorie = document.querySelector('#drinksCal').value;
    const response = await fetch(`/api/drinks`, {
      method: 'POST',
      body: JSON.stringify({
        name: drinks_name,
        name: drinks_calorie
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add');
    }
  }
  
  document.querySelector('#drinksBtn').addEventListener('submit', drinksName);


async function desertsName(event) {
    event.preventDefault();
    
    const deserts_name = document.querySelector('#desert').value;
    const drinks_calorie = document.querySelector('#desertCal').value;
    const response = await fetch(`/api/desert`, {
      method: 'POST',
      body: JSON.stringify({
       name: deserts_name,
       name: deserts_calorie
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add');
    }
  }
  
  // document.querySelector('#desertBtn').addEventListener('submit', desertsName);

 let desertBtn = document.querySelector('#desertBtn');
 
  if(deserttBtn){
    desertBtn.addEventListener('click', desertsName);
}


  