import React, { useEffect, useState } from 'react';
import LOCATIONSERVICE from "../services/LOCATIONSERVICE.JS";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import APISERVICE from "../services/PRODUCTSERVICE";
import TableLoader from '../loader/TableLoader';

const Location = (props) => {
    const [locations, setLocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const findAll = async () => {
        try {
            const data = await LOCATIONSERVICE.findAll();
            setLocation(data);

            setLoading(false)
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

        {loading && <TableLoader />}
        {!loading && <table className="table table-hover table-bordered table-sm">
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
                        <td></td>

                    </tr>
                )
                )}

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2"><p>pagination </p></td>
                </tr>
            </tfoot>
        </table>}

    </>);
}

export default Location;