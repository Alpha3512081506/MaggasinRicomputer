import React from 'react';
const Select = ({
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

            <select name={name} id={name}
                onChange={onChange} value={value}
                className={"form-control" + (error && " invalid ")}
            >
                {children}

            </select>
            <p className="invalid-feeback">{error}</p>
        </div>
    );
}

export default Select;