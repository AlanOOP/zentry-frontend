import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import AuthLayout from "../layout/AuthLayout";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    {/* Redirect /auth to /auth/login */}
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<LoginView />} />
                    <Route path="register" element={<RegisterView />} />
                </Route>
                {/* Fallback: any unknown route -> login */}
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
        </BrowserRouter>
    )

}