// Configuración de Express: middlewares, rutas de la API y, en producción, el frontend compilado
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import baseDeDatos from './middleware/baseDeDatos.js';
import { rutaNoEncontrada, manejarErrores } from './middleware/errores.js';
import clientes from './routes/clientes.js';
import servicios from './routes/servicios.js';
import horarios from './routes/horarios.js';
import citas from './routes/citas.js';
import disponibilidad from './routes/disponibilidad.js';
import reportes from './routes/reportes.js';
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use('/api', baseDeDatos);
app.use('/api/clientes', clientes);
app.use('/api/servicios', servicios);
app.use('/api/horarios', horarios);
app.use('/api/citas', citas);
app.use('/api/disponibilidad', disponibilidad);
app.use('/api/reportes', reportes);
app.use('/api', rutaNoEncontrada);
// Si existe frontend/dist (npm run build), el mismo servidor lo publica
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.use(manejarErrores);
export default app;
