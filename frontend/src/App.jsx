import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Login from "./components/Login.jsx";
import Homepage from "./components/Homepage.jsx";



function App() {
      return (
            <div className="App">
                    <Routes>

                          {/* Auth routes */}
                          <Route path="/login" element={<Auth />} />
                          <Route path="/register" element={<Auth />} />
                          <Route path="/forgot_password" element={<ForgotPassword />} />
                          <Route path="/reset_password" element={<ResetPassword />} />
                          <Route path="/login_admin" element={<Login/> }/>

                          <Route path="/" element={<Homepage />} />
                          {/* Redirect unknown paths to home */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
            </div>
      );
}

export default App;
