const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');

require('dotenv').config();
connectDB();



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user',require('./routes/userRoutes'));
app.use('/api/post',require('./routes/postRoutes'));
app.use('/api/comment',require('./routes/commentRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})