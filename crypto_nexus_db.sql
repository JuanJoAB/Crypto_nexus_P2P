-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellidos VARCHAR(50),
    fecha_nacimiento DATE,
    pais_residencia VARCHAR(50),
    ciudad_residencia VARCHAR(50),
    nacionalidad VARCHAR(50),
    tipo_documento VARCHAR(20),
    documento_identidad VARCHAR(30) UNIQUE,
    numero_telefono VARCHAR(20),
    numero_ordenes_venta INT DEFAULT 0,
    porcentaje_ordenes_exitosas DECIMAL(5,2) DEFAULT 0.00,
    saldo_cripto DECIMAL(18,8) DEFAULT 0.0,
    saldo_fondo_ahorro DECIMAL(18,8) DEFAULT 0.0,
    saldo_publicacion_venta DECIMAL(18,8) DEFAULT 0.0,
    balance_total DECIMAL(18,8) DEFAULT 0.0
);

-- Tabla de publicaciones de venta
CREATE TABLE publicaciones_venta (
    id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    cantidad_venta DECIMAL(18,8),
    imagen_qr TEXT,
    reglas_vendedor TEXT,
    estado ENUM('activa', 'completada', 'cancelada') DEFAULT 'activa',
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla de compras
CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_publicacion INT,
    id_comprador INT,
    cantidad_comprada DECIMAL(18,8),
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('en progreso', 'completada', 'cancelada') DEFAULT 'en progreso',
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones_venta(id_publicacion),
    FOREIGN KEY (id_comprador) REFERENCES usuarios(id_usuario)
);

-- Tabla de chats en compras
CREATE TABLE chat_compras (
    id_chat INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT,
    emisor INT,
    mensaje TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (emisor) REFERENCES usuarios(id_usuario)
);

-- Tabla de transferencias
CREATE TABLE transferencias (
    id_transferencia INT AUTO_INCREMENT PRIMARY KEY,
    id_emisor INT,
    id_receptor INT,
    cantidad DECIMAL(18,8),
    fecha_transferencia DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_emisor) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_receptor) REFERENCES usuarios(id_usuario)
);

-- Tabla de ahorros
CREATE TABLE ahorros (
    id_ahorro INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    cantidad_invertida DECIMAL(18,8),
    tasa_interes DECIMAL(5,2) DEFAULT 7.00,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME,
    estado ENUM('activo', 'finalizado') DEFAULT 'activo',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla de cambios directos con comisión
CREATE TABLE cambios_directos (
    id_cambio INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    cantidad_bob DECIMAL(18,2),
    cantidad_usdt DECIMAL(18,8),
    comision_aplicada DECIMAL(5,2) DEFAULT 5.00,
    fecha_cambio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
