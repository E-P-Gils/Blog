//Login 
const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/login/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        }).catch(error => console.error(error));
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Incorrect Email or Password');
        }
    };
};
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);


//Store created account to db 
const createFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-create').value.trim();
    const email = document.querySelector('#email-create').value.trim();
    const password = document.querySelector('#password-create').value.trim();

    if (username && email && password) {
        const response = await fetch('/login/create', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert("Must enter a valid email and password of 8 or more characters")
        }
    };
};
document
    .querySelector('.create-form')
    .addEventListener('submit', createFormHandler);