export interface LoginRequest{
    email : string,
    password:string
}
export interface LoginResponse{
    token : string,
    refreshToken: string,
    language: "EN" | "TR"
}
export interface RegisterRequest{
    displayName:string,
    email:string,
    password:string
}
export interface RegisterResponse{
    message:string
}
export interface LogoutRequest{
    refreshToken:string
}
export interface ResetPasswordRequest{
    email:string
}