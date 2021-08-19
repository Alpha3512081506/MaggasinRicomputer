import React, { useState } from 'react';
import Alert from '../components/Alert';
import Field from "../form/Field";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import REGISTRATION from "../services/REGISTRATION";

const Registration = ({ firstName, lastName, email, avatar }) => {
    const [users, setUsers] = useState({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        avatar: ""
    });
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUsers({ ...users, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(users)
            const response = await REGISTRATION.addNew(users);
            setUsers(response.data);
            console.log(response);
            toast.success("user è stato creato")
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

        <form onSubmit={handleSubmit}>
            <Field name="firstName"
                label="Cognome del'uttente" placeholder="Il suo Cognome"
                onChange={handleChange}
                value={users.firstName}
                error={errors.firstName}
            />
            <Field name="lastName"
                label="Nome del'uttente" placeholder="cognome del'uttente"
                onChange={handleChange}
                value={users.lastName}
                error={errors.lastName}
            />
            <Field name="email"
                label="email" placeholder="indirizzio email"
                onChange={handleChange}
                value={users.email}
                error={errors.email}
            />
            <Field name="password"
                label="password" placeholder="il segretto" type="password"
                onChange={handleChange}
                value={users.password}
                error={errors.password}
            />
            <Field name="avatar"
                label="Avatar" placeholder="indirizzio email"
                onChange={handleChange}
                value={users.avatar}
                error={errors.avatar}
            />
            <Link to="/login"><button className="btn btn-outline-success ">mi collego</button></Link>
            <button type="submit" className="btn btn-success">Mi Registro</button>
        </form>
    </>);
}

export default Registration;