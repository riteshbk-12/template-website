"use client"

import { useState } from "react"
import { 
  BiSearch, 
  BiFilter, 
  BiPlus, 
  BiDotsHorizontalRounded, 
  BiEdit,
  BiTrash, 
  BiShow, 
  BiCodeBlock,
  BiUpDownArrow 
} from "react-icons/bi"
import { HiArrowsUpDown } from 'react-icons/hi2'
import "./template.css"

const templates = [
  {
    id: "T001",
    name: "Modern Dashboard UI",
    category: "Dashboard",
    framework: "React",
    author: "Sarah Johnson",
    downloads: 1245,
    status: "Published",
    lastUpdated: "2023-12-15",
  },
  {
    id: "T002",
    name: "E-commerce Starter Kit",
    category: "E-commerce",
    framework: "Vue",
    author: "Michael Chen",
    downloads: 987,
    status: "Published",
    lastUpdated: "2023-11-28",
  },
  {
    id: "T003",
    name: "Portfolio Template Pro",
    category: "Portfolio",
    framework: "React",
    author: "Emma Wilson",
    downloads: 756,
    status: "Published",
    lastUpdated: "2023-12-05",
  },
  {
    id: "T004",
    name: "Blog Creator Suite",
    category: "Blog",
    framework: "Angular",
    author: "James Rodriguez",
    downloads: 543,
    status: "Published",
    lastUpdated: "2023-10-20",
  },
  {
    id: "T005",
    name: "Admin Dashboard Dark Mode",
    category: "Dashboard",
    framework: "React",
    author: "Olivia Taylor",
    downloads: 432,
    status: "Draft",
    lastUpdated: "2023-12-18",
  },
  {
    id: "T006",
    name: "Landing Page Builder",
    category: "Landing",
    framework: "Vue",
    author: "Noah Williams",
    downloads: 321,
    status: "Published",
    lastUpdated: "2023-11-10",
  },
  {
    id: "T007",
    name: "Social Media Dashboard",
    category: "Dashboard",
    framework: "Svelte",
    author: "Sophia Brown",
    downloads: 210,
    status: "Draft",
    lastUpdated: "2023-12-01",
  },
]

