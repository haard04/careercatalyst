// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../csrf';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const csrftoken = getCookie('csrftoken');
  const sessionid = getCookie('sessionid')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log(csrftoken)
        const response = await axios.get('http://localhost:8000/getjobsbyid', {
          headers: {
            'X-CSRFToken': csrftoken,
            'Cookie': `sessionid=${sessionid}; csrftoken=${csrftoken}`,
          },
        });

        if (response.data && response.data.jobs) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        // Handle errors...
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, [csrftoken,sessionid]);

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Render jobs in your component */}
      {jobs.map(job => (
        <div key={job.job_id}>
          <p>{job.role} at {job.company_name}</p>
          {/* Add other job details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
