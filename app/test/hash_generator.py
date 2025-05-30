from werkzeug.security import generate_password_hash, check_password_hash

# Contraseña original
contrasena_original = "1234567"

# 1. Generar el hash de la contraseña
hash_contrasena = generate_password_hash(contrasena_original)
print(f"Hash generado: {hash_contrasena}")

# 2. Verificar una contraseña contra el hash
# Intentamos con la contraseña correcta
contrasena_a_verificar_correcta = "1234567"
if check_password_hash(hash_contrasena, contrasena_a_verificar_correcta):
    print(f"La contraseña '{contrasena_a_verificar_correcta}' ¡COINCIDE! con el hash.")
else:
    print(f"La contraseña '{contrasena_a_verificar_correcta}' NO COINCIDE con el hash.")

# Intentamos con una contraseña incorrecta
contrasena_a_verificar_incorrecta = "7654321"
if check_password_hash(hash_contrasena, contrasena_a_verificar_incorrecta):
    print(f"La contraseña '{contrasena_a_verificar_incorrecta}' ¡COINCIDE! con el hash.")
else:
    print(f"La contraseña '{contrasena_a_verificar_incorrecta}' NO COINCIDE con el hash.")