require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;


require('./conn');
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ai-resume-screening-7zmld0fcy-shraddhashandilya119s-projects.vercel.app",
    "https://ai-resume-screening-khaki.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow Postman / server-to-server
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(null, false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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