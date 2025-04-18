import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import ChevronDown from "../assets/icons/ChevronDown";

function Legend(props) {
    const { open } = props
    const items = [
        { label: "Mindestbeitrag", color: "bg-zinc-700" },
        { label: "Ticket", color: "bg-amber-500" },
        { label: "Sicherheit", color: "bg-indigo-500" },
        { label: "Komfort", color: "bg-sky-500" },
        { label: "Alternativen", color: "bg-pink-500" },
      ];

    return (
        <div className="w-full flex items-center justify-center text-sm flex-wrap hyphens-auto" lang="de">
            {items.map((item, index) => {
            return (
                <div key={index} className="flex items-center px-2">
                    <div className={`w-3 h-3 rounded-xs ${item.color}`}></div>
                    <p className="pl-1">{item.label}</p>
                </div>
            );
            })} 
        </div>
    )
}

export default Legend