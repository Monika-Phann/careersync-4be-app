// // // src/pages/MentorApprovalPage.jsx
// // import React, { useState, useEffect } from 'react';
// // import api from '../api/axiosConfig';
// // import * as XLSX from 'xlsx';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';
// // import '../assets/css/components/mentorapprove.css';

// // const MentorApprovalPage = () => {
// //   const [pendingMentors, setPendingMentors] = useState([]);
// //   const [stats, setStats] = useState({ total: 0, accepted: 0, rejected: 0, pending: 0 });
// //   const [selectedMentor, setSelectedMentor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       const [pendingRes, statsRes] = await Promise.all([
// //         api.get('/admin/mentors/pending'),

// //         api.get('/admin/mentors/stats')
// //       ]);
// //       setPendingMentors(pendingRes.data);
// //       setStats(statsRes.data);
// //     } catch (err) {
// //       setError('Failed to load data');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReview = async (mentorId, action) => {
// //     if (!window.confirm(`Are you sure you want to ${action} this mentor?`)) return;
// //     try {
// //       await api.patch(`/admin/mentors/${mentorId}/review`, { action });
// //       alert(`Mentor ${action}ed successfully!`);
// //       fetchData();
// //     } catch (err) {
// //       alert('Action failed: ' + (err.response?.data?.message || err.message));
// //     }
// //   };

// //   const exportExcel = () => {
// //     const ws = XLSX.utils.json_to_sheet(pendingMentors.map(m => ({
// //       'Full Name': `${m.first_name} ${m.last_name}`,
// //       Gender: m.gender,
// //       'Job Title': m.job_title,
// //       Position: m.position_name,
// //       'Applied Date': new Date(m.created_at).toLocaleDateString(),
// //     })));
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, 'Pending Mentors');
// //     XLSX.writeFile(wb, 'Pending_Mentors_Report.xlsx');
// //   };

// //   const printPDF = () => {
// //     import('jspdf-autotable').then(({ default: autoTable }) => {
// //       const doc = new jsPDF();
// //       doc.setFontSize(20);
// //       doc.text('Pending Mentor Applications', 20, 20);
// //       doc.setFontSize(12);
// //       doc.text(`Total Pending: ${stats.pending}`, 20, 30);

// //       autoTable(doc, {
// //         startY: 40,
// //         head: [['Name', 'Gender', 'Job Title', 'Position', 'Applied Date']],
// //         body: pendingMentors.map(m => [
// //           `${m.first_name} ${m.last_name}`,
// //           m.gender || '-',
// //           m.job_title || '-',
// //           m.position_name || '-',
// //           new Date(m.created_at).toLocaleDateString()
// //         ]),
// //         theme: 'grid',
// //         headStyles: { fillColor: [111, 66, 193] },
// //       });

// //       doc.save('Pending_Mentors_Report.pdf');
// //     });
// //   };

// //   if (loading) return <div className="text-center py-5">Loading mentor applications...</div>;
// //   if (error) return <div className="alert alert-danger">{error}</div>;

