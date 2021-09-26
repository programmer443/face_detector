import React from 'react';
import './ImageLinkForm.css'



const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
			<p className = "tex">
				{"Wanna, Detect Faces In Image. Let's Give A Try!"}
			</p>
			<div className = "center">
				<div className = "form center">
					<input className = "inpt" type= "text" onChange = {onInputChange}/>
					<button className = "btn" onClick = {onButtonSubmit}> DETECT </button>
				</div>
			</div>
		</div>

    );
}

export default ImageLinkForm;