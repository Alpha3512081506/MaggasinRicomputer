import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import GROUPSERVICE from '../services/GROUPSERVICE';
const GroupList = (props) => {
    const [group, setGroup] = useState([]);
    const findGroup = async () => {
        try {
            const data = await GROUPSERVICE.findAll();
            setGroup(data)
            console.log(data)
            toast.success("connessione al server effettuata ✔ ")
        } catch (error) {
            toast.error("Devi effettuare il login per accedere alle risorse")

        }

    }
    useEffect(() => { findGroup() }, [])
    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>List Groups</h1>
            <Link to="/group" className="btn btn-outline-success">Grea gruppo</Link>

        </div>

    </>);
}

export default GroupList;