import React, { useEffect, useState } from 'react';
import LOCATIONSERVICE from "../services/LOCATIONSERVICE.JS";
import { toast } from "react-toastify";

const Location = (props) => {
    const [locations, setLocation] = useState([]);
    const findAll = async () => {
        try {
            const data = await LOCATIONSERVICE.findAll();
            setLocation(data);
            toast.success("connessione al server effettuata ✔ ")
        } catch (error) {
            console.log(error)
            toast.error("Impossibile di collegarsi al server")
        }
    }
    useEffect(() => { findAll() }, [])
    return (<>
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
                        <button className="btn btn-outline-success"><i className="fa fa-search"></i></button>
                        <button className="btn btn-outline-success"><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-outline-danger"><i className="fa fa-trash"></i></button>
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