import React, { useEffect, useState } from 'react';
import LOCATIONSERVICE from "../services/LOCATIONSERVICE.JS";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import APISERVICE from "../services/PRODUCTSERVICE";

const Location = (props) => {
    const [locations, setLocation] = useState([]);
    const findAll = async () => {
        try {
            const data = await LOCATIONSERVICE.findAll();
            setLocation(data);
            console.log(data)
            toast.success("connessione al server effettuata ✔ ")
        } catch (error) {
            console.log(error)
            toast.error("Devi effettuare il login per accedere alle risorse")
        }
    }
    useEffect(() => { findAll() }, [])
    const handleDelete = async (id) => {
        const originalLocations = [...locations];
        setLocation(locations.filter(location => location.id !== id));
        try {
            await APISERVICE.deleteId(id)
            toast.success("la location è stata cancellata")
        } catch (error) {
            setLocation(originalLocations);
            toast.error("si è verificato un errore ");
        }

    }
    return (<>
        <Link to="/locationadd" className="btn btn-outline-success">crea un luogo</Link>
        {/*<button className="btn btn-outline-success">Scan CodeBarre</button>*/}
        <h1>Locations List</h1>

        <table className="table table-hover table-bordered table-sm">
            <thead className="thead-dark">
                <tr>
                    <th></th>
                    <th>LocationName</th>
                    <th>ProductCount</th>



                </tr>

            </thead>
            <tbody>
                {locations.map(location => (
                    <tr key={location.id}><td>
                        {/* <button className="btn btn-outline-success"><i className="fa fa-search"></i></button>
                        <button className="btn btn-outline-success"><i className="fa fa-pencil"></i></button>*/}
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(location.id)}><i className="fa fa-trash"></i></button>
                    </td>
                        <td>{location.locationName}</td>

                    </tr>
                )
                )}

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2"><p>pagination </p></td>
                </tr>
            </tfoot>
        </table>

    </>);
}

export default Location;