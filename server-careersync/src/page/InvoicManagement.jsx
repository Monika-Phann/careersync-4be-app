// src/pages/InvoiceManagement.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/components/invoicemanagement.css'; // កុំភ្លេច file css

const mockInvoices = [
  { id: 'CB0001', user: 'Bjorn Erwin', date: '11-02-2025', amount: 44, commission: 4.4 },
  { id: 'CB0002', user: 'Sarah Johnson', date: '11-02-2025', amount: 75, commission: 7.5 },
  { id: 'CB0003', user: 'Michael Chen', date: '11-04-2025', amount: 80, commission: 8.0 },
  { id: 'CB0004', user: 'Emily Davis', date: '20-10-2025', amount: 40, commission: 4.0 },
  { id: 'CB0005', user: 'David Wilson', date: '11-02-2025', amount: 85, commission: 8.5 },
  { id: 'CB0006', user: 'Lisa Anderson', date: '12-02-2025', amount: 120, commission: 12.0 },
  { id: 'CB0007', user: 'Robert Taylor', date: '13-02-2025', amount: 150, commission: 15.0 },
  { id: 'CB0008', user: 'Jennifer Martinez', date: '14-02-2025', amount: 85, commission: 8.5 },
];

const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
const totalCommission = mockInvoices.reduce((sum, inv) => sum + inv.commission, 0);

const InvoiceManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 8; 

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = mockInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(mockInvoices.length / invoicesPerPage);

  return (
    // ✅ ដាក់ Background ពណ៌ប្រផេះខ្ចី ដើម្បីឱ្យឃើញ Card ពណ៌សលេចធ្លោ
    <div className="invoice-management p-4" style={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>

      {/* Header Text */}
      <h2 className="mb-4 text-dark fw-bold">Invoice Management</h2>
      {/* Stats Cards - ដូរទៅពណ៌ស (bg-white) */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card card-stats bg-white text-dark p-3 rounded border-0 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small text-muted mb-1">Total Revenue</p>
                <h3 className="fw-bold">${totalRevenue.toFixed(2)}</h3>
              </div>
              {/* ដូរ Icon ទៅពណ៌ខៀវ */}
              <div className="icon bg-primary bg-opacity-10 text-primary rounded p-2">
                <i className="bi bi-wallet2 fs-4"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card card-stats bg-white text-dark p-3 rounded border-0 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small text-muted mb-1">Total Commission</p>
                <h3 className="fw-bold">${totalCommission.toFixed(2)}</h3>
              </div>
              {/* ដូរ Icon ទៅពណ៌បៃតង */}
              <div className="icon bg-success bg-opacity-10 text-success rounded p-2">
                <i className="bi bi-cash-stack fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input - ដូរទៅពណ៌ស */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control bg-white text-dark border-0 shadow-sm py-2"
          placeholder="Search by invoice number..."
          style={{ maxWidth: '400px' }}
        />
      </div>

      {/* Table - ដូរទៅពណ៌ស (table-hover) */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase">
                <th className="py-3 ps-4">Invoice ID</th>
                <th className="py-3">Users</th>
                <th className="py-3">Date</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Commission</th>
                <th className="py-3 text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="ps-4 fw-bold text-primary">{inv.id}</td>
                  <td>
                    <span className="fw-medium text-dark">{inv.user}</span>
                  </td>
                  <td className="text-muted">{inv.date}</td>
                  <td className="fw-bold">${inv.amount.toFixed(2)}</td>
                  <td className="text-success">+${inv.commission.toFixed(2)}</td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-light text-primary">
                      <i className="bi bi-eye"></i> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination - Light Theme */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link border-0 shadow-sm mx-1 rounded-circle" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button 
                  className={`page-link border-0 shadow-sm mx-1 rounded-circle ${currentPage === i + 1 ? 'bg-primary text-white' : 'text-dark'}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link border-0 shadow-sm mx-1 rounded-circle" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default InvoiceManagement;