import React from "react";
import './Filters.css';

function Select({ label, name, options, onChange }) {
    
    return (
        <div className="selects">
            <p htmlFor={name}>{label}</p>
            <select name={name} id={name} onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
