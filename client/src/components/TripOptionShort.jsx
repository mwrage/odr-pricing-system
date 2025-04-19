import ChevronDown from "../assets/icons/ChevronDown";
import Car2 from "../assets/icons/Car2";
import LumLogo from "/lumo-logo.webp"
import RssRight from "../assets/icons/RssRight";
import ArrowDownward from "../assets/icons/ArrowDownward"
import StackedBarChart from "./StackedBarChart";

function TripOptionShort(props) {
    const { selected, walk_to, walk_from, prebooking, departure, stop, arrival, price, discount, regular_price, segments } = props

    return (
        <>              
                {/* Wegbeschreibung */}
                <div className="w-full flex items-center">
                    {walk_to && (
                        <div className="flex items-center justify-center text-zinc-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" fill="none" stroke="#3f3f46" strokeLinecap="round" strokeLinejoin="round" id="Walk--Streamline-Tabler" height={20} width={20} ><desc>{"Walk Streamline Icon: https://streamlinehq.com"}</desc><path d="M7.5 2.5a0.625 0.625 0 1 0 1.25 0 0.625 0.625 0 1 0 -1.25 0" strokeWidth={1} /><path d="m4.375 13.125 1.875 -2.5" strokeWidth={1} /><path d="m10 13.125 -1.25 -2.5 -1.875 -1.875 0.625 -3.75" strokeWidth={1} /><path d="m3.75 7.5 1.25 -1.875 2.5 -0.625 1.875 1.875 1.875 0.625" strokeWidth={1} /></svg>
                            <p className="text-xs font-medium pl-1 pr-1.5">{Math.round(walk_to) <= 15 ? Math.round(walk_to) : ""}</p>
                            <ChevronDown size={14} style={"-rotate-90"}/>                    
                        </div>
                    )}
                    <div className="flex items-center justify-center pl-1.5">
                        <Car2 size={18} />
                        <img src={LumLogo} className="ml-1 w-5 h-5"></img>
                        <p className="font-bold pr-2">mo</p>
                    </div>
                    {walk_from && (
                        <div className="flex items-center justify-center text-zinc-700">
                            <ChevronDown size={14} style={"-rotate-90 mr-1.5"}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" fill="none" stroke="#3f3f46" strokeLinecap="round" strokeLinejoin="round" id="Walk--Streamline-Tabler" height={20} width={20} ><desc>{"Walk Streamline Icon: https://streamlinehq.com"}</desc><path d="M7.5 2.5a0.625 0.625 0 1 0 1.25 0 0.625 0.625 0 1 0 -1.25 0" strokeWidth={1} /><path d="m4.375 13.125 1.875 -2.5" strokeWidth={1} /><path d="m10 13.125 -1.25 -2.5 -1.875 -1.875 0.625 -3.75" strokeWidth={1} /><path d="m3.75 7.5 1.25 -1.875 2.5 -0.625 1.875 1.875 1.875 0.625" strokeWidth={1} /></svg>
                            <p className="text-xs font-medium pl-1 pr-1.5">{Math.round(walk_from) <= 15 ? Math.round(walk_from) : ""}</p>
                        </div>
                    )}
                </div>
                
                {/* Departure details */}
                {prebooking ? (
                    <p className="py-3 pl-3">Einstieg {departure.toFixed()} von {stop}</p>
                ) : (
                    <div className="flex items-center py-3">
                        <RssRight size={20} />
                        <p><span className="text-teal-700">In {departure.toFixed()} Minuten</span> von {stop}</p> 
                    </div>
                    
                )}

                <div className="w-full mx-auto h-[1px] bg-zinc-200 rounded-full my-0.5"></div>
                
                {/* Price */}
                <div className="flex items-end h-full py-2">
                    <div className="flex flex-col h-full w-full">
                        {arrival && (
                            <p className="px-1 pb-1">Ankunft um {arrival}</p>
                        )}
                        <p className="text-zinc-500 text-sm pb-1 justify-self-end">Regulärer Fahrtpreis <span className="line-through">€ {regular_price.toFixed(2)}</span></p>                        
                    </div>

                    <div className="w-1/2 flex flex-col items-end justify-center">
                        <div className="flex">
                            <p className="text-red-500 font-light text-xs pr-5">-{discount.toFixed()}%</p>                            
                        </div>

                        <div className="flex">
                            <p className="px-1 pb-1 font-semibold text-sm">€ {price.toFixed(2)}</p>
                            <ArrowDownward size={20} style={"-rotate-90"} />  
                        </div>  
                    </div>
                </div>
                
                <div className="flex flex-col pb-2 px-0">
                    <StackedBarChart segments={segments} />
                </div>
                
        </>
    )
}

export default TripOptionShort