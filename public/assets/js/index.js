// Place script code here
async function newFormHandler(event) {
    event.preventDefault();

    let emptyArrayToStoreMainValues =[];
    let emptyArrayToStoresidesValues =[];
    let emptyArrayToStoredrinksValues =[];
    let emptyArrayToStoreDessertValues = [];

    let mainArr = document.querySelectorAll('.main');
    let sidesArr = document.querySelectorAll('.sides');
    let drinksArr = document.querySelectorAll('.drinks');
    let image = document.querySelector('.img');
    let dessertArr = document.querySelectorAll(".desserts")

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

    dessertArr.forEach(box => {
        if(box.ckecked){
            emptyArrayToStoreDessertValues.push(box.value)
        }
    });

    let imageFile = image.files[0];
    let reader = new FileReader();
    
    reader.addEventListener('load', async () => {
        let response = await fetch(`/api/user/meal/${id}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: reader.result.toString(),
                mainCourseIds: emptyArrayToStoreMainValues,
                sideIds: emptyArrayToStoresidesValues,
                drinksIds: emptyArrayToStoredrinksValues,
                dessertIds: emptyArrayToStoreDessertValues
            })
            
           
        })
        console.log(response);
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to load');
        }

    });
    reader.readAsDataURL(imageFile);


}

if(document.querySelector('.btn')){
    document.querySelector('.btn').addEventListener('submit', newFormHandler);

}
