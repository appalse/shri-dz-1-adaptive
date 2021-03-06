import React, { useState } from 'react';
import './Input.scss';
import './../Icon/Icon.scss';
import './../Button/Button.scss';


export default function Input({id, placeholder, isRequired, hasDeleteIcon, onChange, additionalClasses, validate, value}) {

    const inputClass = additionalClasses ? ('Form-Input ' + additionalClasses) : 'Form-Input';

    const [state, setState] = useState(value);
    function handleChange(event) {
        if (validate && !validate(event.target.value)) {
            setState('');
            onChange(id, '');
            return;
        }
        setState(event.target.value);
        onChange(id, event.target.value);
    };

    function handleDeleteTextClick(event) {
        event.preventDefault();
        setState('');
    }
    
    return (
        <div className="Input">
            { isRequired ? 
                (<input id={id} className={inputClass} type="text" value={state} onChange={handleChange} placeholder={placeholder} required />) :
                (<input id={id} className={inputClass} type="text" value={state} onChange={handleChange} placeholder={placeholder}  />)
            }
            { hasDeleteIcon && 
                <button onClick={handleDeleteTextClick} className="Input-DeleteTextIcon Icon_type_deleteText"></button>
            }
        </div>
    );
}