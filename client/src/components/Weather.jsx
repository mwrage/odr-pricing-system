import CloudSun from "../assets/icons/CloudSun";
import Cloud2 from "../assets/icons/Cloud2";
import CloudBolt2 from "../assets/icons/CloudBolt2";
import CloudRain from "../assets/icons/CloudRain";

function Weather({ condition, temp })  {
    return (
      <div className="flex items-center justify-center w-2/3 text-zinc-800 inter-500 pt-1">
        {["01n", "02n", "01d", "02d"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-center pr-1">
                    <p className="">Klar, {temp.toFixed()}°C</p>
                </div>
                <CloudSun size={28} color={"#343C54"} />
            </div> 
        ) }
        {["03n", "04n", "03d", "04d"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-center pr-1">
                    <p className="">Wolkig, {temp.toFixed()}°C</p>
                </div>
                <Cloud2 size={28} />
            </div>
        ) }
        {["09n", "10n", "13n", "50n", "09d", "10d", "13d", "50d"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-center pr-1">
                    <p className="">Regnerisch, {temp.toFixed()}°C</p>
                </div>
                <CloudRain size={28} />
            </div>
        ) }
        {["11n", "11d"].includes(condition) && (
            <div className="flex flex-row">
                <div className="flex flex-col justify-center pr-1">
                    <p className="">Stürmisch, {temp.toFixed()}°C</p>
                </div>
                <CloudBolt2 size={28} />
            </div>
        ) }
      </div>
    );
  };
export default Weather;