import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../../../form/Field';
import COMPONENTSERVICE from '../../../services/COMPONENTSERVICE';

const ComponentAddMinusQuantity = (props) => {
    const id = props.match.params.id;
    //  console.log(id);
    const [quantityActual, setquantityActual] = useState(0)
    const [component, setComponent] = useState({
        productId: "",
        quantity: "",


    });

    const [error, setErrors] = useState({
        productId: "",
        quantityActual: "",
        quantity: ""
    });


    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setComponent({ ...component, [name]: value });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(component)
        try {
            //executer la re
            const data = COMPONENTSERVICE.editComponentById(id, component);
            toast.success("il componente è stato modificato con successo");
            setErrors({})

            props.history.push("/types/component");

        } catch (error) {
            if (error.response.data.violations) {
                const apiErr = {};
                error.response.data.violations.forEach(violation => {
                    apiErr[violation.propertyPath] = violation.message;
                })
                setErrors(apiErr)
            }

            toast.error("Erreur! impossibile di registrare la Stampante")
        }

        //console.log(printer);
    }

    return (<>
        <h1>Togli component</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="productId">Quantità  :</label>
                <input type="text" className="form-control" placeholder=""
                    id="productId" name="productId"
                    value={component.productId} onChange={handleChange}
                    error={error.productId}

                />
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantità  :</label>
                <input type="number" className="form-control" placeholder=""
                    id="quantity" name="quantity"
                    value={component.quantity} onChange={handleChange}
                    error={error.quantity}

                />
            </div>

            <div className="form-group">
                <label htmlFor="quantityActual">Nuova Quantità:</label>
                <input type="number" className="form-control" name="quantityActual"
                    placeholder="Nuova quantità" id="quantityActual"
                    value={quantityActual} onChange={handleChange}
                    error={error.quantityActual}
                />
            </div>


            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
            </div>
        </form>
    </>);
}

export default ComponentAddMinusQuantity;