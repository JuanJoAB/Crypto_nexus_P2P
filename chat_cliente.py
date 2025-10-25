from flask import Flask, render_template_string, request, jsonify
import google.generativeai as genai
import base64
import os

app = Flask(__name__)
ENCRYPTED_API_KEY = "AIzaSyBIS1gNm-ZT41GTuIKoc3r1msHDEuZ3KIk"
API_KEY = base64.b64decode(ENCRYPTED_API_KEY).decode("utf-8")

try:
    # Configurar el cliente de la API de Gemini
    genai.configure(api_key=API_KEY)
except Exception as e:
    # Manejo de errores si la clave no es válida o la configuración falla
    print(f"Error al configurar la API de Gemini: {e}")

@app.route("/")
def index():
    """Sirve la plantilla HTML con la interfaz de chat."""

    html = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asistente Virtual - P2P Crypto Bolivia</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #f3f4f6; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        .chatbox {
            position: fixed; bottom: 90px; right: 20px; width: 350px; height: 450px;
            background: white; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            display: none; flex-direction: column; overflow: hidden; z-index: 1000;
            transition: all 0.3s ease-in-out;
        }
        @media (max-width: 400px) {
            .chatbox { width: 90%; right: 5%; bottom: 90px; height: 70vh; }
        }
        .chat-header { background: #1e40af; color: white; padding: 12px; text-align: center; font-weight: 700; border-top-left-radius: 12px; border-top-right-radius: 12px; }
        .chat-body { flex: 1; padding: 12px; overflow-y: auto; font-size: 15px; display: flex; flex-direction: column; }
        .chat-footer { display: flex; padding: 10px; border-top: 1px solid #e5e7eb; background: #fff; }
        .chat-footer input { flex: 1; padding: 10px; border-radius: 9999px; border: 1px solid #d1d5db; outline: none; transition: border-color 0.2s; }
        .chat-footer input:focus { border-color: #1e40af; }
        .chat-footer button { background: #1e40af; color: white; border: none; border-radius: 9999px; padding: 10px 16px; margin-left: 8px; cursor: pointer; transition: background 0.2s, transform 0.1s; }
        .chat-footer button:hover { background: #1c3c9c; }
        .chat-footer button:active { transform: scale(0.98); }
        #chatToggle {
            position: fixed; bottom: 20px; right: 20px; background: #1e40af; color: white;
            width: 60px; height: 60px; border-radius: 50%; border: none; font-size: 24px;
            cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.4); z-index: 1001;
            display: flex; align-items: center; justify-content: center; transition: background 0.2s;
        }
        .msg-user {
            background: #2563eb; color: white; padding: 10px 14px; border-radius: 18px 18px 0 18px;
            margin: 6px 0 6px auto; text-align: left; max-width: 80%;
            align-self: flex-end;
        }
        .msg-bot {
            background: #e5e7eb; color: #111827; padding: 10px 14px; border-radius: 18px 18px 18px 0;
            margin: 6px auto 6px 0; text-align: left; max-width: 80%;
            align-self: flex-start;
        }
    </style>
</head>
<body>
    <div class="p-8 bg-white shadow-xl rounded-xl">
        <h1 class="text-3xl font-extrabold text-blue-900 flex items-center">
            💰 Plataforma P2P Crypto Bolivia
        </h1>
        <p class="text-gray-600 mt-2">Haz clic en el ícono de chat para comenzar a conversar con el asistente.</p>
    </div>

    <!-- Chat flotante -->
    <div class="chatbox" id="chatBox">
        <div class="chat-header">🤖 Asistente Virtual P2P</div>
        <div class="chat-body" id="chatBody">
            <div class="msg-bot">¡Hola! 👋 Soy tu asistente virtual. Estoy aquí para responder preguntas sobre transacciones P2P, criptomonedas y el mercado boliviano. ¿En qué puedo ayudarte hoy?</div>
        </div>
        <div class="chat-footer">
            <input type="text" id="userInput" placeholder="Escribe tu mensaje...">
            <button onclick="sendMessage()">Enviar</button>
        </div>
    </div>
    <button id="chatToggle" onclick="toggleChat()">💬</button>

    <script>
        const chatBox = document.getElementById('chatBox');
        const chatBody = document.getElementById('chatBody');
        const input = document.getElementById('userInput');

        // Escuchar la tecla Enter
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function toggleChat() {
            // Usa una clase para mejor control de estado
            if (chatBox.classList.contains('flex')) {
                chatBox.classList.remove('flex');
                chatBox.style.display = 'none';
                document.getElementById('chatToggle').innerHTML = '💬';
            } else {
                chatBox.classList.add('flex');
                chatBox.style.display = 'flex';
                document.getElementById('chatToggle').innerHTML = '✖'; // Cambia el ícono
                chatBody.scrollTop = chatBody.scrollHeight;
                input.focus();
            }
        }

        async function sendMessage() {
            const message = input.value.trim();
            if (!message) return;

            // 1. Mostrar mensaje del usuario
            appendMessage('msg-user', message);
            input.value = '';
            input.disabled = true; // Deshabilitar para evitar spam

            // 2. Mostrar mensaje de "Escribiendo..."
            const thinkingMsg = appendMessage('msg-bot', 'Escribiendo...', true);

            try {
                // 3. Llamar al endpoint del servidor
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mensaje: message })
                });

                const data = await response.json();

                // 4. Reemplazar "Escribiendo..." con la respuesta del bot
                if (thinkingMsg) {
                    thinkingMsg.remove();
                }
                appendMessage('msg-bot', data.respuesta);

            } catch (error) {
                // Manejo de errores de red o del servidor
                if (thinkingMsg) {
                    thinkingMsg.remove();
                }
                appendMessage('msg-bot', '⚠️ Lo siento, hubo un error de conexión con el asistente.');
                console.error("Error en la petición de chat:", error);
            } finally {
                input.disabled = false;
                input.focus();
            }
        }

        function appendMessage(cls, text, isThinking = false) {
            const div = document.createElement('div');
            div.className = cls;
            div.textContent = text;

            if (isThinking) {
                // Añadir un pequeño efecto visual para el estado de "escribiendo"
                div.innerHTML = `<span>${text}</span><span class="dot-flashing"></span>`;
                div.style.backgroundColor = '#d1d5db';
                div.style.color = '#4b5563';
                div.style.fontWeight = 'bold';
            }

            chatBody.appendChild(div);
            chatBody.scrollTop = chatBody.scrollHeight;
            return div;
        }

        // CSS para el efecto de "escribiendo..." (dot-flashing)
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dot-flashing {
                0% { opacity: 0.2; }
                50% { opacity: 1; }
                100% { opacity: 0.2; }
            }
            .dot-flashing {
                position: relative;
                width: 5px;
                height: 5px;
                border-radius: 5px;
                background-color: #4b5563;
                color: #4b5563;
                display: inline-block;
                margin-left: 8px;
                animation: dot-flashing 1s infinite linear alternate;
            }
            .dot-flashing::before, .dot-flashing::after {
                content: '';
                display: inline-block;
                position: absolute;
                top: 0;
            }
            .dot-flashing::before {
                left: -8px;
                width: 5px;
                height: 5px;
                border-radius: 5px;
                background-color: #4b5563;
                animation: dot-flashing 1s infinite linear alternate;
                animation-delay: 0s;
            }
            .dot-flashing::after {
                left: 8px;
                width: 5px;
                height: 5px;
                border-radius: 5px;
                background-color: #4b5563;
                animation: dot-flashing 1s infinite linear alternate;
                animation-delay: 0.5s;
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
"""
    return render_template_string(html)

@app.route("/chat", methods=["POST"])
def chat():
    """Maneja la solicitud de chat y llama al modelo Gemini."""

    try:
        user_input = request.json.get("mensaje", "")
        
        # Definir el modelo a usar
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Instrucción del sistema para guiar al modelo
        system_prompt = (
            "Eres un experto asistente virtual para una plataforma P2P de Crypto en Bolivia. "
            "Responde a todas las preguntas de manera amable, clara, concisa y profesional, "
            "enfocándote en temas de criptomonedas, transacciones P2P, y aspectos relacionados "
            "con el contexto boliviano (ej. métodos de pago, regulaciones generales). "
            "Limita tu respuesta a un máximo de 5 frases."
        )

        # Generar contenido con la instrucción del sistema
        response = model.generate_content(
            contents=[user_input],
            config=genai.types.GenerateContentConfig(
                system_instruction=system_prompt
            )
        )
        
        # Retornar la respuesta del modelo
        return jsonify({"respuesta": response.text})

    except Exception as e:
        # Retornar mensaje de error en caso de fallo
        print(f"Error en el endpoint /chat: {e}")
        return jsonify({"respuesta": f"⚠️ Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."})

if __name__ == "__main__":
    # La aplicación se ejecuta en modo debug. Desactiva en producción.
    app.run(debug=True)
