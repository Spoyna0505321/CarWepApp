export interface ProfileRequest {
    email:string
}
export interface ProfileResponse {
    email:string,
    displayName:string,
    carModelName: string,
    avatarPath:string,
    language: "EN" | "TR"
}
export interface setCarModelName {
    carModelName: string
}
export interface getCarModelName {
    carModelName:string
}
export interface setDisplayName{
    displayName:string
}
export interface changePasswordRequest{
    oldPassword:string,
    newPassword:string
}
export interface LanguageRequest{
    language: "EN" | "TR";
}