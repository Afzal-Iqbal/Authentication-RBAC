const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dbConnect');
authRoutes = require('./routes/authRoutes');
userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');

//middleware
app.use(express.json());
app.use(cors());

// TODO: mount routes here, e.g. app.use('/api/auth', require('./routes/auth'))
//Routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes )


const PORT = process.env.PORT || 7002;

dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    });