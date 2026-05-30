import React, { useState, useEffect } from 'react'
import styles from './Admin.module.css';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';


const Admin = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true);

  try {
    const results = await axios.get('/api/resume/get');

    console.log("ADMIN DATA:", results.data);

    setData(results.data.resume);  

  } catch (err) {
    console.log(err);
    alert("Something Went Wrong");
  } finally {
    setLoader(false);
  }
}

    fetchAllData()
  }, [])

  console.log("DATA STATE:", data);
  



  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>

        {
          loader && <>
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
          </>
        }
 {
         
  data && data.map((item, index) => {
    
    console.log(item);

    return (
      <div className={styles.AdminCard} key={index}>

        <h2>{item.user?.name}</h2>

<p>
  <span style={{ color: "blue" }}>
    {item.user?.email}
  </span>
</p>

<p>
  Resume: {item.resume_name}
</p>

<p>
  Job: {item.jobDesc}
</p>
        <h3>
          Score : {item.score}%
        </h3>

        <p>
          {item.feedback}
        </p>

      </div>
    );
  })
}



      </div>
    </div>
  )
}

export default WithAuthHOC(Admin);