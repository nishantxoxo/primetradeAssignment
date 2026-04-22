const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/tasks', require('./src/routes/taskRoutes'));

module.exports = app;