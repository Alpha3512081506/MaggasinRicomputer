import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Field from '../form/Field';
import LOCATIONSERVICE from "../services/LOCATIONSERVICE.JS";

const LocationAdd = ({ props }) => {
    const [locationName, setLocationName] = useState({
        locationName: "",
    });
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setLocationName({ ...locationName, [name]: value })
    }
    const [errors, setErrors] = useState({
        locationName: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await LOCATIONSERVICE.addNew(locationName);
            setLocationName(response);
            console.log(response);
            toast.success("la location è stata creata")
        } catch (error) {

            if (error.response.data.violations){
                const apiErr = {};
                error.response.data.violations.forEach(violation=>{
                    apiErr[violation.propertyPath]= violation.message ;
                })
                setErrors(apiErr)
            }
            toast.error("C'è stato un errore")
        }
    }
    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Crea luogo dei prodotti</h1>
            <button className="btn btn-outline-success">Scan CodeBarre</button>
            <Link to="/locationadd"/>
        </div>
        <form onSubmit={handleSubmit}>
            <Field name="locationName"
                label="Luogo" placeholder="nome della location"
                onChange={handleChange}
                value={locationName.locationName}
                error={errors.locationName}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-outline-success ">Crea la Location</button>
                <Link to=""><button className="btn btn-outline-success ">tutti i luoghi</button>
                </Link>

            </div>
        </form>
    </>);
}

export default LocationAdd;