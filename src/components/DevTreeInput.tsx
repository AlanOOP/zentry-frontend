import { Switch } from "@headlessui/react";
import type { DevTreeLink } from "@/types/social"
import { classNames } from "@/utils/utils";

type DevTreeInputProps = {
    link: DevTreeLink;
    handleLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DevTreeInput = ({ link, handleLinkChange }: DevTreeInputProps) => {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-900 shadow-2xl flex items-center p-5 gap-3 rounded-4xl">
        <div 
            className="w-12 h-12 bg-cover"
            style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
        >
        </div>
        <input 
            type="text" 
            className="flex-1 border border-gray-100 rounded-lg"
            value={link.url}
            name={link.name}
            onChange={e => handleLinkChange(e)}
        />
        <Switch
                checked={link.enabled}
                onChange={e => e}
                className={classNames(
                    link.enabled ? 'bg-blue-500' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        link.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
    </div>
  )
}

export default DevTreeInput