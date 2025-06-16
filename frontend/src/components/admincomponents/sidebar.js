import { useState } from "react"
import { 
  MdDashboard, 
  MdCode, 
  MdPeople, 
  MdSettings, 
  MdMenu, 
  MdClose, 
  MdLogout, 
  MdFileUpload 
} from "react-icons/md"
import "./sidebar.css"

function AdminSidebar({ activeTab, setActiveTab }) {
  const [collapsed, setCollapsed] = useState(false)
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: MdDashboard },
    { id: "templates", label: "Templates", icon: MdCode },
    { id: "contributions", label: "Contributions", icon: MdFileUpload, badge: 5 },
    { id: "users", label: "Users", icon: MdPeople },
    { id: "settings", label: "Settings", icon: MdSettings },
  ]
  
  return (
    <div className={`admin-sidebar admin-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <div className="sidebar-title">Template Admin</div>}
        <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MdMenu /> : <MdClose />}
        </button>
      </div>
      
      <div className="sidebar-nav">
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className={collapsed ? "icon-only" : "icon"} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && <span className="badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="sidebar-footer">
        {collapsed ? (
          <div className="avatar">
            <img src="/placeholder-user.jpg" alt="User avatar" />
            <span>AD</span>
          </div>
        ) : (
          <div className="user-info">
            <div className="avatar">
              <img src="/placeholder-user.jpg" alt="User avatar" />
              <span>AD</span>
            </div>
            <div className="user-details">
              <p className="user-name">Admin User</p>
              <p className="user-email">admin@gmail.com</p>
            </div>
            <button className="logout-button">
              <MdLogout size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSidebar