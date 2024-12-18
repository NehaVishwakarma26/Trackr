const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors=require('cors')
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const progressRoutes = require('./routes/progressRoutes');
const allowedOrigins=['http://localhost:3000'];

const app = express();
const corsOptions={
    origin:(origin,callback)=>{
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by cors'))
        }

    }
}
app.use(cors(corsOptions))
app.use(express.json());

// Connect to MongoDB
connectDB();
// API Routes
app.use('/api', userRoutes); // User routes directly under /api
app.use('/api', projectRoutes); // Project routes directly under /api
app.use('/api', taskRoutes); // Task routes directly under /api
app.use('/api', progressRoutes); // Progress routes directly under /api

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
