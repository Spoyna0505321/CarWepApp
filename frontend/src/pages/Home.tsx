import { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { getErrorMessage } from '../utils/errorHandler';
import teslaCar from "../assets/tesla_car.png";
import { useTranslation } from 'react-i18next';
export default function Home() {
 console.log("LoginForm render");
  const [isLocked, setIsLocked] = useState(true);
  const [isLightsOn, setIsLightsOn] = useState(false);
  const [isClimateOn, setIsClimateOn] = useState(false);
  const [isTrunkOpen, setIsTrunkOpen] = useState(false);
  const [carModelName,setCarModelName]= useState("Car Model Name");
  const [error,setError]= useState("");
  const { t } = useTranslation();
  const handleFindLocation = () => {
    alert(t("home.locationMessage"));
  };
  useEffect(()=>{
    async function getCarModelName() {
     try{
        const data = await userService.getCarModelName();
        setCarModelName(data.carModelName);
      }catch(err:any){
        setError(getErrorMessage(err));
      }
      
    }
    getCarModelName();

  },[])
  return (
    <div className="relative min-h-screen bg-black text-white pt-24 pb-12 px-6 flex flex-col justify-between antialiased font-sans select-none">


      <div className="text-center space-y-2 mt-12 md:mt-4 animate-fadeIn">
        <h1 className="text-3xl font-bold tracking-[0.3em] uppercase font-mono">
          {carModelName}
        </h1>
        {error && (<p>{error}</p>)}
        
        <div className="flex items-center justify-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${isLocked ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase font-medium">
            {isLocked
                ? t("home.unlocked")
                : t("home.locked")}
          </p>
        </div>

        <p className="text-sm tracking-widest text-emerald-400 font-mono pt-1">
          %87 • 512 KM {t("home.range")}
        </p>
      </div>

      <div className="relative flex justify-center items-center my-6 group">
        <div className={`absolute w-[80%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] transition-opacity duration-500 ${isLightsOn ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <img 
          src={teslaCar} 
          alt="Tesla Model S" 
          className="w-full max-w-[580px] h-auto object-contain transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      <div className="max-w-md w-full mx-auto space-y-6">
        
        <div className="grid grid-cols-4 gap-4 text-center">
          
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
              isLocked 
                ? 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20' 
                : 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            }`}
          >
            <span className="text-lg mb-1">{isLocked ? '🔒' : '🔓'}</span>
            <span className="text-[9px] tracking-widest uppercase font-bold">{isLocked
                ? t("home.unlock")
                : t("home.lock")}</span>
          </button>

          <button 
            onClick={() => setIsLightsOn(!isLightsOn)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
              isLightsOn 
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <span className="text-lg mb-1">💡</span>
            <span className="text-[9px] tracking-widest uppercase font-bold">{isLightsOn
                ? t("home.turnOff")
                : t("home.lights")}</span>
          </button>

          <button 
            onClick={() => setIsClimateOn(!isClimateOn)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
              isClimateOn 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <span className="text-lg mb-1">❄️</span>
            <span className="text-[9px] tracking-widest uppercase font-bold">
              {isClimateOn
                ? t("home.cancel")
                : t("home.climate")}</span>
          </button>

          <button 
            onClick={handleFindLocation}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <span className="text-lg mb-1">📍</span>
            <span className="text-[9px] tracking-widest uppercase font-bold">{t("home.location")}</span>
          </button>

        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl divide-y divide-white/[0.05]">
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm">🚗</span>
              <span className="text-xs tracking-widest uppercase text-gray-300">{t("home.trunk")}</span>
            </div>
            <button 
              onClick={() => setIsTrunkOpen(!isTrunkOpen)}
              className="text-[10px] tracking-widest uppercase font-bold border border-white/20 px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-all"
            >
               {isTrunkOpen
                ? t("home.close")
                : t("home.openTrunk")}
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm">🌡️</span>
              <span className="text-xs tracking-widest uppercase text-gray-300"> {t("home.cabinTemperature")}</span>
            </div>
            <span className={`text-xs font-mono tracking-widest ${isClimateOn ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}>
               {isClimateOn
                ? `21.5 °C (${t("home.active")})`
                : t("home.off")}
            </span>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm">🔄</span>
              <span className="text-xs tracking-widest uppercase text-gray-300">Yazılım Sürümü</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
              v12.4.2 ({t("home.upToDate")})
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
