const express = require('express');
const cors = require('cors');
const dotenv  = require('dotenv');
const connectDB = require('./config/db');
const authRoutes   = require('./routes/authRoutes');
const productRoutes= require('./routes/productRoutes');
const orderRoutes  = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

 // Enable CORS for our React frontend
 app.use(cors({
   origin: 'http://localhost:5173',  // adjust if your front runs elsewhere
   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
   allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Serve uploads
app.use('/uploads/products', express.static('uploads/products'));

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
