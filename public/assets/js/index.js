// Place script code here
async function newFormHandler(event) {
    event.preventDefault();

    let mainArr = document.querySelectorAll('#meal');
    let sidesArr = document.querySelectorAll('#sides');
    let drinksArr = document.querySelectorAll('#drinks');
    let imageArr = document.querySelectorAll('#img');
    let calorieArr = document.querySelectorAll('#calorie');
    let reviewArr = document.querySelectorAll('#review');


    const response = await fetch(`/api/user/meal/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            dish_name_main,
            dish_name_sides,
            dish_name_drinks,
            dish_name_desert,
            dish_name_image,
            dish_name_calorie,
            dish_name_review
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed');
    }
}

document.querySelector('.btn').addEventListener('submit', newFormHandler);
