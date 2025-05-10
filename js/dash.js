const passwordInput = document.getElementById('tbalance');
const togglePasswordButton = document.getElementById('toggle-password');

//Funcion que controla las pestanas
function showContent(tabId) {
    // Ocultar todo el contenido
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    // Quitar la clase activa de todas las pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Mostrar el contenido seleccionado
    document.getElementById(tabId).classList.add('active');

    // Activar la pestaña seleccionada
    event.target.classList.add('active');
}
// Mostrar/ocultar saldo
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