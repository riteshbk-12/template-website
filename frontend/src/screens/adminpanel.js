

import { useState } from "react"
import AdminSidebar from "../components/admincomponents/sidebar.js"
import Dashboard from "../components/admincomponents/dashboard.js"
import TemplateManagement from "../components/admincomponents/template.js"
import ContributionRequests from "../components/admincomponents/contribution.js"
import UserManagement from "../components/admincomponents/usermanager.js"
// import Settings from "./Settings"
import "../static/adminpanel.css"

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="admin-panel">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="admin-content">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "templates" && <TemplateManagement />}
        {activeTab === "contributions" && <ContributionRequests />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  )
}

export default AdminPanel

