import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context"
import ArrowDownward from "../assets/icons/ArrowDownward";

function TextInput(props) {
    
    const { id, placeholder, iconRotation, label } = props;
    const { originCoords, setOriginCoords, setDestinationCoords } = useContext(AppContext);
    const [text, setText] = useState("");
    const [address, setAddress] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [initialOriginName, setInitialOriginName] = useState("");
  
    useEffect(() => {
      fetch("/address-suggestions.json")
        .then((res) => res.json())
        .then((data) => setAddress(data));
      getReversedCoords()
    }, []);
  
    const handleChange = (e) => {
      const value = e.target.value;
      setText(value);
  
      if (!value) {
        setSuggestions([]);
        return;
      }
  
      const firstChar = value.charAt(0).toLowerCase();
      const filtered = address.filter((s) =>
        s.name.toLowerCase().startsWith(firstChar)
      );
  
      if (filtered.length > 0) {
        setSuggestions(filtered);
      } else {
        const shuffled = [...address].sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 3));
      }
      setShowDropdown(true);
    };
  
    const handleSelect = (suggestion) => {
      setText(suggestion.name);
      setShowDropdown(false);
      if (id === "originInput"){
        setOriginCoords([suggestion.lat, suggestion.lng])
      } else {
        setDestinationCoords([suggestion.lat, suggestion.lng])
      }
    };

    const getReversedCoords = async () => {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${originCoords[0]}&lon=${originCoords[1]}&format=json`, {
        headers: { 'User-Agent': 'On-Demand Rideppoling Bachelorarbeit' }
      });
      const data = await res.json();
      setInitialOriginName(data.display_name);
    }
  
    return (
      <div className="relative flex items-center w-full my-2 pr-1">
        <div className="mx-2.5 absolute justify-self-start">
          <p className="text-xs pb-1">{label}</p>
          <ArrowDownward size={14} style={iconRotation} />
        </div>
        <input type="text" id={id} value={text === "" && id === "originInput" ? initialOriginName : text} onChange={handleChange} placeholder={placeholder} className="w-full pl-8 py-3.5 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white placeholder:text-zinc-900 placeholder:font-medium" onFocus={() => setShowDropdown(true)} onBlur={() => setTimeout(() => setShowDropdown(false), 100)} />
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
  