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
        <div className="row">

            <div className="col-12">
                {group.map(group => (
                    <div className="row" key={group.id}>

                        <div className="col-2">
                            <button className="btn btn-primary btn-sm mr-5"><i class="fa fa-edit"></i></button>
                            <button className="btn btn-danger btn-sm mr-5"><i class="fa fa-trash-o"></i></button>
                            <hr />
                        </div>
                        <div className="col-10"><ul className="list-group">
                            <Link to="/grouplist/show/" >
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {group.nameGroup}

                                    <span className="badge badge-primary badge-pill">{group.products.length}</span>
                                </li>
                            </Link>
                        </ul></div>
                    </div>
                ))}


                {/* <ul className="list-group">
                {group.map(group=>
                    (
                    <Link to="/grouplist/show/:id" key={group.id} >
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            {group.nameGroup}

                            <span className="badge badge-primary badge-pill">{group.products.length}</span>
                        </li>
                    </Link>)


                )}
                </ul> */}
            </div>
        </div>

    </>);
}

export default GroupList;