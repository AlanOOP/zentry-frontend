import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import AuthLayout from "../layout/AuthLayout";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginView />} />
                    <Route path="register" element={<RegisterView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}