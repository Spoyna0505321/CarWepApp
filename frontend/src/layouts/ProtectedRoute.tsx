import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }
    return <>  <Navbar /><Outlet /></> ;
}