// //   return (
// //     <div className="mentor-approval-page container py-4">
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <div>
// //           <h2>Mentor Management</h2>
// //           <p>Review and manage mentor applications</p>
// //         </div>
// //         <div>
// //           <button className="btn btn-purple me-2" onClick={exportExcel}>
// //             Export Excel
// //           </button>
// //           <button className="btn btn-info" onClick={printPDF}>
// //             Print Report
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="row mb-4">
// //         <div className="col-md-3">
// //           <div className="card text-white bg-primary shadow-sm">
// //             <div className="card-body">
// //               <h5>Total Mentors</h5>
// //               <h3>{stats.total}</h3>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="col-md-3">
// //           <div className="card text-white bg-success shadow-sm">
// //             <div className="card-body">
// //               <h5>Accepted</h5>
// //               <h3>{stats.accepted}</h3>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="col-md-3">
// //           <div className="card text-white bg-danger shadow-sm">
// //             <div className="card-body">
// //               <h5>Rejected</h5>
// //               <h3>{stats.rejected}</h3>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="col-md-3">
// //           <div className="card text-white bg-warning shadow-sm">
// //             <div className="card-body">
// //               <h5>Pending</h5>
// //               <h3>{stats.pending}</h3>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Pending Table */}
// //       <div className="card shadow-sm">
// //         <div className="card-header bg-dark text-white d-flex justify-content-between">
// //           <h5>Pending Applications ({pendingMentors.length})</h5>
// //         </div>
// //         <div className="card-body p-0">
// //           {pendingMentors.length === 0 ? (
// //             <div className="p-4 text-center text-muted">No pending applications</div>
// //           ) : (
// //             <div className="table-responsive">
// //               <table className="table table-hover mb-0">
// //                 <thead className="table-light">
// //                   <tr>
// //                     <th>Actions</th>
// //                     <th>Name</th>
// //                     <th>Gender</th>
// //                     <th>Job Title</th>
// //                     <th>Position</th>
// //                     <th>CV</th>
// //                     <th>Applied Date</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {pendingMentors.map((mentor) => (
// //                     <tr key={mentor.id}>
// //                       <td>
// //                         <button
// //                           className="btn btn-sm btn-outline-info me-1"
// //                           onClick={() => setSelectedMentor(mentor)}
// //                         >
// //                           View
// //                         </button>
// //                         <button
// //                           className="btn btn-sm btn-success me-1"
// //                           onClick={() => handleReview(mentor.id, 'accept')}
// //                         >
// //                           Accept
// //                         </button>
// //                         <button
// //                           className="btn btn-sm btn-danger"
// //                           onClick={() => handleReview(mentor.id, 'reject')}
// //                         >
// //                           Reject
// //                         </button>
// //                       </td>
// //                       <td><strong>{mentor.first_name} {mentor.last_name}</strong></td>
// //                       <td>{mentor.gender || '-'}</td>
// //                       <td>{mentor.job_title || '-'}</td>
// //                       <td>{mentor.position_name || '-'}</td>
// //                       <td>
// //                         {mentor.document_url ? (
// //                           <a href={mentor.document_url} target="_blank" rel="noreferrer" className="text-primary">
// //                             View CV
// //                           </a>
// //                         ) : '-'}
// //                       </td>
// //                       <td>{new Date(mentor.created_at).toLocaleDateString()}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* View Modal */}
// //       {selectedMentor && (
// //         <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
// //           <div className="modal-dialog modal-lg">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5>Mentor Application Details</h5>
// //                 <button className="btn-close" onClick={() => setSelectedMentor(null)}></button>
// //               </div>
// //               <div className="modal-body">
// //                 <div className="row">
// //                   <div className="col-md-6">
// //                     <p><strong>Name:</strong> {selectedMentor.first_name} {selectedMentor.last_name}</p>
// //                     <p><strong>Gender:</strong> {selectedMentor.gender}</p>
// //                     <p><strong>Job Title:</strong> {selectedMentor.job_title}</p>
// //                     <p><strong>Position:</strong> {selectedMentor.position_name}</p>
// //                   </div>
// //                   <div className="col-md-6">
// //                     <p><strong>CV/Portfolio:</strong></p>
// //                     {selectedMentor.document_url ? (
// //                       <a href={selectedMentor.document_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
// //                         Download CV
// //                       </a>
// //                     ) : <span className="text-muted">Not provided</span>}
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="modal-footer">
// //                 <button className="btn btn-secondary" onClick={() => setSelectedMentor(null)}>Close</button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MentorApprovalPage;


// // src/pages/MentorApprovalPage.jsx
// import React, { useState, useEffect } from 'react';
// import api from '../api/axiosConfig';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import '../assets/css/components/mentorapprove.css';
// import Swal from "sweetalert2"; // ណែនាំឱ្យប្រើ SweetAlert2 ឱ្យស្អាត

