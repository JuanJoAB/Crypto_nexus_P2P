// Selección de elementos
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('toggle-password');
const loginForm = document.getElementById('login-form');
const registerButton = document.getElementById('register-button');

// Mostrar/ocultar contraseña
togglePasswordButton.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    const img = document.getElementById("eye_icon");
    let eyeimg = 1;
    if (type === 'text') {
      img.src = "images/icon/eye-off.png";
      eyeimg = 2;
    } else {
      img.src = "images/icon/eye.png";
      eyeimg = 1;
    }
});

// Redirigir al registro
registerButton.addEventListener('click', () => {
    window.location.href = 'register.html'; // Redirige al archivo register.html
});

// Manejar el envío del formulario
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Almacenar los datos en variables
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Almacenar los datos
    console.log({
        username,
        password
    });

    alert('Inicio de sesión exitoso');
});