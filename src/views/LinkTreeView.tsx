import { useEffect, useState } from "react"
import { social } from "@/data/social"
import type { DevTreeLink } from "@/types/social"
import DevTreeInput from "@/components/DevTreeInput"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/services/AuthService"
import toast from "react-hot-toast"
import type { User } from "@/types/auth"

const LinkTreeView = () => {

    const [devTreeLinks, setDevTreeLinks] = useState<DevTreeLink[]>(social);

    const queryClient = useQueryClient();
    const user : User  = queryClient.getQueryData(['user'])!;

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onSuccess:() =>{
            toast.success('Perfil Actualizado correctamente')
        },
        onError:(data) =>{
            console.log(data);
            toast.error('Hubo un Error')
        }
    })

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const prevLinks =  devTreeLinks.map(link => link.name === e.target.name ? {...link, url:e.target.value } : link)
            setDevTreeLinks(prevLinks)
            queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(prevLinks)
            }
        })
    }

    const handleEnabledChange = (linkTreeName: string) => {
        const updateLinks = devTreeLinks.map(link => link.name === linkTreeName ? {...link, enabled: !link.enabled} : link);
        setDevTreeLinks(updateLinks);

        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updateLinks)
            }
        })
    }

    useEffect(() => {
        if (user.links) {
            try {
                const parsedLinks = JSON.parse(user.links) as DevTreeLink[];

                const data = devTreeLinks.map(item =>{
                    const userLink = parsedLinks.find(link => link.name === item.name)
                    if(userLink) {
                        return {
                            ...item, url: userLink.url, enabled: userLink.enabled
                        }
                    }
                    return item
                })
                setDevTreeLinks(data)
            } catch (e) {
                console.error('Error parsing user.links:', e);
            }
        }
    }, []);

    return (
        <>
            <div className="space-y-5 ">
                {devTreeLinks.map(link => (
                    <DevTreeInput 
                        key={link.name} 
                        link={link}
                        handleLinkChange={handleLinkChange}
                        handleEnabledChange={handleEnabledChange}
                    />
                ))} 
                <button 
                    className="bg-cyan-400 text-slate-700 font-semibold rounded hover:bg-cyan-500 p-2 w-full cursor-pointer"
                    onClick={() => mutate(user)}
                >
                    Guardar
                </button>
            </div>
        </>
    )
}

export default LinkTreeView