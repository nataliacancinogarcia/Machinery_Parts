const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuración de conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Machinery_Parts',
    password: 'Rafael2023',
    port: 5432,
});

// Endpoint para obtener datos de la tabla
app.get('/api/rotary-parts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Rotary_Applicator_AKD_400');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/base-parts_iss', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM basic_device_akd_400_iss_app_2');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/meter_parts_iss_1', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM meter_adke_t_6000_200_gm_lh_rh');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/meter_parts_iss_2', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM meter_adke_t_6000_200_gm_lh_rh');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/meter_parts_iss_3', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM basic_unit_ade_6000_0200_meter_3');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/single_barrel_iss_pump_1', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM single_barrel_pump_lasd');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
app.get('/api/single_barrel_iss_pump_2', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM single_barrel_pvc_pump_2');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
app.get('/api/iss_pump_3', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM follower_plate_lasd_pump_3');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/iss_pump_4', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM follower_plate_lasd_pump_4');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/iss_pump_5', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM follower_plate_lasd_pump_5');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_iss_1', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM mounting_applicator_ak523_hem_app');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


app.get('/api/hem_meter_1', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM meter_adke_t_6000_200_gm_lh_rh_hem_meter_1');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_meter_2', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM meter_adke_t_6000_0200_hem_meter_2');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_meter_3', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM basic_unit_ade_6000_0200_hem_3');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_pump_1', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM single_barrel_lasd_hem_pump_1');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_pump_2', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM single_barrel_pvc_hem_pump_2');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_pump_3', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM follower_plate_lasd_hem_pump_3');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_pump_4', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM follower_plate_LASD_hem_pump_4');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/hem_pump_5', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM follower_plate_LASD_hem_pump_5');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


// Configuración SMTP con nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Crear la carpeta /uploads si no existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Configurar multer para manejar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Endpoint para subir archivos PDF y enviar notificación por correo
app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    console.log(`✅ Archivo guardado: ${req.file.filename}`);

    try {
        await sendEmail();
        console.log("Correo de notificación enviado.");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }

    res.status(200).json({ message: 'Archivo guardado con éxito', file: req.file.filename });
});

// Función para enviar notificación por correo
async function sendEmail() {
    const mailOptions = {
        from: process.env.SES_EMAIL_FROM, 
        to: 'natalia.cancino.garcia@gmail.com',
        subject: 'Nueva Cotización Pendiente',
        text: 'Tiene una nueva cotización pendiente por revisar.'
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado con éxito usando AWS SES (SMTP)");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
}

// Endpoint para listar archivos en /uploads
app.get('/list-uploads', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Error al listar archivos' });
        res.json({ archivos: files });
    });
});

// Endpoint para eliminar un archivo específico
app.delete('/delete-file/:filename', (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el archivo' });
        res.json({ message: `Archivo ${req.params.filename} eliminado` });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});