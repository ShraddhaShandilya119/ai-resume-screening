const ResumeModel = require('../Models/resume');
const multer = require("multer");
const pdfParse = require("pdf-parse");
const path = require("path");
const { CohereClient } = require("cohere-ai");
const fs = require("fs");

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

exports.addResume = async (req, res) => {

console.log("FILE:", req.file);
console.log("BODY:", req.body);

    try {
        const { jobDesc, user } = req.body;
        console.log(req.file)
    if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
    }
    
        console.log(jobDesc,user)

        const dataBuffer = req.file.buffer || fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);

        console.log("PDF TEXT LENGTH:", pdfData.text.length);
        console.log("JOB DESC:", jobDesc);

        const prompt = `
            You are a resume screening assistant.
            Compare the following resume text with the provided Job Description (JD) and give a match score (0-100) and feedback.

            Resume:
            ${pdfData.text}

            Job Description:
            ${jobDesc}

            Return the score and a brief explanation in this format:
            Score: XX
            Reason: ...
              ` ;
                const response = await cohere.chat({
                model: "command-nightly",
                message: prompt,
            });

            const result = response.text;

            console.log("AI RESULT:", result);

        const scoreMatch = result.match(/Score:\s*(\d+)/);
        const reasonMatch = result.match(/Reason:\s*([\s\S]*)/);

        const score = scoreMatch ? scoreMatch[1] : null;
        const reason = reasonMatch ? reasonMatch[1].trim() : null;
        console.log(req.file)
        

        const newResume = new ResumeModel({
            user,
            resume_name: req.file.originalname,
            job_desc: jobDesc,
            score,
            feedback: reason
        });

        await newResume.save();
         if (req.file.path) {
        try {
            fs.unlinkSync(req.file.path);
        } catch (err) {
            console.log("File delete error:", err.message);
        }
         }

        res.status(200).json({ message: "Your analysis are ready",  result: result });

        
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Server error', message: err.message });
        }
    }



exports.getAllResumesForUser = async (req, res) => {
    try {
        const { user } = req.params;
        let resumes =await ResumeModel.find({ user: user }).sort({ createdAt: -1});
       return res.status(200).json({ message: "Your Previous History", resumes });


    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error', message: err.message });
    }
}

exports.getResumeForAdmin = async (req, res) => {
    try {
         let resumes = await ResumeModel.find({})
         .populate("user", "name email")
         .sort({ createdAt: -1 });

         return res.status(200).json({
            message:"Fetched All History",
            resume: resumes
         });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Server error',
            message: err.message
        });
    }
}