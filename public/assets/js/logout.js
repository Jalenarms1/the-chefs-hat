const logout = async () => {
  console.log("Hello");
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

if(document.querySelector('#logout')){

  document.querySelector('#logout').addEventListener('click', logout);
}
  