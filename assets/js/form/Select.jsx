import React from 'react';
const Select = ({ placeholder = "",
    label,
    name,
    value,
    error = "",
    onChange,
    children
}) => {
    return (
        <div className="form-group row">
            <label htmlFor={name} className="col-sm-2 control-label">{label}</label>
            <input

                placeholder={placeholder}
                value={value}
                name={name}

                className={" col-sm-10 form-control" + (error && " is-invalid")}
                onChange={onChange}

            />
        </div>
    );
}

export default Select;