import React from 'react';
const Field = ({ placeholder = "",
    type = "text",
    label,
    name,
    value,
    icon="",
    error = "",
    onChange }) => {
    return (
        <div className="form-group row">
            <label htmlFor={name} className="col-sm-2 control-label"><i className={icon}></i>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                id={name}
                className={" col-sm-10 form-control" + (error && " is-invalid")}
                onChange={onChange}

            />
            {error && <p className="invalid-feedback text-center">{error}</p>}
        </div>
    );
}

export default Field;