import React, {useState} from 'react';
import Alert from '../components/Alert';
import Field from "../form/Field";
import {Link} from "react-router-dom";

const Registration = ({firstName,lastName, email,avatar}) => {
    const [ users, setUsers] = useState({
        firstName:"",
        lastName:"",
        email:"",
        avatar:""
    });
    const [ errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        email:"",
        avatar:""
    });
    const  handleChange=({currentTarget})=>{

    }
    const handleSubmit = (event)=>{
       console.log("handleSubmit")
    }
    return (<>

            <form onSubmit={handleSubmit}>
                <Field name="firstName"
                       label="Cognome del'uttente" placeholder="Nome del'uttente"
                       onChange={handleChange}
                       value={users.firstName}
                       error={errors.firstName}
                />
                <Field name="lastName"
                       label="Nome del'uttente" placeholder="cognome del'uttente"
                       onChange={handleChange}
                       value={users.firstName}
                       error={errors.firstName}
                />
                <Field name="email"
                       label="email" placeholder="indirizzio email"
                       onChange={handleChange}
                       value={users.firstName}
                       error={errors.firstName}
                />
                <button type="submit" className="btn btn-outline-success ">Mi Registro</button>
                <Link to="/login"><button className="btn btn-outline-success ">mi collego</button>
                </Link>
        </form>
        <Alert />
    </>);
}

export default Registration;