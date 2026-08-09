import { Outlet,Navigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
export default function AuthLayout() {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  if(token){
     return <Navigate to="/home" replace />;
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 antialiased font-sans overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://unsplash.com" 
          alt="Tesla Background" 
          className="w-full h-full object-cover opacity-40 scale-105 filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>
      <div className="relative z-10 w-full max-w-[420px] bg-white/[0.06] backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] flex flex-col justify-between min-h-[520px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-[0.4em] text-white uppercase font-mono">
            NEXUS
          </h1>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mt-2">
            {t("auth.layout.subtitle")}
          </p>
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
