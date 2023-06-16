const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(datas => {
        let userId = datas.userId;
        const error = document.querySelector('.error');
        let token = datas.token;
        if (userId == true ){
        document.location = 'index.html';
        window.localStorage.setItem('token', token);
        console.log(token);
        } 
        else{
        error.innerHTML = '<p>Erreur dans l’identifiant ou le mot de passe</p>';
        } 

    });
    
    });