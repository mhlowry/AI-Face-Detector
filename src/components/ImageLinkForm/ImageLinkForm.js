import { useEffect } from "react";
import React from "react";

const ImageLinkForm = ({ onSubmit, onChange }) => {
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Running the function.");
        event.preventDefault();
        onSubmit(); // Call the function
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [onSubmit]);

  return (
    <div>
      <p className="f3 b">
        {'I can detect faces in your pictures, give it a try.'}
      </p>
      <div className="center ph5 w-3">
        <input 
          onChange={onChange} 
          className="f4 pa2 w-70 center" 
          type='text'
          placeholder="Image URL"
        />
        <button 
          onClick={onSubmit} 
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
        >
          Detect
        </button>
      </div>
    </div>
  );
}

export default ImageLinkForm;
