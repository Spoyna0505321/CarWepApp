import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { getErrorMessage } from "../utils/errorHandler";
import { useTranslation } from "react-i18next";
export function ResetPasswordForm(){
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const [error,setError]=useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
          console.log(formData);
          await authService.resetPassword(formData);
          navigate("/auth/login");
    }catch(err:any){
      setError(getErrorMessage(err));
 
    }finally{
      setLoading(false);
    }
    

  };

    return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-transparent text-sm"
        />
        <label className="absolute left-0 top-3 text-gray-400 text-sm tracking-wide pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-white uppercase font-medium">
          {t("auth.resetPassword.email")}
        </label>
      </div>
      <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded-full disabled:opacity-70 disabled:cursor-not-allowed"
      >
          {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>

                        <span>
                            {t("auth.resetPassword.sending")}
                        </span>
                    </div>
                ) : (
                    t("auth.resetPassword.sendButton")
                )}
      </button>
            {error && (
                <p className="text-red-500 text-sm mt-3">
                    {error}
                </p>
            )}
    </form>
    );
}