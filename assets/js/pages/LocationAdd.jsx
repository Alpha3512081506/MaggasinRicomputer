import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import APISERVICE from '../services/APISERVICE';
const LocationAdd = ({ props }) => {
    const [locationName, setLocationName] = useState({
        locationName: "",
    });
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setLocationName({ ...locationName, [name]: value })
    }
    const [errors, setErrors] = useState({
        L: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await APISERVICE.addNew("locations", locationName);
            setLocationName(data);
            console.log(data);
        } catch (error) {
            console.log(error.response)
        }
    }
    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Crea luogo dei prodotti</h1>
            <button className="btn btn-outline-success">Scan CodeBarre</button>
        </div>
        <form onSubmit={handleSubmit}>
            <Field name="locationName"
                label="Luogo" placeholder="nome della location"
                onChange={handleChange}
                value={locationName.locationName}
                error={locationName.locationName}
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