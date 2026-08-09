import { createBrowserRouter } from "react-router";
import {Root} from "./Root";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { IndexPage } from "../pages";
import ProtectedRoute from "../layouts/ProtectedRoute";
import {  ResetPasswordPage } from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import QrScannerPage from "../pages/QrScannerPage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: IndexPage },
      {
        Component:ProtectedRoute,
        children:[
          { path: "home", Component: Home },
          { path: "profile", Component: Profile},
          { path: "qr-scan",Component:QrScannerPage}
        ]
      },
      
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
          { path: "reset-password",Component:ResetPasswordPage}
        ],
      },
    ],
  },
]);
