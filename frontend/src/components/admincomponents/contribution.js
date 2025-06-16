import { useState } from "react"
import { 
  BiSearch, 
  BiFilter, 
  BiCheck, 
  BiX, 
  BiShow, 
  BiMessageRoundedDetail, 
  BiUpDownArrow, 
  BiCodeBlock 
} from "react-icons/bi"
import "./contribution.css"
import { HiArrowsUpDown } from 'react-icons/hi2'

const contributions = [
  {
    id: "C001",
    templateName: "Admin Dashboard Dark Mode",
    category: "Dashboard",
    framework: "React",
    contributor: {
      name: "Olivia Taylor",
      email: "olivia@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "OT",
    },
    status: "Pending",
    submittedDate: "2023-12-18",
  },
  {
    id: "C002",
    templateName: "E-commerce Product Page",
    category: "E-commerce",
    framework: "Vue",
    contributor: {
      name: "Noah Williams",
      email: "noah@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "NW",
    },
    status: "Pending",
    submittedDate: "2023-12-15",
  },
  {
    id: "C003",
    templateName: "Blog with Dark/Light Mode",
    category: "Blog",
    framework: "React",
    contributor: {
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "EW",
    },
    status: "Pending",
    submittedDate: "2023-12-10",
  },
  {
    id: "C004",
    templateName: "Portfolio with 3D Elements",
    category: "Portfolio",
    framework: "Three.js",
    contributor: {
      name: "James Rodriguez",
      email: "james@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "JR",
    },
    status: "Pending",
    submittedDate: "2023-12-05",
  },
  {
    id: "C005",
    templateName: "Landing Page with Animations",
    category: "Landing",
    framework: "React",
    contributor: {
      name: "Sophia Brown",
      email: "sophia@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "SB",
    },
    status: "Pending",
    submittedDate: "2023-12-01",
  },
]

function ContributionRequests() {
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedContribution, setSelectedContribution] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const openReviewModal = (contributionId) => {
    setSelectedContribution(contributionId)
    setShowReviewModal(true)
  }

  const closeReviewModal = () => {
    setShowReviewModal(false)
    setSelectedContribution(null)
  }

  return (
    <div className="contribution-requests">
      <div className="page-header">
        <div>
          <h1>Contribution Requests</h1>
          <p className="text-muted1">Review and manage template contribution requests from users.</p>
        </div>
      </div>

      <div className="search-filter">
        <div className="search-container">
          <BiSearch className="search-icon" size={16} />
          <input type="search" placeholder="Search contributions..." className="search-input" />
        </div>
        <button className="btn-outline">
          <BiFilter size={16} />
          Filter
        </button>
      </div>

      <div className="tabs">
        <div className="tab-list">
          <button className={`tab ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>
            Pending
          </button>
          <button
            className={`tab ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved
          </button>
          <button
            className={`tab ${activeTab === "rejected" ? "active" : ""}`}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected
          </button>
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All Requests
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "pending" && (
            <div className="card">
              <div className="table-container">
                <table className="table1">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          Template
                          <HiArrowsUpDown size={12} />
                        </div>
                      </th>
                      <th>Category</th>
                      <th>Framework</th>
                      <th>Contributor</th>
                      <th>
                        <div className="th-content">
                          Submitted
                          <HiArrowsUpDown size={12} />
                        </div>
                      </th>
                      <th>Status</th>
                      <th className="actions-column">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributions.map((contribution) => (
                      <tr key={contribution.id}>
                        <td className="name-column">{contribution.templateName}</td>
                        <td>{contribution.category}</td>
                        <td>{contribution.framework}</td>
                        <td>
                          <div className="contributor">
                            <div className="avatar">
                              <img
                                src={contribution.contributor.avatar || "/placeholder.svg"}
                                alt={contribution.contributor.name}
                              />
                              <span>{contribution.contributor.initials}</span>
                            </div>
                            <div className="contributor-info">
                              <div className="contributor-name">{contribution.contributor.name}</div>
                              <div className="contributor-email">{contribution.contributor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{contribution.submittedDate}</td>
                        <td>
                          <span className={`status-badge ${contribution.status.toLowerCase()}`}>
                            {contribution.status}
                          </span>
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button className="btn-icon" onClick={() => openReviewModal(contribution.id)}>
                              <BiShow size={16} />
                              <span className="sr-only">View</span>
                            </button>
                            <button className="btn-icon reject">
                              <BiX size={16} />
                              <span className="sr-only">Reject</span>
                            </button>
                            <button className="btn-icon approve">
                              <BiCheck size={16} />
                              <span className="sr-only">Approve</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <div className="pagination-info">
                  Showing <strong>1-5</strong> of <strong>5</strong> pending requests
                </div>
                <div className="pagination-controls">
                  <button className="btn-outline" disabled>
                    Previous
                  </button>
                  <button className="btn-outline" disabled>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "approved" && (
            <div className="card">
              <div className="empty-state">Approved contributions will be displayed here</div>
            </div>
          )}
          {activeTab === "rejected" && (
            <div className="card">
              <div className="empty-state">Rejected contributions will be displayed here</div>
            </div>
          )}
          {activeTab === "all" && (
            <div className="card">
              <div className="empty-state">All contribution requests will be displayed here</div>
            </div>
          )}
        </div>
      </div>

      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Review Contribution</h2>
              <button className="close-button" onClick={closeReviewModal}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="review-layout">
                <div className="review-details">
                  <h3>Template Details</h3>
                  <div className="details-list">
                    <div className="detail-item">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">Admin Dashboard Dark Mode</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">Dashboard</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Framework:</span>
                      <span className="detail-value">React</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Submitted:</span>
                      <span className="detail-value">2023-12-18</span>
                    </div>
                  </div>

                  <h3>Contributor</h3>
                  <div className="contributor">
                    <div className="avatar">
                      <img src="/placeholder-user.jpg" alt="Contributor" />
                      <span>OT</span>
                    </div>
                    <div className="contributor-info">
                      <div className="contributor-name">Olivia Taylor</div>
                      <div className="contributor-email">olivia@example.com</div>
                    </div>
                  </div>

                  <h3>Feedback</h3>
                  <textarea
                    placeholder="Enter feedback for the contributor..."
                    className="feedback-textarea"
                  ></textarea>
                </div>
                <div className="review-preview">
                  <h3>Template Preview</h3>
                  <div className="preview-container">
                    <BiCodeBlock size={40} className="text-muted1" />
                  </div>

                  <h3>Description</h3>
                  <p className="text-muted1">
                    This template features a dark mode admin dashboard with responsive design, customizable components,
                    and interactive charts. It includes a sidebar navigation, data tables, and form elements optimized
                    for administrative interfaces.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-danger">
                <BiX size={16} />
                Reject
              </button>
              <div className="right-actions">
                <button className="btn-outline">
                  <BiMessageRoundedDetail size={16} />
                  Request Changes
                </button>
                <button className="btn">
                  <BiCheck size={16} />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContributionRequests