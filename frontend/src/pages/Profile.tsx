import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { getErrorMessage } from "../utils/errorHandler";
import  type {ProfileResponse} from "../types/user.types";
import defaultAvatar from "../assets/default-avatar.png";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Profile() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: "tr" | "en") => {
    i18n.changeLanguage(language);
  };
  const languageText: Record<string, string> = {
    EN: "English",
    TR: "Türkçe",
  };
  const [error,setError]= useState("");
  // const [file, setFile] = useState<File | null>(null);
  const [profile,setProfile]= useState<ProfileResponse | null>(null);
  const [editType, setEditType] = useState<
  "displayName" | "password" | "language" | null
  >(null);
  const [language, setLanguage] = useState<"EN" | "TR">("EN");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    // const isDisabled =
    // !oldPassword ||
    // !newPassword ||
    // !confirmPassword ||
    // newPassword !== confirmPassword ||
    // oldPassword === newPassword;
    // const isSaveDisabled =
    // editType === "password"
    //     ? isDisabled
    //     : false;
  const [value, setValue] = useState("");
  const avatarUrl = profile?.avatarPath
          ? `http://localhost:8080/profile-photos/${profile.avatarPath}`
          : defaultAvatar;
  const navigate = useNavigate();
  async function handleChangePassword() {
    
    if (!oldPassword.trim()) {
        throw new Error("Current password is required.");
    }

    if (!newPassword.trim()) {
        throw new Error("New password is required.");
    }

    if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters.");
    }

    if (oldPassword === newPassword) {
        throw new Error("New password must be different.");
    }

    if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match.");
    }
    await userService.changePassword({
        oldPassword,
        newPassword
    });
}
  async function handleLogout() {
          try{
              const refreshToken = localStorage.getItem("refreshToken");
              if(!refreshToken){
                  navigate("/auth/login");
                  return;
              }
              await authService.logout({refreshToken});
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              navigate("/auth/login");
          }catch(error:any){
          setError(getErrorMessage(error));
          }
      
      }
  useEffect(()=>{
        async function fetchProfile() {
        try{
          const profile = await userService.profile();
           console.log("profile.language:", profile.language);
          setProfile(profile);
        }catch(err:any){
          setError(getErrorMessage(err));
        }
    }
    fetchProfile();
  },[]);
async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const selectedFile = e.target.files[0];
    // setFile(selectedFile);
    try {
        await userService.uploadAvatar(selectedFile);
        const updatedProfile = await userService.profile();
        setProfile(updatedProfile);
    } catch (err: any) {
        setError(getErrorMessage(err));
    }
}
  async function handleSave() {
    setError("");

    try {
        switch (editType) {

            case "displayName":
                await userService.updateDisplayName({
                    displayName: value,
                });
                break;

            case "language":
                await userService.updateLanguage({
                    language,
                });

                const newLanguage = language === "TR" ? "tr" : "en";

                await changeLanguage(newLanguage);

                localStorage.setItem("language", newLanguage);
                break;

            case "password":
                try{
                  await handleChangePassword();
                }catch(err:any){
                  setError(getErrorMessage(err));
                }

                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                break;
        }

        // Güncel profili tekrar çek
        const updatedProfile = await userService.profile();
        setProfile(updatedProfile);

        // BAŞARILI OLDUKTAN SONRA popup'ı kapat
        setEditType(null);

    } catch (err: any) {

        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError(getErrorMessage(err));
        }
    }
}
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 font-sans">
  <div className="max-w-md mx-auto">
    <div className="flex items-center justify-between mb-10">
      <button className="text-gray-400 hover:text-white transition text-sm tracking-widest uppercase">
        ← Geri
      </button>

      <h1 className="text-xl font-bold tracking-[0.35em] uppercase font-mono">
        {t("profile.title")}
      </h1>

      <div className="w-10" />
    </div>
    <div className="flex flex-col items-center">

      <label className="relative group cursor-pointer">

        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border border-white/10"
        />

        <div
          className="
          absolute
          inset-0
          rounded-full
          bg-black/70
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          flex
          flex-col
          items-center
          justify-center
        "
        >
          <span className="text-3xl">📷</span>

          <span className="text-[10px] tracking-widest uppercase mt-2">
            Change
          </span>
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

      </label>

      <h2 className="mt-6 text-xl font-semibold tracking-widest uppercase">
        {profile?.displayName}
      </h2>

      <p className="text-gray-400 text-sm mt-2">
        {profile?.email}
      </p>
     
    </div>

    {/* Settings */}
    <div className="mt-10 bg-white/[0.03] border border-white/[0.08] rounded-2xl divide-y divide-white/[0.05]">

      {/* Display Name */}
      <button onClick={() => {
        setValue(profile?.displayName ?? "");
        setEditType("displayName");
      }} className="group w-full flex items-center justify-between p-5 hover:bg-white/[0.03] transition">

        <div className="flex items-center gap-3">

          <span>👤</span>

          <div className="text-left">
            <p className="text-xs tracking-widest uppercase text-gray-400">
              {t("profile.displayName")}
            </p>

            <p className="text-sm mt-1">
              {profile?.displayName}
            </p>
          </div>

        </div>

        <span className="text-gray-500 group-hover:text-red-400 transition">
          ›
        </span>

      </button>

      {/* Email */}
     

        <div className="flex items-center justify-between p-5">

    <div className="flex items-center gap-3">

        <span>✉️</span>

        <div>
            <p className="text-xs tracking-widest uppercase text-gray-400">
                {t("profile.email")}
            </p>

            <p className="text-sm mt-1">
                {profile?.email}
            </p>
        </div>

    </div>

