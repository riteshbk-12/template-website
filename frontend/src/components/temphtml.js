import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    setError("");
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", padding: "16px" }}>
      <div style={{ width: "100%", maxWidth: "400px", backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "600" }}>Login</button>
        </form>
      </div>
    </div>
  );
}
