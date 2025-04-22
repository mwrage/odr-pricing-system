import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context"
import ArrowDownward from "../assets/icons/ArrowDownward";
import { reverseGeocode } from "../utils/reverseGeocode";
import { useLocation } from "react-router-dom";

function TextInput(props) {
    
    const { id, placeholder, iconRotation, label } = props;
    const { originCoords, setOriginCoords, setDestinationCoords, originName, setOriginName, destinationName, setDestinationName, isButtonDisabled, setIsButtonDisabled } = useContext(AppContext);
    const [address, setAddress] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const scenarioParam = query.get("scenario");
  
    useEffect(() => {
      fetch("/address-suggestions.json")
        .then((res) => res.json())
        .then((data) => setAddress(data));
      const fetchOriginName = async () => {
        let name = "";
        if (scenarioParam == 0) {
          setOriginCoords([53.84744398630202, 10.678369399799335])
          name = await reverseGeocode(53.84744398630202, 10.678369399799335);   
        } else if (scenarioParam == 1) {
          setOriginCoords([53.860392208920615, 10.69017740460969])
          name = await reverseGeocode(53.860392208920615, 10.69017740460969);   
        } else if (scenarioParam == 2) {
          setOriginCoords([53.868803464034976, 10.703942829848167])
          name = await reverseGeocode(53.868803464034976, 10.703942829848167);   
        } else {
          name = await reverseGeocode(originCoords[0], originCoords[1]);          
        }
        setOriginName(name);
      };
      fetchOriginName();
    }, []);
  
    const handleChange = (e) => {
      const value = e.target.value;
      if (id === "originInput"){
        setOriginName(value)
      } else {
        setDestinationName(value)
      }
  
      if (!value) {
        setSuggestions([]);
        return;
      }
      
      const maxPrefixLength = Math.min(3, value.length);
      const prefix = value.substring(0, maxPrefixLength).toLowerCase();

      const filtered = address.filter((s) =>
        s.name.toLowerCase().startsWith(prefix)
      );

      if (filtered.length > 0) {
        setSuggestions(filtered);
      } else {
        const shuffled = [...address].sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 3));
      }
      setShowDropdown(true);
    };
  
    const handleSelect = async (suggestion) => {
      setShowDropdown(false);
      if (id === "originInput"){
        const fetchOriginName = async () => {
          const name = await  reverseGeocode(suggestion.lat, suggestion.lng)
          setOriginName(name);
        };
        fetchOriginName();
        setOriginCoords([suggestion.lat, suggestion.lng])
      } else {
        const fetchDestinationName = async () => {
          const name = await reverseGeocode(suggestion.lat, suggestion.lng)
          setDestinationName(name);
        };
        fetchDestinationName();
        setDestinationCoords([suggestion.lat, suggestion.lng])
      }
    };

    useEffect(() => {
      setIsButtonDisabled(!(originName.trim() && destinationName.trim()));
    }, [originName, destinationName]);
  
    return (
      <div className="relative flex items-center w-full my-2 pr-1">
        <div className="mx-2.5 absolute justify-self-start pt-4 pb-6">
          <p className="text-xs pb-1">{label}</p>
          <ArrowDownward size={14} style={iconRotation} />
        </div>
        <input type="text" id={id} value={id === "originInput" ? originName : destinationName} onChange={handleChange} placeholder={placeholder} className="w-full pl-8 pt-4 h-14 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white placeholder:text-zinc-900 placeholder:font-medium" onFocus={() => setShowDropdown(true)} onBlur={() => setTimeout(() => setShowDropdown(false), 100)} />
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-md border border-gray-200 z-10 mt-1 rounded-md max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li key={index} onMouseDown={() => handleSelect(suggestion)} className="px-4 py-2 hover:bg-blue-100 cursor-pointer" >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TextInput
  