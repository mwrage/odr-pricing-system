import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import ChevronDown from "../assets/icons/ChevronDown";

function Legend(props) {
    const { open } = props
    const items = [
        { label: "Min", color: "bg-zinc-700" },
        { label: "Ticket", color: "bg-amber-500" },
        { label: "Sicherheit", color: "bg-indigo-500" },
        { label: "Komfort", color: "bg-sky-500" },
        { label: "Alternativangebot", color: "bg-pink-500" },
      ];

    return (
        <Disclosure defaultOpen={open}>
            <DisclosureButton className="inter-500 text-left pt-3 flex justify-between">
                Preisfaktoren
                <ChevronDown size={20} style={"-rotate-90"}/>
            </DisclosureButton>
            <div className="w-full h-0.5 bg-zinc-100 rounded-full my-2"></div>
            <DisclosurePanel className="w-full flex items-center justify-center text-sm flex-wrap pt-1.5 hyphens-auto" lang="de">
                {items.map((item) => {
                return (
                    <div className="flex items-center pr-2">
                        <div className={`w-3 h-3 rounded-xs ${item.color}`}></div>
                        <p className="pl-1">{item.label}</p>
                    </div>
                );
                })} 
            </DisclosurePanel>
        </Disclosure>

        // <div className="w-full flex items-center justify-center text-sm flex-wrap pt-1.5">
                    
        // </div>
    )
}

export default Legend