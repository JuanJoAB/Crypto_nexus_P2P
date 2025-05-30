from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')
'''
# Conexión a la base de datos
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="tu_usuario",
        password="tu_contraseña",
        database="criptonexus"
    )

# Obtener publicaciones de venta activas con información del vendedor
@app.route('/publicaciones', methods=['GET'])
def obtener_publicaciones():
    try:
        conn = get_db()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT pv.id_publicacion, pv.cantidad_venta, pv.precio_venta_bob,
                   pv.minimo_compra, u.nombre AS nombre_vendedor,
                   u.puntuacion_usuario, u.numero_ordenes_venta, u.porcentaje_ordenes_exitosas
            FROM publicaciones_venta pv
            JOIN usuarios u ON pv.id_usuario = u.id_usuario
            WHERE pv.estado = 'activa'
            ORDER BY pv.fecha_publicacion DESC
        """

        cursor.execute(query)
        publicaciones = cursor.fetchall()
        return jsonify(publicaciones)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

# Crear una nueva publicación de venta
@app.route('/nueva-orden', methods=['POST'])
def nueva_orden():
    data = request.get_json()

    try:
        conn = get_db()
        cursor = conn.cursor()

        query = """
            INSERT INTO publicaciones_venta (
                id_usuario, cantidad_venta, precio_venta_bob, 
                minimo_compra, reglas_vendedor, imagen_qr
            ) VALUES (%s, %s, %s, %s, %s, %s)
        """

        cursor.execute(query, (
            data['id_usuario'],
            data['cantidad_venta'],
            data['precio_venta_bob'],
            data['minimo_compra'],
            data.get('reglas_vendedor', ''),
            data.get('imagen_qr', '')
        ))

        conn.commit()
        return jsonify({'mensaje': 'Publicación creada con éxito'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()
'''
if __name__ == '__main__':
    app.run(debug=True)
