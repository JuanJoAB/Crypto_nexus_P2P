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

// Pestana de intercambio

let paginaActual = 1;

    function cargarOrdenes(pagina = 1) {
      fetch(`http://localhost:5000/ordenes?page=${pagina}`)
        .then(res => res.json())
        .then(ordenes => {
          const contenedor = document.getElementById('ordenes-container');
          contenedor.innerHTML = '';
          ordenes.forEach(o => {
            const bloque = document.createElement('div');
            bloque.className = 'orden';
            bloque.innerHTML = `
              <div class="precio">$${o.precio_de_venta}</div>
              <button class="boton-comprar">Comprar</button>
              <div class="detalles">
                <div>Mínimo: ${o.minimo}</div>
                <div>Máximo: ${o.maximo}</div>
              </div>
              <div class="detalles">
                <div>Vendedor: ${o.nombre_vendedor}</div>
              </div>
              <div class="footer">
                <div>⭐ ${o.puntuacion}</div>
                <div>% ${o.cantidad_ordenes}</div>
              </div>
            `;
            contenedor.appendChild(bloque);
          });
          document.getElementById('pagina-actual').textContent = pagina;
        });
    }

    function cambiarPagina(direccion) {
      if (paginaActual + direccion < 1) return;
      paginaActual += direccion;
      cargarOrdenes(paginaActual);
    }

    document.getElementById('form-vender').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData();
      const inputs = this.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        if (input.name) formData.append(input.name, input.value);
      });
      const imagen = document.getElementById('imagen_qr').files[0];
      if (imagen) {
        const reader = new FileReader();
        reader.onload = function(event) {
          formData.append('imagen_qr', event.target.result);
          enviarFormulario(formData);
        };
        reader.readAsDataURL(imagen);
      } else {
        enviarFormulario(formData);
      }
    });

    function enviarFormulario(formData) {
      fetch('http://localhost:5000/nueva-orden', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(response => {
        alert('Publicación creada con éxito');
        document.getElementById('form-vender').reset();
        document.getElementById('preview').style.display = 'none';
        cargarOrdenes(paginaActual);
      });
    }

    // Tabs toggle
    document.getElementById('tab-comprar').addEventListener('click', () => {
      document.getElementById('tab-comprar').classList.add('active');
      document.getElementById('tab-vender').classList.remove('active');
      document.getElementById('ordenes-container').style.display = 'block';
      document.getElementById('paginacion').style.display = 'flex';
      document.getElementById('vender-container').style.display = 'none';
    });
    document.getElementById('tab-vender').addEventListener('click', () => {
      document.getElementById('tab-vender').classList.add('active');
      document.getElementById('tab-comprar').classList.remove('active');
      document.getElementById('ordenes-container').style.display = 'none';
      document.getElementById('paginacion').style.display = 'none';
      document.getElementById('vender-container').style.display = 'flex';
    });

    document.getElementById('imagen_qr').addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const preview = document.getElementById('preview');
          preview.src = e.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      cargarOrdenes();
    });
//contendor de imagen
    const contenedor = document.getElementById('contenedor-imagen');
    const inputImagen = document.getElementById('imagen_qr');
    const preview = document.getElementById('preview');
    const texto = contenedor.querySelector('span');

    contenedor.addEventListener('click', () => {
      inputImagen.click();
    });

    inputImagen.addEventListener('change', () => {
      const file = inputImagen.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = 'block';
          texto.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });