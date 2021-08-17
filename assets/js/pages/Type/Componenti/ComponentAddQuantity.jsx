import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../../../form/Field';
import COMPONENTSERVICE from '../../../services/COMPONENTSERVICE';
import { API_COMPONENNT } from '../../../services/Config';
import Uploader from '../../../services/Uploader';

const ComponentAddQuantity = (props) => {
    const id = props.match.params.id;


    const [component, setComponent] = useState({
        productId: "",
        quantity: "",


    });

    const [error, setErrors] = useState({
        productId: "",

        quantity: ""
    });
    const [quantityNew, setNewQuantityNew] = useState(0)

    const handleChangeQuantity = (event) => {
        setNewQuantityNew(event.currentTarget.value)
        console.log(quantityNew)
    }
    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setComponent({ ...component, [name]: value });
        // console.log(quantityNew)

    }





    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(component)
            // setComponent({ ...component })
            const response = await COMPONENTSERVICE.editComponentById(id, { ...component, });
            console.log(component)
            toast.success("il componente è stato modificato con successo");
            history.push("/types/component")
            setErrors({})

            //  props.history.push("/types/component");

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
    useEffect(() => {

        const findComponent = async (id) => {
            try {
                const data = await COMPONENTSERVICE.finComponentById(id)
                // const data = await axios.get(API_COMPONENNT + "/" + id)
                const { productId, quantity } = data
                setComponent({ productId, quantity: quantity + quantityNew })

                console.log(component)


            } catch (error) {
                console.log(error)
                toast.error("Si è verificato un errore")
            }
        }
        findComponent(id)
    }, [id])



    return (<>

        <h1>Aggiungi component</h1>
        <Uploader />
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="productId">Quantità  :</label>
                <input type="text" disabled className="form-control" placeholder=""
                    id="productId" name="productId"
                    defaultValue={component.productId} onChange={handleChange}
                    error={error.productId}

                />
            </div>
            <div className="form-group">
                <label htmlFor="quantityActual">Quantità  :</label>
                <input type="number" disabled className="form-control" placeholder=""

                    id="quantity" name="quantity"
                    defaultValue={component.quantity} onChange={handleChange}
                    error={error.quantityActual}

                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
            </div>
        </form>
        <div className="form-group">
            <label htmlFor="quantityNew">Nuova Quantità:</label>
            <input type="number" className="form-control" name="quantityNew"
                placeholder="Nuova quantità" id="quantityNew"
                defaultValue={quantityNew} onChange={handleChangeQuantity}
                error={error.quantityNew}
            />
        </div>
    </>);
}

export default ComponentAddQuantity;