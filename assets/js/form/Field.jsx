import React from 'react';
const Field = ({ placeholder = "",
    type = "text",
    label,
    name,
    value,
    error = "",
    onChange }) => {
    return (
        <div className="form-group row">
            <label htmlFor={name} className="col-sm-2 control-label">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                id={name}
                className={" col-sm-10 form-control" + (error && " is-invalid")}
                onChange={onChange}

            />
        </div>
    );
}

export default Field;