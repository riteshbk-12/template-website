import {createRoot} from "react-dom/client";
import React from "react";
import App from "./App";
import Homepage from "./screens/homepage";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";

const root=createRoot(document.getElementById("app"));

root.render(<AuthProvider><App /></AuthProvider>);