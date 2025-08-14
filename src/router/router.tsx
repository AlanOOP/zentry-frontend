import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const LoginView = lazy(() => import("@/views/LoginView"));
const RegisterView = lazy(() => import("@/views/RegisterView"));
const LinkTreeView = lazy(() => import("@/views/LinkTreeView"));
const ProfileView = lazy(() => import("@/views/ProfileView"));

const AuthLayout = lazy(() => import("../layout/AuthLayout"));
const AppLayout = lazy(() => import("../layout/AppLayout"));

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<LoginView />} />
                    <Route path="register" element={<RegisterView />} />
                </Route>

                <Route path="/admin" element={<AppLayout />}>
                    <Route index={true} element={<LinkTreeView />} />
                    <Route path="profile" element={<ProfileView />} />
                </Route>

                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>

        </BrowserRouter>
    )

}