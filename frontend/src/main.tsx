import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import "./index.css";
import "./i18n/i18n";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);