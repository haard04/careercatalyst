// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../csrf';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

const columns = [
  { title: 'Watchlist', key: 'watchlist' },
  { title: 'Applied', key: 'applied' },
  { title: 'Online Assessment', key: 'onlineAssessment' },
  { title: 'Interview', key: 'interview' },
  { title: 'Accepted', key: 'accepted' },
  { title: 'Rejected', key: 'rejected' },
];

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const csrftoken = getCookie('csrftoken');
  const sessionid = getCookie('sessionid');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getjobsbyid', {
          withCredentials: true,
        });
        console.log(response.data);
        if (response.data && response.data.jobs) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, [csrftoken, sessionid]);

  const handleClick = (job) => {
    setSelectedJob(job);
    setSelectedStatus(job.status);
    setIsModalOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      // Make the update request to the server
      await axios.put(`http://localhost:8000/updatejob/${selectedJob.job_id}`, {
        status: selectedStatus.toLowerCase(),
      });
      // Fetch updated jobs after the update
      const response = await axios.get('http://localhost:8000/getjobsbyid', {
        withCredentials: true,
      });
      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error('Error updating job:', error.message);
    } finally {
      // Close the modal
      setIsModalOpen(false);
      setSelectedJob(null);
      setSelectedStatus('');
    }
  };

  return (
    <div className="dashboard">
      <Link to='/jobs'><button className='button'>Jobs</button></Link>
      <Link to='/'><button className='button'>Home</button></Link>
      <div className="columns">
        {columns.map((column) => (
          <div key={column.key} className="column">
            <h2>{column.title}</h2>
            {jobs
              .filter((job) => job.status.toLowerCase() === column.key.toLowerCase())
              .map((job, index) => (
                <div
                  key={job.job_id}
                  className="job-card"
                  onClick={() => handleClick(job)}
                >
                  <h3>{job.role}</h3>
                  <p>Company: {job.company_name}</p>
                  <p>Location: {job.location}</p>
                  <p>Stipend: ${job.stipend_amount}</p>
                  <p>Job Type: {job.job_type}</p>
                  <p>Job Link: {job.job_link}</p>
                  <p>Referred by: {job.referred_by}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedJob.role}</h3>
            <p>Company: {selectedJob.company_name}</p>
            <p>Location: {selectedJob.location}</p>
            <p>Stipend: ${selectedJob.stipend_amount}</p>
            <p>Job Type: {selectedJob.job_type}</p>
            <p>Job Link: {selectedJob.job_link}</p>
            <p>Referred by: {selectedJob.referred_by}</p>
            <label htmlFor="statusDropdown">Select Status:</label>
            <select
              id="statusDropdown"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {columns.map((col) => (
                <option key={col.key} value={col.key.toLowerCase()}>
                  {col.title}
                </option>
              ))}
            </select>
            <button onClick={handleStatusChange}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
