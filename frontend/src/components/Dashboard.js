// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../csrf';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const csrftoken = getCookie('csrftoken');
  const sessionid = getCookie('sessionid');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://online-resume-watcher-6xw5.onrender.com/getjobsbyid', { 
          withCredentials: true,
        });
        console.log(response.data)
        if (response.data && response.data.jobs) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        // Handle errors...
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, [csrftoken, sessionid]);

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Render jobs in your component */}
      {jobs.map(job => (
        <div key={job.job_id} className="job-card">
          <h3>{job.role}</h3>
          <p>Company: {job.company_name}</p>
          <p>Location: {job.location}</p>
          <p>Stipend: ${job.stipend_amount}</p>
          <p>Job Type: {job.job_type}</p>
          <p>Status: {job.status}</p>
          <a href={job.job_link} target="_blank" rel="noopener noreferrer">Job Link</a>
          <p>Referred by: {job.referred_by}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
