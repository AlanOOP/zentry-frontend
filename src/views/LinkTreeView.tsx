import { useState } from "react"
import { social } from "@/data/social"
import type { DevTreeLink } from "@/types/social"
import DevTreeInput from "@/components/DevTreeInput"

const LinkTreeView = () => {

    const [devTreeLinks, setDevTreeLinks] = useState<DevTreeLink[]>(social);

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => 
        setDevTreeLinks(devTreeLinks.map(link => link.name === e.target.name ? {...link, url:e.target.value } : link))
    
    const handleEnabledChange = (linkTreeName: string) => {
        const updateLinks = devTreeLinks.map(link => link.name === linkTreeName ? {...link, enabled: !link.enabled} : link);
        setDevTreeLinks(updateLinks);
    }

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
            </div>
        </>
    )
}

export default LinkTreeView