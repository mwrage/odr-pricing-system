import CloudSun from "../assets/icons/CloudSun";
import Cloud2 from "../assets/icons/Cloud2";
import CloudBolt2 from "../assets/icons/CloudBolt2";
import CloudRain from "../assets/icons/CloudRain";

function Weather({ condition, temp })  {
 
    return (
      <div className="flex items-center justify-center w-2/3 text-zinc-800 inter-500">
        {["01n", "02n"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-end pr-1">
                    <p className="">Klar, {temp}°C</p>
                </div>
                <CloudSun size={30} />
            </div> 
        ) }
        {["03n", "04n"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-end pr-1">
                    <p className="">Wolkig, {temp}°C</p>
                </div>
                <Cloud2 size={30} />
            </div>
        ) }
        {["09n", "10n", "13n", "50n"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-end pr-1">
                    <p className="">Regnerisch, {temp}°C</p>
                </div>
                <CloudRain size={30} />
            </div>
        ) }
        {["11n"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-end pr-1">
                    <p className="">Stürmisch, {temp}°C</p>
                </div>
                <CloudBolt2 size={30} />
            </div>
        ) }
      </div>
    );
  };
export default Weather;