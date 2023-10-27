import { BrowserRouter, Route , Routes } from "react-router-dom";
import React from 'react';
import { Notifications,ApplyDoctor, Home, Login, Logout, ProtectedHome, ProtectedRoute, Register } from "./components";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";



function App() {
  const {loading}= useSelector((state:any)=>state.alerts)
  return (
    <div >
      <BrowserRouter>
      {loading && <div className="spinner-parent">
        <div className="spinner-border text-primary" role="status"/>
      </div>}
        <Toaster position="top-center" reverseOrder={false}/>
        <Routes> 
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/protectedhome" element={<ProtectedRoute ><ProtectedHome/></ProtectedRoute>} />
          <Route path="/applydoctor" element={<ProtectedRoute ><ApplyDoctor/></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute ><Notifications/></ProtectedRoute>} />
          <Route path="/logout" element={<Logout/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
