// carrear-frontend-admin/src/components/CreatePositionForm.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; 

const CreatePositionForm = () => {
  const [positionName, setPositionName] = useState('');
  const [industryId, setIndustryId] = useState('');
  const [description, setDescription] = useState('');
  const [industries, setIndustries] = useState([]); // List of industries for dropdown
  const [message, setMessage] = useState('');

  // Fetch industries to populate the dropdown
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        // NOTE: This assumes you create a GET /admin/industries route in the backend
        const response = await api.get('/admin/industries'); 
        setIndustries(response.data);
      } catch (error) {
        console.error("Failed to fetch industries:", error);
      }
    };
    fetchIndustries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const payload = {
        industry_id: industryId,
        position_name: positionName,
        description: description,
        // image_position: /* handle file upload here */ 
      };
      
      // API call to the protected Admin route
      await api.post('/admin/positions', payload); 
      setMessage('Position created successfully!');
      setPositionName('');
      setDescription('');
      setIndustryId('');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to create position.'}`);
    }
  };

  return (
    <div className="card p-4">
      <h5 className="card-title">Position Management</h5>
      <p>Create new positions or update existing ones</p>
      
      {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="positionTitle" className="form-label">Position Title</label>
          <input
            type="text"
            className="form-control"
            id="positionTitle"
            placeholder="e.g., Senior Full Stack Developer"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="industry" className="form-label">Industry</label>
          <select
            className="form-control"
            id="industry"
            value={industryId}
            onChange={(e) => setIndustryId(e.target.value)}
            required
          >
            <option value="">Select Industry</option>
            {industries.map(industry => (
              <option key={industry.id} value={industry.id}>{industry.industry_name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Describe the position..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-dark me-2">Add Position</button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => { setPositionName(''); setDescription(''); setIndustryId(''); setMessage(''); }}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePositionForm;