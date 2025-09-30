import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListEmployeeComponent from "./Component/ListEmployeeComponent";
import HeaderComponent from "./Component/HeaderComponent";
import FooterComponent from "./Component/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEmployeeComponent from "./Component/AddEmployeeComponent";
import Register from "./Component/Register";
import Login from "./Component/Login";
import PrivateRoute from "./Component/PrivateRoute";
import Unauthorizedpage from "./Component/Unauthorizedpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path="/" element={<Register/>}></Route>
          
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>

          {/* http://localhost:3000/employees */}
          <Route path="/employees" element={<PrivateRoute allowedRoles={["ROLE_ADMIN","ROLE_USER"]}><ListEmployeeComponent /></PrivateRoute>}></Route>

          {/* http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><AddEmployeeComponent/></PrivateRoute>}></Route>

          {/* http://localhost:3000/update-employee/2 */}
          <Route path="/update-employee/:id" element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><AddEmployeeComponent/></PrivateRoute>}></Route>

          <Route path="/unauthorized" element={<Unauthorizedpage/>}/>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
