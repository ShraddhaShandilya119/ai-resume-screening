import React from 'react'
import styles from './Dashboard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/axios';

const Dashboard = () => {

    const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [result, setResult] = useState(null);

    const { userInfo } = useContext(AuthContext);
    console.log(userInfo);

const handleOnChangeFile = (e) => {
    const file = e.target.files[0];

    if(file){
        setResumeFile(file);
        setUploadFileText(file.name);
    }
}
const handleUpload = async () => {
                        
    try {

        if(!resumeFile){
            alert("Please Upload Resume");
            return;
        }

        if(!jobDesc){
            alert("Please Enter Job Description");
            return;
        }

        setLoading(true);

    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("jobDesc", jobDesc);
    formData.append("user", userInfo?._id);

    const response = await axios.post(
    "/api/resume/addResume",
    formData
);

setResult(response.data.result);
console.log("FULL RESPONSE:", response.data);

} catch (err) {

    console.log(err);

} finally {

    setLoading(false);

}
}
     return (
        <div className={styles.Dashboard}>
            <div className={styles.DashboardLeft}>
                <div className={styles.DashboardHeader}>
                    <div className={styles.DashboardHeaderTitle}>Smart Resume Screening
                    </div>
                    <div className={styles.DashboardHeaderTitle}>Resume Match Score</div>
                </div>

                <div className={styles.alertInfo}>
                    <div>🔔 Important Instructions:</div>
                        <div>📋 Please paste the complete job description in the "job Description" field before submitting.
                        </div>
                        <div>📌 Only PDF format (.pdf) resume are accepted
                        </div>
                    </div>

                <div className={styles.DashboardUploadResume}>
                    <div className ={styles.DashboardResumeBlock}>
                        {uploadFiletext}
                    </div>
                    <div className={styles.DashboardInputField}>
                        <label htmlFor='inputField' className={styles.analyzeAIBtn}>Upload Resume</label>
                        <input 
                                type="file" 
                                accept=".pdf" 
                                id='inputField'
                                hidden
                                onChange={handleOnChangeFile}/>
                    </div>
                
                </div>

              <div className={styles.jobDesc}>
                <textarea 
                    value={jobDesc} 
                    onChange={(e) => { setJobDesc(e.target.value) }} 
                    className={styles.textArea} 
                    placeholder='Paste Your Job Description' 
                    rows={10} 
                    cols={50}/>

                    <button className={styles.AnalyzeBtn} onClick={handleUpload}>
                        Analyze
                    </button>
            </div>
            </div>

<div className={styles.DashboardRight}>
    <div className={styles.DashboardRightTopCard}>
        <div>Analyze With AI</div>

       <img 
        className={styles.profileImg} 
        src={userInfo?.photoUrl || "https://via.placeholder.com/150" } 
        alt="profile" 
    />
        <h2>{userInfo?.name}</h2>
    </div>

    {
        result && (
            <div className={styles.DashboardRightTopCard}>
                <div>Result</div>

                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    gap:20
                }}>
                    <h1>
                        {result.match(/Score:\s*(\d+)/)?.[1]}%
                    </h1>

                    <CreditScoreIcon sx={{fontSize:22}}/>
                </div>

                <div className={styles.feedback}>
                    <h3>Feedback</h3>

                    <p>
                        {result.match(/Reason:\s*([\s\S]*)/)?.[1]}
                    </p>
                </div>
            </div>
        )
    }

    {
        loading && (
            <Skeleton
                variant="rectangular"
                sx={{ borderRadius: "20px" }}
                width={280}
                height={280}
            />
        )
    }

</div>
</div>
    )
}

export default WithAuthHOC(Dashboard)