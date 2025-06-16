import { createContext, useContext, useEffect, useState } from "react";

// Create Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is logged in when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/user", {
      credentials: "include", // Ensures cookies are sent with the request
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Session fetch error:", err));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication context
export const useAuth = () => useContext(AuthContext);
