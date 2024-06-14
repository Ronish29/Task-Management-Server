const express = require('express')
const app = express();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();
const cors = require('cors')
const PORT = process.env.PORT || 4000;
const {dbConnect} = require('./config/database')

app.listen(PORT,()=>{
    console.log(`App is running at http://localhost:${PORT}`);
})

dbConnect();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);



app.get('/',(req,res) => {
    res.json({
        success: true,
        message: "Server running perfectly"
    })
})