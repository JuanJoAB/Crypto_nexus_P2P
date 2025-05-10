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
    repeatPasswordInput.type = type;
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
    e.preventDefault();

    // Almacenar los datos en variables
    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;

    // Validar que las contraseñas coincidan
    if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Almacenar los datos
    console.log({
        email,
        username,
        password,
        termsAccepted
    });

    alert('Registro exitoso');
});