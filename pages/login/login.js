const login = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const payload = {
        email,
        password,
    };
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Origin', 'http://localhost:8080');
    const request = new Request('http://localhost:8080/api/auth', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers,
        mode: 'cors',
    });

    fetch(request)
        .then(response => {
            console.log(response);
        })
}

window.addEventListener('load', () => {
    let icons = document.getElementById('login').getElementsByTagName('em');
    for (let icon of icons) {
        icon.addEventListener('click', function () {
            document.getElementById(icon.getAttribute('for')).focus()
        });
    }

    const signin = document.getElementById('signin');
    signin.addEventListener('click', login);
});
