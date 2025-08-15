import {useForm} from "react-hook-form";
import { useUserStore } from "@/store/useUserStore"
import type { ProfileRequest } from "@/types/auth";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  updateProfile, updateAvatar } from "@/services/AuthService";
import toast from "react-hot-toast";


export default function ProfileView() {

  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const queryClient = useQueryClient()

  const initialValues  : ProfileRequest= {
    handle: user?.handle ?? '',
    description: user?.description ?? ''
  }
  const { register, handleSubmit , formState: { errors } , clearErrors} = useForm<ProfileRequest>( { values: initialValues});

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message.toString() ?? "Perfil actualizado correctamente");
    },
    onError: (error) => {
      toast.error(error.message.toString() ?? "Error al actualizar el perfil");
    }
  });

  const updateAvatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (data) => {
      toast.success(data.message.toString() ?? "Avatar actualizado correctamente");
      queryClient.invalidateQueries({queryKey: ['user']});
    },
    onError: (error) => {
      toast.error(error.message.toString() ?? "Error al actualizar el avatar");
    }
  });

  const handleSubmitForm = (data: ProfileRequest) => {
    updateProfileMutation.mutate(data);
  }

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateAvatarMutation.mutate(file);
    }
  };

  useEffect(() => {
    if (errors.handle ||  errors.description) {
      const timeout = setTimeout(() => {
        clearErrors();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [errors.handle, errors.description, clearErrors]);

  if(!isLoading && user) return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="handle"
        >Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", { required: "Este campo es obligatorio" })}
        />
        {
          errors.handle && <ErrorMessage>
            <p>{errors.handle.message}</p>
          </ErrorMessage>
        }
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="description"
        >Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", { required: "Este campo es obligatorio" })}
        />
        {
          errors.description && <ErrorMessage>
            <p>{errors.description.message}</p>
          </ErrorMessage>
        }
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="handle"
        >Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangeAvatar}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Guardar Cambios'
      />
    </form>
  )
}