// Place script code here
const signupBtn = document.querySelector("#registerbtn");
const loginBtn = document.querySelector("#submit-login");

const loginFormHandler = async (event) => {
    event.preventDefault();

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
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const owner = document.querySelector('#formName').value.trim();
    const email = document.querySelector('#formEmail').value.trim();
    const password = document.querySelector('#formPass').value.trim();
    const address = document.querySelector('#address').value.trim();
    const phoneNumber = document.querySelector('#formPhone').value.trim();
    const restName = document.querySelector('#formRest').value.trim();

    console.log(owner);
    console.log(email);

    if (owner && email && password && address && phoneNumber && restName) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ owner, email, password, address, phoneNumber, restName }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};
document.querySelector('#registerbtn').addEventListener('submit', signupFormHandler);
