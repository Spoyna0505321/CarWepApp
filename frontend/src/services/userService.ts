import api from "../api/axios";
import type {  changePasswordRequest, getCarModelName, LanguageRequest, ProfileResponse, setCarModelName, setDisplayName } from "../types/user.types";
export const userService = {
    profile: async(): Promise<ProfileResponse>=> {
        const response = await api.get<ProfileResponse>("/user/profile");
        return response.data;
    },
    uploadAvatar:async(file:File) => {
        const formData = new FormData();
        formData.append("file",file);
        const response= await api.put("/user/upload",formData,{
            headers: {
            "Content-Type": "multipart/form-data",
        },
        });
        return response.data;
    },
    setCarModelName: async(credentials:setCarModelName) => {
        const response = await api.put("/set-car-model",credentials);
        return response.data;
    },
    getCarModelName: async():Promise<getCarModelName>=> {
        const response = await api.get<getCarModelName>("/get-car-model");
        return response.data;
    },
    updateDisplayName:async(credentials:setDisplayName)=>{
        const response = await api.put("/set-displayName",credentials);
        return response.data;
    },
    changePassword:async(credentials:changePasswordRequest)=>{
        const response = await api.put("/user/change-password",credentials);
        return response.data;
    },
    updateLanguage:async(credentials:LanguageRequest)=>{
        const resposne = await api.put("/update-language",credentials);
        return resposne.data;
    }
}