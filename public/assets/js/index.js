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
        //     document.location.replace('/user/create');
        // } else {
        //     alert('Failed to load');
        // }

    });
    reader.readAsDataURL(imageFile);


}

if(document.querySelector('.btn')){
    document.querySelector('.btn').addEventListener('click', newFormHandler);

}
