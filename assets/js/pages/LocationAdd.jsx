import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Field from '../form/Field';

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
            const data = await APISERVICE.addNew(locationName);
            //setLocationName(data);
            console.log(data);
            toast.success("la location è stata creata")
        } catch (error) {
            toast.error("C'è stato un errore")
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