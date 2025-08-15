import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

function App() {
      return (
            <div className="App">
                <Routes>
                      {/* Redirect root to /login */}
                      <Route path="/" element={<Navigate to="/login" />} />

                      {/* Auth routes */}
                      <Route path="/login" element={<Auth />} />
                      <Route path="/register" element={<Auth />} />
                      <Route path="/forgot_password" element={<ForgotPassword />} />
                      <Route path="/reset_password" element={<ResetPassword />} />

                      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </div>
      );
}

export default App;
