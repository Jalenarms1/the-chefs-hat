// Place script code here
async function newFormHandler(event) {
    event.preventDefault();

    let emptyArrayToStoreMainValues =[];
    let emptyArrayToStoresidesValues =[];
    let emptyArrayToStoredrinksValues =[];
    let emptyArrayToStoreimageValues =[];
    let emptyArrayToStorecalorieValues =[];
    let emptyArrayToStorereviewValues =[];

    let mainArr = document.querySelectorAll('.main');
    let sidesArr = document.querySelectorAll('.sides');
    let drinksArr = document.querySelectorAll('.drinks');
    let image = document.querySelector('.img');
    let calorieArr = document.querySelectorAll('.calorie');
    let reviewArr = document.querySelectorAll('.review');

    mainArr.forEach(box => {
        if(box.ckecked){
            emptyArrayToStoreMainValues.push(box.value)
        }
    });

    sidesArr.forEach(box => {
        if(box.ckecked){
            emptyArrayToStoresidesValues.push(box.value)
        }
    });

    drinksArr.forEach(box => {
        if(box.ckecked){
            emptyArrayToStoredrinksValues.push(box.value)
        }
    });

    let file = inputImg.files[0];
    let reader = new FileReader();
    
    reader.addEventListener('load', async () => {
        console.log(reader.result.toString()
    );

    let response = await fetch(`/api/user/meal/${id}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageIds: reader.result.toString(),
            mainCourseIds: emptyArrayToStoreMainValues,
            sideIds: emptyArrayToStoresidesValues,
            drinksIds: emptyArrayToStoredrinksValues
        })
       });
       console.log(response);
       
    })
    reader.readAsDataURL(file);
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to load');
    }
}

document.querySelector('.btn').addEventListener('submit', newFormHandler);
