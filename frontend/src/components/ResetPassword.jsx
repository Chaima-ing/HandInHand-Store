import {useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import {resetPassword} from "../api/authService.js";
import {t} from "i18next";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        if(password !== confirmPassword){
            setError("Passwords must match");
            return;
        }

        try{
            await resetPassword(token, password);
            alert("Password reset successfully");
            navigate("/login");
        }catch (error){
            setError("Failed to reset password")+ (error.message ? `: ${error.message}` : "");
        }
    };

    return (
      <form onSubmit={handleSubmit} className="max-w-md ms-auto p-4">
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          {error && <p className="text-red-500">{error}</p>}
          <input
           type="password"
           placeholder="New Password"
           className="block w-full border p-2 mb-2"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
          />
          <input
              type="password"
              placeholder={t("reassure_password_placeholder")}
              className="block w-full border p-2 mb-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit"
          className="bg-green-700 text-white p-2 w-full">
              {t("reset_button")}

          </button>
      </form>
    );
};
export default ResetPassword;