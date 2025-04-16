import ChevronDown from "../assets/icons/ChevronDown";

function LegendButton()  {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col">
                <div className="flex">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-tl-sm"></div>
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-tr-sm"></div>                    
                </div>
                <div className="flex">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-bl-sm"></div>
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-br-sm"></div>                    
                </div>
            </div>
            <p className="font-normal text-xs px-1">Preisfaktoren anzeigen</p>
            <ChevronDown size={14} style={"pb-0.5"}/>    
        </div>

    );
};

export default LegendButton;