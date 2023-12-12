// src/components/Jobs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/jobs.css"
import { Link } from 'react-router-dom';
const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log('Fetching jobs...');
    // Replace the URL with your Django API endpoint
    axios.get('http://127.0.0.1:8000/getJobopportunities')
      .then(response => {
        setJobs(response.data.active_jobs);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  function reportJob(jobLink) {
    console.log("Reporting job");

    // Replace the URL with your Django API endpoint for reporting a job
    axios.post('http://127.0.0.1:8000/report-job/', {"job_link":jobLink})
      .then(response => {
        console.log('Job reported successfully:', response);
        setJobs(prevJobs => prevJobs.filter(job => job.job_link !== jobLink));
      
        // You can update the UI or take other actions if needed
      })
      .catch(error => {
        console.error('Error reporting job:', error);
      });
  }

  return (
    <div>
      <Link to="/">Home</Link>
<div class="job-opportunities">
  
  {jobs.map(job => (
    <div class="job-section" key={job.job_id}>
      <h3>{job.role}</h3>
      <p>Company: {job.company_name}</p>
      <p>Location: {job.location}</p>
      <p>Stipend: {job.stipend_amount}</p>
      <p>Job Type: {job.job_type}</p>
      <button onClick={() => window.open(job.job_link, "_blank")}>Apply Now</button>
      <button onClick={() => reportJob(job.job_link)}>Report Job</button>
      {/* <p>Apply here: <a href={job.job_link}>{job.job_link}</a></p> */}
      
    </div>
  ))}
</div>
</div>

  );
};

export default Jobs;
