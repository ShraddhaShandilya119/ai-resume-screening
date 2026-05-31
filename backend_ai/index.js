require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;


require('./conn');
const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-resume-screening-khaki.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
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