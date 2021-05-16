import React, { useState } from 'react';
import Field from "../form/Field";
import { Link } from "react-router-dom";
import GROUPSERVICE from "../services/GROUPSERVICE";
import { toast } from "react-toastify";

const GroupPage = (props) => {
    const [group, setGroup] = useState({
        nameGroup: "",
        currentQuantity: 0,
        alertQuantity: 0
    })
    const [errors, setError] = useState({
        nameGroup: "",
        currentQuantity: 0,
        alertQuantity: 0
    })
    const handleChange = ({ currentTarget }) => {
        const { name, value, } = currentTarget;
        setGroup({ ...group, [name]: value });

    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(group)
        try {
            const response = await GROUPSERVICE.addNew(group);
            toast.success("Il gruppo è stato registrato")
            console.log(response)

        } catch (e) {
            console.log(e.response)
            toast.error("c'è stato un errore")
        }


    }
    return (
        <>
            <h1>Goups</h1>


            <form onSubmit={handleSubmit}>
                {/*  <Field name="nameGroup"
                    label="NomeDelGruppo" placeholder="nome del gruppo"
                    onChange={handleChange}
                    value={group.nameGroup}
                    error={errors.nameGroup}
                />
                <Field name="currentQuantity"
                    label="Quantità attuale" placeholder="quantità..."
                    onChange={handleChange}
                    type="number"
                    value={group.currentQuantity}
                    error={errors.currentQuantity}
                />
                <Field name="alertQuantity"
                    label="Quantità ad aggiugere" placeholder="quantità....."
                    onChange={handleChange}
                    type="number"
                    value={group.alertQuantity}
                    error={errors.alertQuantity}
                /> */}
                <div className="form-group">
                    <label htmlFor="nameGroup">NameGroup</label>
                    <input type="text" className="form-control"
                        name="nameGroup"
                        onChange={handleChange}
                        value={group.nameGroup}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="currentQuantity">QttyC:</label>
                    <input type="number" className="form-control"
                        name="currentQuantity"
                        value={group.currentQuantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="usr">QtyA:</label>
                    <input type="number" value={group.alertQuantity}
                        name="alertQuantity"
                        onChange={handleChange}
                        className="form-control" />
                </div>

                <div className="form-group d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-outline-success ">Crea Grouppo</button>
                    <Link to="/"><button className="btn btn-outline-success ">Vedi i gruppi</button>
                    </Link>

                </div>
            </form>
        </>
    );
}

export default GroupPage;