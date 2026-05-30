require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 4000;


require('./conn');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());


const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');

app.use('/api/user', UserRoutes);
app.use('/api/resume', ResumeRoutes);

app.listen(PORT, () => {
    console.log("backend runing on port", PORT);
});