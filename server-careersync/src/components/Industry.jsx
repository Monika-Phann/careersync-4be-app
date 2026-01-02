// carrear-frontend-admin/src/components/CreateIndustryForm.jsx

import React, { useState } from 'react';
import api from '../api/axiosConfig'; // Configured Axios

const CreateIndustryForm = () => {
  const [industryName, setIndustryName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [industries, setIndustries] = useState([]); // State for listing existing industries

  // Function to submit new industry
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // API call to the protected Admin route
      const response = await api.post('/admin/industries', { industry_name: industryName, description }); 
      setMessage('Industry created successfully!');
      setIndustryName('');
      setDescription('');
      // Optionally refresh the list of industries here: fetchIndustries();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to create industry.'}`);
    }
  };
  
  // NOTE: You would need a separate useEffect/fetchIndustries function 
  // to populate the list shown at the bottom of the UI .

  return (
    <div className="card p-4">
      <h5 className="card-title">Industry Management</h5>
      <p>Create new industries or update existing ones</p>
      
      {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="industryName" className="form-label">Industry Name</label>
          <input
            type="text"
            className="form-control"
            id="industryName"
            placeholder="e.g., Software Development"
            value={industryName}
            onChange={(e) => setIndustryName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Describe the industry..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-dark me-2">Add Industry</button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => { setIndustryName(''); setDescription(''); setMessage(''); }}>Cancel</button>
      </form>
      
      {/* Table to list existing industries would go here */}
    </div>
  );
};

export default CreateIndustryForm;