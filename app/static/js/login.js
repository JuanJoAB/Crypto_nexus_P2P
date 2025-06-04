
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
    // cambia la fuente de la imagen
    if (type === 'text') {
        img.src = EYE_CLOSED_ICON_URL; // Usa la variable definida en el HTML
    } else {
        img.src = EYE_OPEN_ICON_URL; // Usa la variable definida en el HTML
    }
});

// Manejar el envío del formulario
loginForm.addEventListener('submit', (e) => {

    alert('Inicio de sesión exitoso');
});