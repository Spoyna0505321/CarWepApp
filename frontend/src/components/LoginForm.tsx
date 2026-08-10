import  { useState, type SyntheticEvent } from "react";
import {authService} from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export function LoginForm(){
    const changeLanguage = async (language: "tr" | "en") => {
        await i18n.changeLanguage(language);
    };
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]= useState("");
    const [error,setError]=useState("");
    async function handleSubmit(e:SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        try{
            const data = await authService.login({email,password});
            const language = data.language === "TR"
            ? "tr"
            : "en";
            await changeLanguage(language);
            localStorage.setItem("language", language);
            localStorage.setItem("token",data.token);
            localStorage.setItem("refreshToken",data.refreshToken);
            console.log(data);
            navigate("/home");
        }catch(err:any){
            setError(getErrorMessage(err));
        }
      
    };
    return (
        <form onSubmit={(handleSubmit)} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-transparent text-sm"
              />
              <label className="absolute left-0 top-3 text-gray-400 text-sm tracking-wide pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-white uppercase font-medium">
                   {t("auth.login.email")}
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-transparent text-sm"
              />
              <label className="absolute left-0 top-3 text-gray-400 text-sm tracking-wide pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-white uppercase font-medium">
                {t("auth.login.password")}
              </label>
            </div>
            <div className="flex justify-end">
              <Link to="/auth/reset-password" className="text-xs tracking-wider text-gray-400 hover:text-white transition-colors duration-200 uppercase">
                {t("auth.login.forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-full hover:bg-gray-200 active:scale-[0.99] transition-all duration-200 shadow-lg"
            >
              {t("auth.login.loginButton")}
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-3">
                    {error}
                </p>
            )}
          </form>
    );
}