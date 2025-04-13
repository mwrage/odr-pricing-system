import { useState } from "react";
import Search1 from "../assets/icons/Search1";

function TextInput({ id, placeholder }) {

    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
      <>
      <div className="relative flex items-center w-full rounded-lg">
        <Search1 size={18}/>
        <input type="text" id={id} value={text} onChange={handleChange} placeholder={placeholder} className="w-full pl-10 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"/>        
      </div>

      </>
    )
  }
  
  export default TextInput
  