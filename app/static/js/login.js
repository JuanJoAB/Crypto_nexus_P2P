
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

    // Almacenar los datos (solo para demostración, en un proyecto real harías una petición AJAX)
    console.log({
        username,
        password
    });

    alert('Inicio de sesión exitoso');
});