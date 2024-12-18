const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT ;

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

// API Routes
app.use('/api/universities', require('./routes/universities'));
app.use('/api/login', require('./routes/auth'));

// // Serve static files
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// // Catch-all route
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