function TemplateManagement() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showTemplateEditor, setShowTemplateEditor] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const openTemplateEditor = (templateId) => {
    setSelectedTemplate(templateId)
    setShowTemplateEditor(true)
  }

  const closeTemplateEditor = () => {
    setShowTemplateEditor(false)
    setSelectedTemplate(null)
  }

  return (
    <div className="template-management">
      <div className="page-header">
        <div>
          <h1>Template Management</h1>
          <p className="text-muted1">Manage, edit and create templates for your website.</p>
        </div>
        <div className="page-actions">
          <button className="btn" onClick={() => setShowTemplateEditor(true)}>
            <BiPlus size={16} />
            Add Template
          </button>
        </div>
      </div>

      <div className="search-filter">
        <div className="search-container">
          <BiSearch className="search-icon" size={16} />
          <input type="search" placeholder="Search templates..." className="search-input" />
        </div>
        <button className="btn-outline">
          <BiFilter size={16} />
          Filter
        </button>
      </div>

      <div className="tabs">
        <div className="tab-list">
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All Templates
          </button>
          <button
            className={`tab ${activeTab === "published" ? "active" : ""}`}
            onClick={() => setActiveTab("published")}
          >
            Published
          </button>
          <button className={`tab ${activeTab === "drafts" ? "active" : ""}`} onClick={() => setActiveTab("drafts")}>
            Drafts
          </button>
          <button
            className={`tab ${activeTab === "archived" ? "active" : ""}`}
            onClick={() => setActiveTab("archived")}
          >
            Archived
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
                        <input type="checkbox" />
                      </th>
                      <th>
                        <div className="th-content">
                          Name
                          <HiArrowsUpDown size={12} />
                        </div>
                      </th>
                      <th>Category</th>
                      <th>Framework</th>
                      <th>Author</th>
                      <th>
                        <div className="th-content">
                          Downloads
                          <HiArrowsUpDown size={12} />
                        </div>
                      </th>
                      <th>Status</th>
                      <th>
                        <div className="th-content">
                          Last Updated
                          <HiArrowsUpDown size={12} />
                        </div>
                      </th>
                      <th className="actions-column">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates.map((template) => (
                      <tr key={template.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td className="name-column">{template.name}</td>
                        <td>{template.category}</td>
                        <td>{template.framework}</td>
                        <td>{template.author}</td>
                        <td>{template.downloads}</td>
                        <td>
                          <span className={`status-badge ${template.status.toLowerCase()}`}>{template.status}</span>
                        </td>
                        <td>{template.lastUpdated}</td>
                        <td className="actions-column">
                          <div className="actions-dropdown">
                            <button className="btn-icon">
                              <BiDotsHorizontalRounded size={16} />
                            </button>
                            <div className="dropdown-menu">
                              <div className="dropdown-header">Actions</div>
                              <div className="dropdown-divider"></div>
                              <button className="dropdown-item" onClick={() => openTemplateEditor(template.id)}>
                                <BiEdit size={16} />
                                Edit Template
                              </button>
                              <button className="dropdown-item">
                                <BiShow size={16} />
                                Preview
                              </button>
                              <div className="dropdown-divider"></div>
                              <button className="dropdown-item delete">
                                <BiTrash size={16} />
                                Delete
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
                  Showing <strong>1-7</strong> of <strong>100</strong> templates
                </div>
                <div className="pagination-controls">
                  <button className="btn-outline" disabled>
                    Previous
                  </button>
                  <button className="btn-outline">Next</button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "published" && (
            <div className="card">
              <div className="empty-state">Published templates will be displayed here</div>
            </div>
          )}
          {activeTab === "drafts" && (
            <div className="card">
              <div className="empty-state">Draft templates will be displayed here</div>
            </div>
          )}
          {activeTab === "archived" && (
            <div className="card">
              <div className="empty-state">Archived templates will be displayed here</div>
            </div>
          )}
        </div>
      </div>

      {showTemplateEditor && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedTemplate ? "Edit Template" : "Add New Template"}</h2>
              <button className="close-button" onClick={closeTemplateEditor}>
                ×
              </button>
            </div>
            <div className="modal-tabs">
              <button className="modal-tab active">Components</button>
              <button className="modal-tab">Icons</button>
              <button className="modal-tab">Settings</button>
              <button className="modal-tab">Preview</button>
            </div>
            <div className="modal-content">
              <div className="editor-layout">
                <div className="component-library">
                  <h3>Component Library</h3>
                  <p className="text-muted1">Drag and drop components to the editor</p>
                  <div className="component-list">
                    <div className="component-item">
                      <BiCodeBlock size={16} />
                      <span>Header</span>
                    </div>
                    <div className="component-item">
                      <BiCodeBlock size={16} />
                      <span>Hero Section</span>
                    </div>
                    <div className="component-item">
                      <BiCodeBlock size={16} />
                      <span>Feature Grid</span>
                    </div>
                    <div className="component-item">
                      <BiCodeBlock size={16} />
                      <span>Testimonial</span>
                    </div>
                    <div className="component-item">
                      <BiCodeBlock size={16} />
                      <span>Pricing Table</span>
                    </div>
                    <div className="component-item">
                      <BiCodeBlock size={16} />
                      <span>Contact Form</span>
                    </div>
                    <div className="component-item">
                      <BiCodeBlock size={16} />
                      <span>Footer</span>
                    </div>
                  </div>
                </div>
                <div className="editor-area">
                  <h3>Template Editor</h3>
                  <p className="text-muted1">Arrange and customize components</p>
                  <div className="editor-canvas">
                    <p className="text-muted1">Drag components here</p>
                  </div>
                  <div className="properties-panel">
                    <h3>Component Properties</h3>
                    <p className="text-muted1">Select a component to edit its properties</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeTemplateEditor}>
                Cancel
              </button>
              <button className="btn">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateManagement