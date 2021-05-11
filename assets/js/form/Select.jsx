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
            <label htmlFor={name} className="col-sm-2 control-label">Sceglie  {label}:</label>

            <select  name={name} onChange={onChange} defaultValue={value}
                    className={"form-control" + (error && " invalid ")}
                    className={"form-control" + (error && " invalid ")}
            >
                {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </div>
    );
}

export default Select;