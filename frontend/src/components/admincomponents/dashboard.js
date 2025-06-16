import {
    FiArrowDown,
    FiArrowUp, 
    FiDownload, 
    FiFileText, 
    FiUsers, 
    FiUpload, 
    FiBell
  } from "react-icons/fi";
  import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
  } from "recharts"
  import "./dashboard.css"
  
  const areaData = [
    { name: "Jan", downloads: 400, views: 240 },
    { name: "Feb", downloads: 300, views: 139 },
    { name: "Mar", downloads: 200, views: 980 },
    { name: "Apr", downloads: 278, views: 390 },
    { name: "May", downloads: 189, views: 480 },
    { name: "Jun", downloads: 239, views: 380 },
    { name: "Jul", downloads: 349, views: 430 },
  ]
  
  const barData = [
    { name: "Landing", templates: 32 },
    { name: "Dashboard", templates: 27 },
    { name: "E-commerce", templates: 22 },
    { name: "Blog", templates: 18 },
    { name: "Portfolio", templates: 15 },
  ]
  
  const pieData = [
    { name: "React", value: 400 },
    { name: "Vue", value: 300 },
    { name: "Angular", value: 200 },
    { name: "Svelte", value: 100 },
  ]
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
  
  const activities = [
    {
      user: "Sarah Johnson",
      action: "submitted a new template",
      template: "Modern Dashboard UI",
      time: "2 minutes ago",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
    {
      user: "Michael Chen",
      action: "downloaded",
      template: "E-commerce Starter Kit",
      time: "15 minutes ago",
      avatar: "/placeholder-user.jpg",
      initials: "MC",
    },
    {
      user: "Emma Wilson",
      action: "left a review on",
      template: "Portfolio Template Pro",
      time: "1 hour ago",
      avatar: "/placeholder-user.jpg",
      initials: "EW",
    },
    {
      user: "James Rodriguez",
      action: "purchased",
      template: "Blog Creator Suite",
      time: "3 hours ago",
      avatar: "/placeholder-user.jpg",
      initials: "JR",
    },
    {
      user: "Olivia Taylor",
      action: "requested approval for",
      template: "Admin Dashboard Dark Mode",
      time: "5 hours ago",
      avatar: "/placeholder-user.jpg",
      initials: "OT",
    },
  ]
  
  function Dashboard() {
    return (
      <div className="dashboard dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="text-muted1">Overview of your template website statistics and activity.</p>
          </div>
          <div className="dashboard-actions">
            <button className="btn-icon">
              <FiBell size={16} />
              <span className="badge">3</span>
            </button>
            <button className="btn">Generate Report</button>
          </div>
        </div>
  
        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-card-header">
              <h3>Total Templates</h3>
              <FiFileText size={16} className="text-muted1" />
            </div>
            <div className="stat-card-content">
              <div className="stat-value">0</div>
              <p className="stat-change positive">
                <FiArrowUp size={12} /> 0% from last month
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <h3>Total Downloads</h3>
              <FiDownload size={16} className="text-muted1" />
            </div>
            <div className="stat-card-content">
              <div className="stat-value">0</div>
              <p className="stat-change positive">
                <FiArrowUp size={12} /> 0% from last month
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <h3>Registered Users</h3>
              <FiUsers size={16} className="text-muted1" />
            </div>
            <div className="stat-card-content">
              <div className="stat-value">0</div>
              <p className="stat-change positive">
                <FiArrowUp size={12} /> 0% from last month
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <h3>Pending Contributions</h3>
              <FiUpload size={16} className="text-muted1" />
            </div>
            <div className="stat-card-content">
              <div className="stat-value">0</div>
              <p className="stat-change negative">
                <FiArrowDown size={12} /> 0% from last month
              </p>
            </div>
          </div>
        </div>
  
        <div className="tabs">
          <div className="tab-list">
            <button className="tab active">Overview</button>
            <button className="tab">Analytics</button>
            <button className="tab">Reports</button>
          </div>
          <div className="tab-content">
            <div className="charts-grid">
              <div className="chart-card large">
                <div className="chart-header">
                  <h3>Downloads Overview</h3>
                  <p className="text-muted1">Template downloads and views for the past 7 months</p>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={areaData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          borderColor: "#333",
                          color: "#fff",
                        }}
                      />
                      <Area type="monotone" dataKey="downloads" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="views" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="chart-card medium">
                <div className="chart-header">
                  <h3>Popular Categories</h3>
                  <p className="text-muted1">Templates by category</p>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={barData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="name" type="category" stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          borderColor: "#333",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="templates" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="charts-grid">
              <div className="chart-card medium">
                <div className="chart-header">
                  <h3>Framework Distribution</h3>
                  <p className="text-muted1">Templates by framework</p>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          borderColor: "#333",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="chart-card large">
                <div className="chart-header">
                  <h3>Recent Activity</h3>
                  <p className="text-muted1">Latest actions on your platform</p>
                </div>
                <div className="chart-content">
                  <div className="activity-list">
                    {activities.map((activity, i) => (
                      <div key={i} className="activity-item">
                        <div className="avatar">
                          <img src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                          <span>{activity.initials}</span>
                        </div>
                        <div className="activity-details">
                          <p>
                            <span className="user-name">{activity.user}</span> {activity.action}{" "}
                            <span className="template-name">{activity.template}</span>
                          </p>
                          <p className="activity-time">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Dashboard