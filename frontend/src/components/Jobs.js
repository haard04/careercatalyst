// src/components/Jobs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/jobs.css"
const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log('Fetching jobs...');
    // Replace the URL with your Django API endpoint
    axios.get('https://online-resume-watcher-6xw5.onrender.com/getJobopportunities')
      .then(response => {
        setJobs(response.data.active_jobs);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Job Opportunities</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.job_id}>
            <p>{job.role} at {job.company_name}</p>
            <p>Location: {job.location}</p>
            <p>Stipend: {job.stipend_amount}</p>
            <p>Job Type: {job.job_type}</p>
            <p>Apply here: {job.job_link}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