</div>


      {/* Car */}
      <button className="group w-full flex items-center justify-between p-5 hover:bg-white/[0.03] transition">

        <div className="flex items-center gap-3">

          <span>🚗</span>

          <div className="text-left">
            <p className="text-xs tracking-widest uppercase text-gray-400">
              {t("profile.carModel")}
            </p>

            <p className="text-sm mt-1">
              {profile?.carModelName}
            </p>
          </div>

        </div>

        <span className="text-gray-500 group-hover:text-red-400 transition">
          ›
        </span>

      </button>
<button
     onClick={() => {
        if (profile) {
            setLanguage(profile.language);
        }
        setEditType("language");
    }}
    className="group w-full flex items-center justify-between p-5 hover:bg-white/[0.03] transition"
>
    <div className="flex items-center gap-3">

        <span>🌍</span>

        <div className="text-left">

            <p className="text-xs tracking-widest uppercase text-gray-400">
                {t("profile.language")}
            </p>

            <p className="text-sm mt-1">
                {profile
                    ? languageText[profile.language]
                    : "Loading..."}
            </p>

        </div>

     </div>

        <span className="text-gray-500 group-hover:text-red-400 transition">
            ›
        </span>
    </button>

      {/* Password */}
      <button  onClick={() => setEditType("password")} className="group w-full flex items-center justify-between p-5 hover:bg-white/[0.03] transition">

        <div className="flex items-center gap-3">

          <span>🔒</span>

          <div className="text-left">
            <p className="text-xs tracking-widest uppercase text-gray-400">
              Password
            </p>

            <p className="text-sm mt-1">
              Change Password
            </p>
          </div>

        </div>

        <span className="text-gray-500 group-hover:text-red-400 transition">
          ›
        </span>

      </button>

    </div>

    {/* Logout */}
    <button
      className="
      mt-8
      w-full
      py-3.5
      rounded-full
      border
      border-white/10
      bg-white/5
      text-gray-300
      uppercase
      tracking-[0.2em]
      transition-all
      duration-300

      hover:border-red-500/40
      hover:bg-red-500/10
      hover:text-red-400
    "
    onClick={handleLogout}
    >
      {t("profile.logout")}
    </button>
    {editType && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8">

      <h2 className="text-xl font-bold tracking-widest uppercase mb-6">

        {editType === "displayName" && "Display Name"}

        {editType === "language" && "Language"}

        {editType === "password" && "Change Password"}

      </h2>
      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {editType !== "language" && editType !== "password" && (

        <input
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          className="w-full bg-transparent border-b border-white/20 py-3 outline-none"
        />

      )}

      {editType === "language" && (

    <div className="space-y-3">

        <button
            onClick={() => setLanguage("EN")}
            className={`w-full border rounded-xl py-3 ${
                language === "EN"
                    ? "bg-white text-black border-white"
                    : "border-white/10 hover:bg-white/10"
            }`}
        >
            English
        </button>

        <button
            onClick={() => setLanguage("TR")}
            className={`w-full border rounded-xl py-3 ${
                language === "TR"
                    ? "bg-white text-black border-white"
                    : "border-white/10 hover:bg-white/10"
            }`}
        >
            Türkçe
        </button>

    </div>

)}

      {editType==="password" && (

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none"
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-red-400 text-sm mt-2">
              Passwords do not match.
            </p>
          )}

        </div>

      )}

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={()=>setEditType(null)}
          className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/10"
        >
          Cancel
        </button>

        <button
         
          onClick={handleSave}
          className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200"
        >
          {t("profile.save")}
        </button>

      </div>

    </div>

  </div>
)}
  </div>
</div>
  );
}