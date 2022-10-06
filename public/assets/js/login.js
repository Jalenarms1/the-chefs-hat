// Place script code here
const signupBtn = document.querySelector("#registerbtn");
const loginBtn = document.querySelector("#submit-login");
const inputImg = document.querySelector("#rest-pic");
const loadingImgSignUp = document.querySelector("#loading-img-signup");
const loadingImgLogin = document.querySelector("#loading-img-login");

const userLogin = async (event) => {
    event.preventDefault();

    loadingImgLogin.classList.remove("hide");

    // Collect values from the login form 
    const email = document.querySelector('#emailLog').value.trim();
    const password = document.querySelector('#passLog').value.trim();

    if (email && password) {
        // Send a Post request to the API endpoint
        console.log(password);
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/user/profile');
        } else {
            alert(response.statusText);
        }
    }
};

const newSignup = async (event) => {
    event.preventDefault();

    loadingImgSignUp.classList.remove("hide")
    

    const image = inputImg.files[0];
    const reader = new FileReader;

    const owner = document.querySelector('#formName');
    const email = document.querySelector('#formEmail');
    const password = document.querySelector('#formPass');
    const address = document.querySelector('#address');
    const phoneNumber = document.querySelector('#formPhone');
    const restName = document.querySelector('#formRest');

    const allFields = document.querySelectorAll(".check");
    console.log(allFields);

    for(i = 0;i < allFields.length;i++){
        if(!allFields[i].checkValidity()){
            allFields[i].classList.add("is-invalid");
            return
        }

    }
    
    reader.addEventListener("load", async () => {

        if(image){
            // let postPic = await fetch("/api/user/signup/image", {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({image: reader.result.toString()})
            // })
            if (owner && image && email && password && address && phoneNumber && restName) {
                const response = await fetch('/api/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({ owner: owner.value, image: reader.result.toString(), email: email.value, password: password.value, address: address.value, phoneNumber: phoneNumber.value, restName: restName.value }),
                    headers: { 'Content-Type': 'application/json' },
                });
        
                if (response.ok) {
                    document.location.replace('/user/add');
                } else {
                    alert(response.statusText);
                }
            } else{
                alert("All fields required")
            }
        }
    })
    reader.readAsDataURL(image);


   

};
if(signupBtn){
    signupBtn.addEventListener('click', newSignup);

}
if(loginBtn){
    loginBtn.addEventListener("click", userLogin)
}
