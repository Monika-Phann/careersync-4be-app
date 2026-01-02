import React, { useState, useRef } from 'react';
import { Modal, Pagination, Form, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import '../assets/css/components/certificatemanagement.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CertificateManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const reportRef = useRef();
  const certificateRef = useRef();

  // Mock Data
  const allCertificates = Array.from({ length: 45 }, (_, i) => ({
    id: `CERT-2026-${(i + 1).toString().padStart(3, '0')}`,
    name: i % 2 === 0 ? 'David Brown' : 'Sarah Johnson',
    email: i % 2 === 0 ? 'david.brown@email.com' : 'sarah.j@email.com',
    program: i % 3 === 0 ? 'Software Developer' : 'Data Analyst',
    mentor: 'James Wilson',
    date: '27/10/2026'
  }));

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allCertificates.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(allCertificates.length / rowsPerPage);

  // EXCEL EXPORT LOGIC
  const exportToExcel = () => {
    const worksheetData = allCertificates.map(cert => ({
      "Certificate No.": cert.id,
      "Student Name": cert.name,
      "Email": cert.email,
      "Program": cert.program,
      "Mentor": cert.mentor,
      "Completion Date": cert.date
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates");
    XLSX.writeFile(workbook, `Certificate_Inventory_${new Date().toLocaleDateString()}.xlsx`);
  };

  // PRINT FULL REPORT LOGIC
  const handlePrintReport = useReactToPrint({
    contentRef: reportRef,
    documentTitle: 'Full_Certificate_Report',
  });

  // PRINT SINGLE CERTIFICATE LOGIC
  const handlePrintSingleCert = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: `Certificate_${selectedCert?.name || 'User'}`,
  });

  const handleViewDetail = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  return (
    <div className="main-content p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 no-print">
        <div>
          <h2 className="header-title">Certificate Management</h2>
          <p className="text-muted">Manage and issue certificates for students and employees</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success" onClick={exportToExcel}>Export Excel</button>
          <button className="btn btn-primary" onClick={() => handlePrintReport()}>Print Report</button>
        </div>
      </div>

      <div className="stats-card mb-4 no-print">
        <span className="text-muted small">Total Certificates</span>
        <h3 className="fw-bold mb-0">9</h3>
      </div>

      <div className="table-container shadow-sm bg-white" ref={reportRef}>
        <div className="p-3 no-print">
          <input type="text" className="form-control search-bar" placeholder="Search by certificate number, student name, email..." />
        </div>
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th className="ps-4">Certificate No.</th>
              <th>Student/Employee</th>
              <th>Program</th>
              <th>Mentor</th>
              <th>Completion Date</th>
              <th className="text-center no-print">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((cert) => (
              <tr key={cert.id} className="align-middle">
                <td className="ps-4 text-primary fw-bold">{cert.id}</td>
                <td>
                  <div className="fw-bold">{cert.name}</div>
                  <div className="text-muted small">{cert.email}</div>
                </td>
                <td>{cert.program}</td>
                <td>{cert.mentor}</td>
                <td>{cert.date}</td>
                 <td className="text-center no-print">
                    <button 
                        className="btn btn-link p-0 border-0 shadow-none" 
                        onClick={() => handleViewDetail(cert)}
                        title="View Certificate"
                    >
                        {/* If this icon is invisible, verify bootstrap-icons is installed */}
                        <i className="bi bi-eye text-primary fs-5"></i>
                        <span className="visually-hidden">View</span>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 no-print">
        <div className="d-flex align-items-center gap-2">
          <span className="small text-muted">Rows per page:</span>
          <Form.Select size="sm" style={{ width: '70px' }} value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </Form.Select>
        </div>
        <Pagination size="sm" className="mb-0">
          <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</Pagination.Prev>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Pagination.Item>
          ))}
          <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Pagination.Next>
        </Pagination>
      </div>


{/* View Detail Modal */}
<Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
  <Modal.Body className="p-0 overflow-hidden">
    {selectedCert ? (
      <div className="certificate-modal-container d-flex" ref={certificateRef}>
        {/* Left Side: Text Details */}
        <div className="cert-left-content p-5 bg-white">
          <h5 className="text-primary fw-bold mb-5">CAREERSYNC</h5>
          <div className="cert-body">
             <p className="text-muted small mb-1">{selectedCert.date}</p>
             <h1 className="display-5 fw-bold mb-2">{selectedCert.name}</h1>
             <p className="fs-6 mb-4">has successfully completed</p>
             <h3 className="fw-bold mb-1 text-dark">{selectedCert.program} Shadowing Program</h3>
             <p className="text-muted small">a job shadowing program from Korinnov</p>
          </div>
          <div className="cert-footer mt-5 pt-5">
             <div className="border-top border-dark d-inline-block pt-2" style={{ width: '200px' }}>
                <p className="mb-0 fw-bold small">Oudom Ngoun</p>
                <p className="text-muted extra-small">Program Director, CareerSync</p>
             </div>
          </div>
        </div>

        {/* Right Side: Blue Vertical Banner */}
        <div className="cert-right-sidebar text-white p-4">
           <div className="badge-seal mt-5">
              <p className="mb-0 small fw-bold">JOB SHADOWING</p>
              <p className="mb-0 h5 fw-bold">CERTIFICATE</p>
           </div>
           <div className="verify-section mt-auto text-center pb-3">
              <p className="extra-small opacity-75 mb-0">Verify at:</p>
              <p className="extra-small">careersync.com/verify/{selectedCert.id}</p>
           </div>
        </div>
      </div>
    ) : (
      <div className="p-5 text-center">Loading certificate details...</div>
    )}
  </Modal.Body>
  <Modal.Footer className="no-print">
    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
    <Button variant="primary" onClick={() => handlePrintSingleCert()}>Print PDF</Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default CertificateManagement;