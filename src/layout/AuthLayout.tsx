import { Outlet } from "react-router-dom";
import logoSvg from '../assets/logo.svg';
import { Toaster } from "react-hot-toast";


const AuthLayout = () => {
    return (
        <div className="bg-slate-800 h-screen">
            <div className="max-w-lg pt-10 px-5 mx-auto">
                <img src={logoSvg} alt="logotipo" />
                {/* <div className="py-10">
                        <h1 className="text-white">Login</h1>
                    </div> */}
                <div className="py-10">
                    <Outlet />
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default AuthLayout;