import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Field from '../form/Field';
import LOCATIONSERVICE from "../services/LOCATIONSERVICE.JS";

const LocationAdd = (props) => {
    const { id = "new" } = props.match.params;
    const [locationName, setLocationName] = useState({
        locationName: "",
    });
    const [editing, setEditing] = useState(false);
    const findLocation = async id => {
        try {
            const data = await LOCATIONSERVICE.findlocationById(id)
            console.log(data)
            setLocationName(data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        if (id !== "new") { setEditing(true) }
        findLocation(id)
    }, [id])
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
            if (editing) {
                const response = LOCATIONSERVICE.editLocationById(id, locationName)
                setLocationName(response);
                toast.success("la location è stata creata")
            } else {
                const response = await LOCATIONSERVICE.addNew(locationName);
                setLocationName(response);
                console.log(response);
                toast.success("la location è stata creata")
            }

        } catch (error) {

            if (error.response.data.violations) {
                const apiErr = {};
                error.response.data.violations.forEach(violation => {
                    apiErr[violation.propertyPath] = violation.message;
                })
                setErrors(apiErr)
            }
            toast.error("C'è stato un errore")
        }

    }
    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            {!editing && (<h1>Creazione luogo</h1>) || (<h1>Edizione luogo </h1>)}
            <button className="btn btn-outline-success">Scan CodeBarre</button>
            <Link to="/locationadd" />
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