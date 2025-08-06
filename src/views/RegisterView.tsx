import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import type { RegisterFormData } from "../types/register";
import { isAxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import toast from "react-hot-toast";
import api from "../config/axios";


const RegisterView = () => {

  const initialValues: RegisterFormData = {
    name: "",
    handle: "",
    email: "",
    password: "",
    repetir_password: ""
  };


  const { handleSubmit, register, formState: { errors }, watch, clearErrors, reset } = useForm<RegisterFormData>({ defaultValues: initialValues });

  const password = watch("password");

  const onSubmit = async (formData: RegisterFormData) => {
    console.log("Formulario enviado");
    console.log("Datos del formulario:", formData);


    try {
      const response = await api.post(`/auth/register`, formData);
      console.log("Respuesta del servidor:", response.data);

      //resetear el formulario
      reset();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("Error al enviar el formulario:", error.response?.data.error || "Hubo un error al enviar el formulario");
        toast.error(error.response?.data.error.toString() || "Hubo un error al enviar el formulario");
      } else {
        console.error("Error desconocido:", error);
        toast.error("Hubo un error desconocido al enviar el formulario");
      }

    }


  };

  useEffect(() => {
    if (errors.name || errors.handle || errors.email || errors.password || errors.repetir_password) {
      const timeout = setTimeout(() => {
        clearErrors();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [errors, clearErrors]);

  return (

    <>
      <div className="mt-4 flex justify-center">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Registrate
            </label>
            <form method="#" action="#" className="mt-10" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <input type="text" placeholder="Nombre" className="mt-1 block w-full border-2 border-gray-400 bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-blue-100 focus:bg-blue-100 focus:ring-1 focus:border-none focus:border-indigo-300"  {...register("name", {
                  required: "El nombre es requerido"
                })} />
                {errors.name && <ErrorMessage>
                  <p>{errors.name.message?.toString()}</p>
                </ErrorMessage>}
              </div>

              <div className="mt-2">
                <input type="text" placeholder="Tu Handle" className="mt-1 block w-full border-2 border-gray-400 bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 " {...register('handle', {
                  required: "El handle es requerido"
                })} />
                {errors.handle && <ErrorMessage>
                  <p>{errors.handle.message?.toString()}</p>
                </ErrorMessage>}
              </div>
              <div className="mt-2">
                <input type="email" placeholder="Correo electronico" className="mt-1 block w-full border-2 border-gray-400 bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-blue-100 focus:bg-blue-100 focus:ring-1 focus:border-none focus:border-indigo-300" {...register("email", {
                  required: "El correo electronico es requerido",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Formato de correo inválido"
                  }
                })} />
                {errors.email && <ErrorMessage>
                  <p>{errors.email.message?.toString()}</p>
                </ErrorMessage>}
              </div>

              <div className="mt-2">
                <input type="password" placeholder="Contraseña" className="mt-1 block w-full border-2 border-gray-400 bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 " {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  }
                })} />
                {errors.password && <ErrorMessage>
                  <p>{errors.password.message?.toString()}</p>
                </ErrorMessage>}
              </div>
              <div className="mt-2">
                <input type="password" placeholder="Repetir Contraseña" className="mt-1 block w-full border-2 border-gray-400 bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 " {...register("repetir_password", {
                  required: "La repetición de la contraseña es requerida",
                  validate: (value) => value === password || "Las contraseñas no coinciden"
                })} />
                {errors.repetir_password && <ErrorMessage>
                  <p>{errors.repetir_password.message?.toString()}</p>
                </ErrorMessage>}
              </div>

              <div className="mt-2 flex">
                <div className="w-full text-center">
                  <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
              </div>

              <div className="mt-2">
                <button className="bg-cyan-400 w-full py-3 rounded-lg text-white shadow-sm hover:shadow-xl focus:outline-none transition duration-500 ease-in-out  transform cursor-pointer">
                  Registrar
                </button>
              </div>


              <div className="mt-2">
                <div className="flex justify-center items-center">
                  <label className="mr-2" >¿Ya tienes cuenta?</label>
                  <Link to={'/auth/login'} className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Inicia Sesión
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

export default RegisterView