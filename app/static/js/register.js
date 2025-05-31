// Selección de elementos
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const repeatPasswordInput = document.getElementById('repeat-password');
const repeatPasswordGroup = document.getElementById('repeat-password-group');
const togglePasswordButton = document.getElementById('toggle-password');
const termsCheckbox = document.getElementById('terms');
const registerForm = document.getElementById('register-form');
const emailError = document.getElementById('email-error');

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


// Validar correo electrónico
emailInput.addEventListener('input', () => {
    if (!emailInput.value.includes('@')) {
        emailError.textContent = 'El correo debe contener @';
    } else {
        emailError.textContent = '';
    }
});

// Mostrar campo "Repetir contraseña" al ingresar una contraseña
passwordInput.addEventListener('input', () => {
    if (passwordInput.value) {
        repeatPasswordGroup.style.display = 'block';
    } else {
        repeatPasswordGroup.style.display = 'none';
    }
});

// Manejar el envío del formulario
registerForm.addEventListener('submit', (e) => {

    // Validar que las contraseñas coincidan
    if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
});