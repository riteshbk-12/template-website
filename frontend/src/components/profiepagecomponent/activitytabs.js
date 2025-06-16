
import { useState, useEffect } from "react"
import TemplateCard from "../profiepagecomponent/cards"
// import "../styles/ActivityTabs.css"
import "../../static/profilecss/activitytabs.css"

const ActivityTabs = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("contributed")
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data - in a real app, this would come from an API
  const mockData = {
    contributed: [
      {
        id: 1,
        title: "Dashboard Template",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 1245,
        likes: 89,
        category: "Admin",
      },
      {
        id: 2,
        title: "E-commerce Template",
        image:
          "https://images.unsplash.com/photo-1556742077-0a6b6a4a4ac4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 987,
        likes: 76,
        category: "E-commerce",
      },
      {
        id: 3,
        title: "Portfolio Template",
        image:
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 654,
        likes: 42,
        category: "Portfolio",
      },
    ],
    downloaded: [
      {
        id: 4,
        title: "Blog Template",
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 2341,
        likes: 156,
        category: "Blog",
      },
      {
        id: 5,
        title: "Landing Page",
        image:
          "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 1876,
        likes: 134,
        category: "Marketing",
      },
    ],
    favorites: [
      {
        id: 6,
        title: "Social Media Dashboard",
        image:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 3421,
        likes: 267,
        category: "Dashboard",
      },
      {
        id: 7,
        title: "Resume Template",
        image:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 1543,
        likes: 98,
        category: "Resume",
      },
    ],
    reviews: [
      {
        id: 8,
        title: "Admin Panel",
        image:
          "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 4532,
        likes: 321,
        category: "Admin",
        rating: 4.5,
      },
      {
        id: 9,
        title: "Mobile App UI Kit",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        downloads: 2765,
        likes: 187,
        category: "UI Kit",
        rating: 5,
      },
    ],
    saved: [
      {
        id: 10,
        title: "Newsletter Template (Draft)",
        image:
          "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        lastEdited: "2 days ago",
        category: "Email",
      },
      {
        id: 11,
        title: "Product Page (Draft)",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        lastEdited: "5 days ago",
        category: "E-commerce",
      },
    ],
  }

  // Simulate API call
  useEffect(() => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setTemplates(mockData[activeTab] || [])
      setLoading(false)
    }, 500)
  }, [activeTab])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="activity-tabs">
      <div className="tabs-header">
        <button
          className={`tab1 ${activeTab === "contributed" ? "active1" : ""}`}
          onClick={() => handleTabChange("contributed")}
        >
          Contributed Templates
        </button>
        <button
          className={`tab1 ${activeTab === "downloaded" ? "active1" : ""}`}
          onClick={() => handleTabChange("downloaded")}
        >
          Downloaded Templates
        </button>
        <button
          className={`tab1 ${activeTab === "favorites" ? "active1" : ""}`}
          onClick={() => handleTabChange("favorites")}
        >
          Favorites
        </button>
        <button className={`tab1 ${activeTab === "reviews" ? "active1" : ""}`} onClick={() => handleTabChange("reviews")}>
          Reviews & Ratings
        </button>
        <button className={`tab1 ${activeTab === "saved" ? "active1" : ""}`} onClick={() => handleTabChange("saved")}>
          Saved Templates
        </button>
      </div>

      <div className="templates-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading templates...</p>
          </div>
        ) : (
          <div className="templates-grid">
            {templates.length > 0 ? (
              templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  showRating={activeTab === "reviews"}
                  isDraft={activeTab === "saved"}
                />
              ))
            ) : (
              <div className="no-templates">
                <p>No templates found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityTabs

