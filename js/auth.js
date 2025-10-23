const loginBox = document.querySelectorAll('.auth-box')[0];
const signupBox = document.querySelectorAll('.auth-box')[1];

document.getElementById('show-signup').addEventListener('click', () => {
    loginBox.style.display = 'none';
    signupBox.style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    signupBox.style.display = 'none';
    loginBox.style.display = 'block';
});

document.getElementById('signup-btn').addEventListener('click', () => {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (!username || !password) return alert('Please enter all fields');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) return alert('Username already exists');

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! You can now login.');
    signupBox.style.display = 'none';
    loginBox.style.display = 'block';
});

document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return alert('Invalid credentials');

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
});