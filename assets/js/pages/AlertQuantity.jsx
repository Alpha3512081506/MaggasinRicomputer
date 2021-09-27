import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import ListLoader from '../loader/ListLoader';
import { API_COMPONENNT } from '../services/Config';
const AlertQuantity = (props) => {
    const [group, setGroup] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const findComponent = async () => {
            try {
                const data = await axios.get(API_COMPONENNT, { params: { quantity: 10 } });
                setGroup(data)
                setLoading(false)
                toast.success("connessione al server effettuata ✔ ")
            } catch (error) {
                toast.error("Devi effettuare il login per accedere alle risorse")

            }

        }
        findComponent()
    }, [])
    return (<>
        {console.log(group)}
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h3>COMPONNEMTI CHE STANNO PER FINIRE O FINITI</h3>

        </div>
        {/** <div className="row">
            <div className="col">
                <div className="alert alert-warning" role="alert">
                    <h4>ID:XXXFREYT-RAM:DDR3-4GB- Quantità Rimanente<span className="badge badge-light badge-pill">4</span></h4>
                </div>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <div className="alert alert-danger" role="alert">
                    <h4>ID:XXXFREYJHY-HDD:500GB-Quantità Rimanente<span className="badge badge-light badge-pill">0</span></h4>
                </div>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <div className="alert alert-danger" role="alert">
                    <h4>ID:XXXFREYTDF-SSD:-120-Quantità Rimanente<span className="badge badge-light badge-pill">0</span></h4>
                </div>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <div className="alert alert-warning" role="alert">
                    <h4>ID:XXXFREYTDF-CAVI VGA-Quantità Rimanente<span className="badge badge-light badge-pill">8</span></h4>
                </div>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <div className="alert alert-warning" role="alert">
                    <h4>ID:XXXFREYTDF-CAVI ALIMENTAZIONI-Quantità Rimanente<span className="badge badge-light badge-pill">6</span></h4>
                </div>
            </div>

        </div>
*/}
    </>);
}

export default AlertQuantity;