// const MentorApprovalPage = () => {
//   const [pendingMentors, setPendingMentors] = useState([]);
//   const [stats, setStats] = useState({ total: 0, accepted: 0, rejected: 0, pending: 0 });
//   const [selectedMentor, setSelectedMentor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null); // ដើម្បីដាក់ loading លើប៊ូតុងពេលចុច

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [pendingRes, statsRes] = await Promise.all([
//         api.get('/admin/mentors/pending'),
//         api.get('/admin/mentors/stats')
//       ]);
//       setPendingMentors(pendingRes.data);
//       setStats(statsRes.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReview = async (mentorId, action) => {
//     // បញ្ជាក់ម្តងទៀតមុនសម្រេចចិត្ត
//     const result = await Swal.fire({
//       title: `Are you sure you want to ${action}?`,
//       text: action === 'accept' 
//           ? "This mentor will receive an approval email and can login immediately." 
//           : "This mentor will receive a rejection email.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: action === 'accept' ? '#10B981' : '#EF4444',
//       confirmButtonText: `Yes, ${action}!`
//     });

//     if (!result.isConfirmed) return;

//     try {
//       setProcessingId(mentorId); // បង្ហាញ Loading
      
//       // ហៅទៅ Backend (Backend នឹង update status + ផ្ញើ email)
//       const res = await api.patch(`/admin/mentors/${mentorId}/review`, { action });
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: res.data.message || `Mentor ${action}ed successfully!`,
//         timer: 2000
//       });

//       // Update ទិន្នន័យក្នុងតារាងភ្លាមៗ
//       fetchData();

//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: err.response?.data?.message || 'Action failed',
//       });
//     } finally {
//       setProcessingId(null); // បិទ Loading
//     }
//   };

//   // ... (Export Excel & PDF functions remain the same as your code) ...
//   const exportExcel = () => { /* ...code ចាស់របស់បង... */ };
//   const printPDF = () => { /* ...code ចាស់របស់បង... */ };

//   if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div> Loading...</div>;

//   return (
//     <div className="mentor-approval-page container py-4">
//       {/* ... (Header & Stats Cards code នៅដដែល) ... */}
      
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Mentor Management</h2>
//         <div>
//            {/* Buttons... */}
//         </div>
//       </div>
      
//       {/* Stats Cards here... */}

//       {/* Pending Table */}
//       <div className="card shadow-sm mt-4">
//         <div className="card-header bg-dark text-white">
//           <h5>Pending Applications ({pendingMentors.length})</h5>
//         </div>
//         <div className="card-body p-0">
//           {pendingMentors.length === 0 ? (
//             <div className="p-4 text-center text-muted">No pending applications</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-hover mb-0 align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Name</th>
//                     <th>Role Info</th>
//                     <th>Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pendingMentors.map((mentor) => (
//                     <tr key={mentor.id}>
//                       <td>
//                         <div className="fw-bold">{mentor.first_name} {mentor.last_name}</div>
//                         <small className="text-muted">{mentor.gender}</small>
//                       </td>
//                       <td>
//                         <div>{mentor.job_title || 'N/A'}</div>
//                         <small className="text-primary">{mentor.position_name || 'N/A'}</small>
//                       </td>
//                       <td>{new Date(mentor.created_at).toLocaleDateString()}</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-outline-primary me-2"
//                           onClick={() => setSelectedMentor(mentor)}
//                           disabled={processingId === mentor.id}
//                         >
//                           View
//                         </button>
                        
//                         <button
//                           className="btn btn-sm btn-success me-2"
//                           onClick={() => handleReview(mentor.id, 'accept')}
//                           disabled={processingId === mentor.id}
//                         >
//                           {processingId === mentor.id ? 'Processing...' : 'Accept'}
//                         </button>
                        
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleReview(mentor.id, 'reject')}
//                           disabled={processingId === mentor.id}
//                         >
//                           {processingId === mentor.id ? '...' : 'Reject'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* View Modal (ដូចកូដចាស់របស់បង) */}
//       {selectedMentor && (
//         <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
//            {/* ... Modal content code ... */}
//            <div className="modal-dialog modal-lg">
//              <div className="modal-content">
//                <div className="modal-header">
//                  <h5>Applicant Details</h5>
//                  <button className="btn-close" onClick={() => setSelectedMentor(null)}></button>
//                </div>
//                <div className="modal-body">
//                  {/* Detail content */}
//                  <p>Name: {selectedMentor.first_name} {selectedMentor.last_name}</p>
//                  {/* ... */}
//                </div>
//              </div>
//            </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MentorApprovalPage;




import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from "sweetalert2"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/components/mentorapprove.css'; // កុំភ្លេច file CSS ខាងក្រោម

const MentorApprovalPage = () => {
  const [pendingMentors, setPendingMentors] = useState([]);
  const [stats, setStats] = useState({ total: 0, accepted: 0, rejected: 0, pending: 0 });
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // ចង់បង្ហាញប៉ុន្មាននាក់ក្នុង ១ ទំព័រ?

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pendingRes, statsRes] = await Promise.all([
        api.get('/admin/mentors/pending'),
        api.get('/admin/mentors/stats')
      ]);
      setPendingMentors(pendingRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingMentors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pendingMentors.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // --- Action Logic ---
  const handleReview = async (mentorId, action) => {
    const result = await Swal.fire({
      title: action === 'accept' ? 'Approve Mentor?' : 'Reject Mentor?',
      text: action === 'accept' 
          ? "They will be able to access the platform immediately." 
          : "Are you sure you want to reject this application?",
      icon: action === 'accept' ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'accept' ? '#10B981' : '#EF4444',
      confirmButtonText: action === 'accept' ? 'Yes, Approve' : 'Yes, Reject',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      setProcessingId(mentorId);
      const res = await api.patch(`/admin/mentors/${mentorId}/review`, { action });
      
      Swal.fire({
        icon: 'success',
        title: 'Done!',
        text: res.data.message || `Mentor ${action}ed successfully!`,
        timer: 1500,
        showConfirmButton: false
      });

      fetchData(); // Refresh data
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Action failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  // --- Export Functions (Mockup - Keep your logic) ---
  const exportExcel = () => {
     const ws = XLSX.utils.json_to_sheet(pendingMentors);
     const wb = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Pending');
     XLSX.writeFile(wb, 'Mentors.xlsx');
  };
  
  const printPDF = () => {
    const doc = new jsPDF();
    doc.text('Mentor List', 20, 20);
    doc.save('mentors.pdf');
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );

  return (
    <div className="mentor-approval-page container-fluid px-4 py-4">
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Mentor Management</h2>
          <p className="text-muted mb-0">Overview of mentor applications and status.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success d-flex align-items-center gap-2" onClick={exportExcel}>
            <i className="bi bi-file-earmark-excel"></i> Export Excel
          </button>
          <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={printPDF}>
            <i className="bi bi-file-earmark-pdf"></i> PDF Report
          </button>
        </div>
      </div>

    {/* Modern Stats Cards - Improved Padding & Layout */}
      <div className="row g-4 mb-5 justify-content-center">
        {[
          { title: 'Total Mentors', value: stats.total, icon: 'bi-people', color: 'primary' },
          { title: 'Accepted', value: stats.accepted, icon: 'bi-check-circle', color: 'success' },
          { title: 'Rejected', value: stats.rejected, icon: 'bi-x-circle', color: 'danger' },
          { title: 'Pending Review', value: stats.pending, icon: 'bi-hourglass-split', color: 'warning' },
        ].map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3 d-flex">
            <div className="card border-0 shadow-sm w-100 stats-card hover-lift">
              <div className="card-body p-4 d-flex align-items-center">
                {/* Icon Section */}
                <div 
                  className={`d-flex align-items-center justify-content-center rounded-4 me-3 bg-${item.color} bg-opacity-10 text-${item.color}`}
                  style={{ width: '64px', height: '64px', minWidth: '64px' }}
                >
                  <i className={`bi ${item.icon} fs-3`}></i>
                </div>
                
                {/* Text Section - Middle Aligned */}
                <div>
                  <p className="text-uppercase text-muted small fw-bold mb-1">{item.title}</p>
                  <h2 className="fw-bold mb-0 text-dark">{item.value}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-primary">
            <i className="bi bi-clock-history me-2"></i>Pending Applications
          </h5>
          <span className="badge bg-primary rounded-pill px-3">{pendingMentors.length} New</span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 custom-table">
            <thead className="bg-light">
              <tr className="text-uppercase text-secondary small">
                <th className="ps-4">Applicant</th>
                <th>Role Info</th>
                <th>Date Applied</th>
                <th>Resume</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                    No pending applications found.
                  </td>
                </tr>
              ) : (
                currentItems.map((mentor) => (
                  <tr key={mentor.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle bg-primary text-white me-3">
                          {mentor.first_name.charAt(0)}{mentor.last_name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">{mentor.first_name} {mentor.last_name}</h6>
                          <small className="text-muted">{mentor.gender}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-medium text-dark">{mentor.job_title || 'N/A'}</div>
                      <small className="text-primary bg-primary bg-opacity-10 px-2 py-0.5 rounded">
                        {mentor.position_name}
                      </small>
                    </td>
                    <td className="text-muted">
                        <i className="bi bi-calendar3 me-1"></i>
                        {new Date(mentor.created_at).toLocaleDateString()}
                    </td>
                    <td>
                        {mentor.document_url ? (
                             <a href={mentor.document_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-light text-primary border">
                                <i className="bi bi-download me-1"></i> CV
                             </a>
                        ) : <span className="text-muted small">No File</span>}
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <button 
                            className="btn btn-sm btn-light text-dark"
                            onClick={() => setSelectedMentor(mentor)}
                            title="View Details"
                        >
                            <i className="bi bi-eye"></i>
                        </button>
                        <button 
                            className="btn btn-sm btn-success text-white"
                            onClick={() => handleReview(mentor.id, 'accept')}
                            disabled={processingId === mentor.id}
                        >
                             <i className="bi bi-check-lg"></i>
                        </button>
                        <button 
                            className="btn btn-sm btn-danger text-white"
                            onClick={() => handleReview(mentor.id, 'reject')}
                            disabled={processingId === mentor.id}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {pendingMentors.length > 0 && (
          <div className="card-footer bg-white py-3 border-top">
            <nav className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, pendingMentors.length)} of {pendingMentors.length} entries
                </span>
                <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link border-0 rounded-circle mx-1" onClick={() => handlePageChange(currentPage - 1)}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link border-0 rounded-circle mx-1" onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link border-0 rounded-circle mx-1" onClick={() => handlePageChange(currentPage + 1)}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Improved Modal */}
      {selectedMentor && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title fw-bold">Mentor Application Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedMentor(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3">
                    <div className="avatar-circle bg-primary text-white fs-3 me-3" style={{width: '60px', height: '60px'}}>
                        {selectedMentor.first_name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="mb-0 fw-bold">{selectedMentor.first_name} {selectedMentor.last_name}</h4>
                        <p className="text-muted mb-0">{selectedMentor.email || 'No Email Provided'}</p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-6">
                        <label className="text-muted small text-uppercase fw-bold">Professional Info</label>
                        <div className="mt-2">
                            <p className="mb-1"><strong>Job Title:</strong> {selectedMentor.job_title}</p>
                            <p className="mb-1"><strong>Position:</strong> {selectedMentor.position_name}</p>
                            <p className="mb-1"><strong>Experience:</strong> {selectedMentor.experience || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="text-muted small text-uppercase fw-bold">Personal Info</label>
                        <div className="mt-2">
                            <p className="mb-1"><strong>Gender:</strong> {selectedMentor.gender}</p>
                            <p className="mb-1"><strong>Phone:</strong> {selectedMentor.phone || 'N/A'}</p>
                            <p className="mb-1"><strong>Applied:</strong> {new Date(selectedMentor.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
              </div>
              <div className="modal-footer border-top-0 pt-0 pb-4 pe-4">
                <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setSelectedMentor(null)}>Close</button>
                <a 
                    href={selectedMentor.document_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`btn btn-primary rounded-pill px-4 ${!selectedMentor.document_url ? 'disabled' : ''}`}
                >
                    Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorApprovalPage;