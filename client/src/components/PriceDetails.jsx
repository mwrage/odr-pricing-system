import { useState } from "react"
import { Disclosure, DisclosureButton, DisclosurePanel, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import ChevronDown from "../assets/icons/ChevronDown";
import Bus1 from "../assets/icons/Bus1";
import Ticket1 from "../assets/icons/Ticket1";
import CloudSun from "../assets/icons/CloudSun";
import DonutChart from "./DonutChart";

function PriceDetails(props) {
    const { walk_to, walk_from, prebooking, departure, stop, arrival, price, discount, regular_price } = props
    const [showExplanation, setShowExplanation] = useState(1)
    const title = "Hier kommt der Titel hin."
    const subtitle = "Hier kommt die Untertitel hin."
    const rule = "Wenn du kein gültiges ÖPNV-Ticket besitzt, entspricht dein Grundpreis dem Einzelfahrschein der geltenden Preisstufe."
    const state = "Hier kommt der Zustand hin."

    const segments = [
        { factor:"Min.", label: "1€", value: 1, color: "#3f3f46", opacity: 1 },
        { factor:"Alternativangebot", label: "-1,80€", value: 1.8, color: "#ec4899", opacity: 0.2 },
        { factor:"Ticket", label: "3,20€", value: 3.2, color: "#f59e0b", opacity: 1},
        { factor:"Sicherheit", label: "1,32€", value: 1.32, color: "#6366f1", opacity: 1 },
        { factor:"Komfort", label: "0,88€", value: 0.88, color: "#0ea5e9", opacity: 1 },

      ];


    return (
      <div className="flex flex-col h-full">

        <div className="flex items-center justify-center w-full pt-8 pb-10">
            <DonutChart data={segments} /> 
        </div>
        

        <div className="w-full flex">
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 1 ? "bg-amber-500 border-amber-600 border-b-transparent" : "bg-amber-500/20 border-b-amber-500 border-transparent"}`} onClick={() => setShowExplanation(1)}>
                <Ticket1 size={20} />
            </button>
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 2 ? "bg-pink-500 border-pink-600 border-b-transparent" : "bg-pink-500/20 border-b-pink-500 border-transparent"}`} onClick={() => setShowExplanation(2)}>
                <Bus1 size={20} color={"#FFFFFF"} />
            </button>
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 3 ? "bg-indigo-500 border-indigo-600 border-b-transparent" : "bg-indigo-500/20 border-b-indigo-500 border-transparent"}`} onClick={() => setShowExplanation(3)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" id="Walk--Streamline-Tabler" height={20} width={20} ><desc>{"Walk Streamline Icon: https://streamlinehq.com"}</desc><path d="M7.5 2.5a0.625 0.625 0 1 0 1.25 0 0.625 0.625 0 1 0 -1.25 0" strokeWidth={1} /><path d="m4.375 13.125 1.875 -2.5" strokeWidth={1} /><path d="m10 13.125 -1.25 -2.5 -1.875 -1.875 0.625 -3.75" strokeWidth={1} /><path d="m3.75 7.5 1.25 -1.875 2.5 -0.625 1.875 1.875 1.875 0.625" strokeWidth={1} /></svg>
            </button>
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 4 ? "bg-sky-500 border-sky-600 border-b-transparent" : "bg-sky-500/20 border-b-sky-500 border-transparent"}`} onClick={() => setShowExplanation(4)}>
                <CloudSun size={20} />
            </button>
        </div>
        <div className="mb2">
        
            <div lang="de" className={`hyphens-auto px-2.5 pb-2 rounded-b-md ${showExplanation === 1 ? "text-amber-500" : showExplanation === 2 ? "text-pink-500" : showExplanation === 3 ? "text-indigo-500" : "text-sky-500"}`}>
                <h2 className={`pt-2 inter-500`}>{title}</h2>
                <h3>{subtitle}</h3>
                <p className="text-zinc-800 pt-1">{rule}</p>
                <div className={`w-full h-0.5 rounded-full my-2 border-b-2 border-dashed ${showExplanation === 1 ? "border-amber-500" : showExplanation === 2 ? "border-pink-500" : showExplanation === 3 ? "border-indigo-500" : "border-sky-500"}`}></div>
                <p className="text-zinc-800 inter-500 text-center">{state}</p>
                <p className="text-zinc-800 text-center pt-1">{subtitle} {subtitle}</p>
            </div>

        </div>

      </div>
    );
  };

export default PriceDetails