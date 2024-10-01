const express = require('express');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/authRoutes');

// Configuración de sesiones
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Cambia a true si usas HTTPS
}));

// Uso de las rutas de autenticación
app.use(authRoutes);

// Iniciar el servidor
app.listen(8080, () => {
  console.log('Servidor corriendo en puerto 8080');
});

