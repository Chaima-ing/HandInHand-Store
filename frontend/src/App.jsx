import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth.jsx";
// You can add other components here later (e.g., Dashboard, NotFound, etc.)

function App() {
      return (

                <Routes>
                      {/* Redirect root to /login */}
                      <Route path="/" element={<Navigate to="/login" />} />

                      {/* Auth routes */}
                      <Route path="/login" element={<Auth />} />
                      <Route path="/register" element={<Auth />} />
                      <Route path="/forgot_password" element={<Auth />} />

                      {/* Example page after login */}
                      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

                      {/* Catch-all route for undefined URLs */}
                      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>

      );
}

export default App;
