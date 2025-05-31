from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash
import os
import re

app = Flask(__name__)
app.secret_key = 'clave_secreta'

# Configuración de la base de datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cryptonexus'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        repeat_password = request.form.get('repeat_password')

        # Validación de contraseñas
        if password != repeat_password:
            flash('Las contraseñas no coinciden', 'danger')
            return redirect(url_for('register'))

        if len(password) < 8 or not re.search(r'[A-Za-z]', password) or not re.search(r'[0-9]', password):
            flash('La contraseña debe tener al menos 8 caracteres, incluir letras y números.', 'danger')
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password)

        try:
            cur = mysql.connection.cursor()
            cur.execute("""
                INSERT INTO usuarios (nombre, documento_identidad, password)
                VALUES (%s, %s, %s)
            """, (username, email, hashed_password))
            mysql.connection.commit()
            cur.close()
            flash('Registro exitoso', 'success')
            return redirect(url_for('index'))
        except Exception as e:
            flash(f'Error al registrar: {str(e)}', 'danger')
            return redirect(url_for('register'))

    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)

