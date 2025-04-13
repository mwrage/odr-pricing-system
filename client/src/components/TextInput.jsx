import { useState } from "react";
import ArrowDownward from "../assets/icons/ArrowDownward";

function TextInput(props) {
    
    const [text, setText] = useState("");
    const { id, placeholder, iconRotation, label } = props;

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
      <>
        <div className="relative flex items-center w-full my-2 pr-1 hover:cursor-pointer">
          <div className="mx-2.5 absolute justify-self-start">
            <p className="text-xs pb-1">{label}</p>
            <ArrowDownward size={14} style={iconRotation}/>
          </div>
          <input type="text" id={id} value={text} onChange={handleChange} placeholder={placeholder} className="w-full pl-8 py-3.5 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white placeholder:text-zinc-900 placeholder:font-medium"/>        
        </div>
      </>
    )
  }
  
  export default TextInput
  