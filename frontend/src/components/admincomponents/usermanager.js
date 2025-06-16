"use client"

import { useState } from "react"
import {
  FiSearch,
  FiFilter,
  FiMoreHorizontal,
  FiEdit,
  FiTrash2,
  FiUserPlus,
  FiArrowUpDown,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
  FiMail,
} from "react-icons/fi"
import { HiArrowsUpDown } from 'react-icons/hi2'
import "./usermanager.css"

const users = [
  {
    id: "U001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-01-15",
    avatar: "/placeholder-user.jpg",
    initials: "SJ",
  },
  {
    id: "U002",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Contributor",
    status: "Active",
    joinDate: "2023-02-28",
    avatar: "/placeholder-user.jpg",
    initials: "MC",
  },
  {
    id: "U003",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Contributor",
    status: "Active",
    joinDate: "2023-03-10",
    avatar: "/placeholder-user.jpg",
    initials: "EW",
  },
  {
    id: "U004",
    name: "James Rodriguez",
    email: "james@example.com",
    role: "User",
    status: "Inactive",
    joinDate: "2023-04-05",
    avatar: "/placeholder-user.jpg",
    initials: "JR",
  },
  {
    id: "U005",
    name: "Olivia Taylor",
    email: "olivia@example.com",
    role: "Contributor",
    status: "Active",
    joinDate: "2023-05-20",
    avatar: "/placeholder-user.jpg",
    initials: "OT",
  },
  {
    id: "U006",
    name: "Noah Williams",
    email: "noah@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-06-15",
    avatar: "/placeholder-user.jpg",
    initials: "NW",
  },
  {
    id: "U007",
    name: "Sophia Brown",
    email: "sophia@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-07-01",
    avatar: "/placeholder-user.jpg",
    initials: "SB",
  },
]

function UserManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [showAddUserModal, setShowAddUserModal] = useState(false)

  return (
    <div className="user-management">
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p className="text-muted1">Manage users, roles, and permissions.</p>
        </div>
        <div className="page-actions">
          <button className="btn" onClick={() => setShowAddUserModal(true)}>
            <FiUserPlus size={16} />
            Add User
          </button>
        </div>
      </div>

      <div className="search-filter">
        <div className="search-container">
          <FiSearch className="search-icon" size={16} />
          <input type="search" placeholder="Search users..." className="search-input" />
        </div>
        <button className="btn-outline">
          <FiFilter size={16} />
          Filter
        </button>
      </div>

      <div className="tabs">
        <div className="tab-list">
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All Users
          </button>
          <button className={`tab ${activeTab === "admins" ? "active" : ""}`} onClick={() => setActiveTab("admins")}>
            Admins
          </button>
          <button
            className={`tab ${activeTab === "contributors" ? "active" : ""}`}
            onClick={() => setActiveTab("contributors")}
          >
            Contributors
          </button>
          <button className={`tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
            Users
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "all" && (
            <div className="card">
              <div className="table-container">
                <table className="table1">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          Name
                          <HiArrowsUpDown size={12} />
                        </div>
                      </th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>
                        <div className="th-content">
                          Join Date
                          <HiArrowsUpDown size={12} />
                        </div>
                      </th>
                      <th className="actions-column">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info">
                            <div className="avatar">
                              <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <span>{user.initials}</span>
                            </div>
                            <div className="user-name">{user.name}</div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <div className="role-badge">
                            {user.role === "Admin" && <FiAlertCircle size={16} className="role-icon admin" />}
                            {user.role === "Contributor" && <FiCheckCircle size={16} className="role-icon contributor" />}
                            {user.role === "User" && <FiShield size={16} className="role-icon user" />}
                            {user.role}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                        </td>
                        <td>{user.joinDate}</td>
                        <td className="actions-column">
                          <div className="actions-dropdown">
                            <button className="btn-icon">
                              <FiMoreHorizontal size={16} />
                            </button>
                            <div className="dropdown-menu">
                              <div className="dropdown-header">Actions</div>
                              <div className="dropdown-divider"></div>
                              <button className="dropdown-item">
                                <FiEdit size={16} />
                                Edit User
                              </button>
                              <button className="dropdown-item">
                                <FiMail size={16} />
                                Send Email
                              </button>
                              <div className="dropdown-divider"></div>
                              <button className="dropdown-item delete">
                                <FiTrash2 size={16} />
                                Delete User
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <div className="pagination-info">
                  Showing <strong>1-7</strong> of <strong>7</strong> users
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
          {activeTab === "admins" && (
            <div className="card">
              <div className="empty-state">Admin users will be displayed here</div>
            </div>
          )}
          {activeTab === "contributors" && (
            <div className="card">
              <div className="empty-state">Contributor users will be displayed here</div>
            </div>
          )}
          {activeTab === "users" && (
            <div className="card">
              <div className="empty-state">Regular users will be displayed here</div>
            </div>
          )}
        </div>
      </div>

      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="close-button" onClick={() => setShowAddUserModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Full name" className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Email address" className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select id="role" className="form-select">
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="contributor">Contributor</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" className="form-select" defaultValue="active">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="avatar">Avatar</label>
                  <input type="file" id="avatar" className="form-input" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowAddUserModal(false)}>
                Cancel
              </button>
              <button className="btn">Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement