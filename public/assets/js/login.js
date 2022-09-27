// Place script code here
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form 
    const email = document.querySelector ('#emailLog').value.trim();
    const password = document.querySelector('#passLog').value.trim();

    if (email && password) {
        // Send a Post request to the API endpoint
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#formName').value.trim();
    const email = document.querySelector('#formEmail').value.trim();
  const password = document.querySelector('#formPass').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};
