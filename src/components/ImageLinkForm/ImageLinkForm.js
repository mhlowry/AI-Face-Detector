import React from "react";

const ImageLinkForm = (props) => {
    return(
        <div>
            <p className="f3 b">
                {'I can detect faces in your pictures, give it a try.'}
            </p>
            <div className="center ph5 w-3">
                <input 
                    onChange={props.onChange} 
                    className="f4 pa2 w-70 center" 
                    type='text'
                    placeholder="Image URL">
                </input>
                <button 
                    onClick={props.onSubmit} 
                    className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
                    Detect
                </button>
            </div>
        </div>
    );
}

export default ImageLinkForm;