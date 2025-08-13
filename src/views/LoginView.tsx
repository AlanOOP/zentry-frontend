import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authLogin } from "@/services/AuthService";
import type { LoginFormData } from "@/types/auth";
import ErrorMessage from "@/components/ErrorMessage";

const LoginView = () => {

    const initialValues: LoginFormData = {
        email: "",
        password: ""
    }

    const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>({ defaultValues: initialValues });

    const onSubmit = async (formData: LoginFormData) => {

        try {
            const response = await authLogin(formData);
            console.log("Login exitoso:", response);
        } catch (error) {
            console.error("Error en el login:", error);
        }
    }

    return (
        <>
            <div className=" flex justify-center">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Login
                        </label>
                        <form method="#" action="#" className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input {...register("email", { required: "Este campo es obligatorio" })} type="email" name="email" placeholder="Correo electronico" className="mt-1 block w-full border-2 border-gray-400 bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-blue-100 focus:bg-blue-100 focus:ring-1 focus:border-none focus:border-indigo-300" />
                                {
                                    errors.email && <ErrorMessage>
                                        <p>{errors.email?.message}</p>
                                    </ErrorMessage>
                                }
                            </div>

                            <div className="mt-7">
                                <input {...register("password", { required: "Este campo es obligatorio" })} type="password" name="password" placeholder="Contraseña" className="mt-1 block w-full border-2 border-gray-400 bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 " />
                                {
                                    errors.password && <ErrorMessage>
                                        <p>{errors.password?.message}</p>
                                    </ErrorMessage>
                                }
                            </div>

                            <div className="mt-7 flex">
                                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Recuerdame
                                    </span>
                                </label>

                                <div className="w-full text-right">
                                    <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                        ¿Olvidó su contraseña?
                                    </a>
                                </div>
                            </div>

                            <div className="mt-7">
                                <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Login
                                </button>
                            </div>

                            <div className="flex mt-7 items-center text-center">
                                <hr className="border-gray-300 border-1 w-full rounded-md" />
                                <label className="block font-medium text-sm text-gray-600 w-full">
                                    Accede con
                                </label>
                                <hr className="border-gray-300 border-1 w-full rounded-md" />
                            </div>


                            <div className="mt-7">
                                <div className="flex justify-center items-center">
                                    <label className="mr-2" >¿Eres nuevo?</label>
                                    <Link to={'/auth/register'} className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        Crea una cuenta
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginView