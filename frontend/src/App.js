
import React from "react";
import Homepage from "./screens/homepage";
import Register from "./screens/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/Login";
import Docs from "./screens/docs";

import Editor from "./screens/editor";
import Add from "./screens/add";
import Themes from "./screens/themes";
import Page_info from "./screens/page_info";
import Adminp from "./screens/adminpanel";
import Icon from "./screens/icon";
import Ai from "./screens/Ai";
import ProfilePage from "./components/profiepagecomponent/profilepage";
import ProfileScreen from "./screens/profilescreen";
import ComponentInfoPage from "./screens/componentinfo";
import ProtectedRoute from "./context/protectroute";
import AdminPanel from "./screens/adminpanel";

function App()
{
    
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
            <Route path="/docs" element={<Docs></Docs>} />
            <Route path="/add" element={<Add />}/>
            <Route path="/editor" element={<Editor/>}/>
            <Route path="/themes" element={<Themes />}/>
            <Route path="/themes/template_info" element={<Page_info />}/>
            <Route path="/admin" element={<AdminPanel></AdminPanel>}/>
            <Route path="/icons" element={<Icon/>}/>
            <Route path="/ai" element={<Ai />}/>
            <Route path="/userprofile" element={<ProfileScreen/>}/>
            <Route path="/component/:componentType/:id" element={<ComponentInfoPage />} />
        </Routes>
        </BrowserRouter>
        
    )
}

export default App;