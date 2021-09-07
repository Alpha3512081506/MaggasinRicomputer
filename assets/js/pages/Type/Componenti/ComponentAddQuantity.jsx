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
        // productId: "",

        quantity: ""
    });
    const [quantityNew, setNewQuantityNew] = useState(0)

    const handleChangeQuantity = (event) => {
        //  const inputValue = parseInt(event.currentTarget.value);
        setNewQuantityNew(quantityNew)
        console.log(event.currentTarget.value)
    }
    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setComponent({ ...component, [name]: value });
        // console.log(quantityNew)

    }


    useEffect(() => {

        const findComponent = async (id) => {
            try {
                const data = await COMPONENTSERVICE.finComponentById(id)
                // const data = await axios.get(API_COMPONENNT + "/" + id)
                const { quantity, productId } = data
                setComponent({ quantity, productId })

            } catch (error) {
                console.log(error)
                toast.error("Si è verificato un errore")
            }
        }
        findComponent(id)
    }, [id])



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            console.log(component)
            // setComponent({ ...component })
            //const response = await COMPONENTSERVICE.editComponentById(id, component);
            const response = await axios.put(API_COMPONENNT + "/" + id, { ...component, quantity: parseInt(quantity + quantityNew) });

            console.log()
            toast.success("il componente è stato modificato con successo");
            // history.push("/types/component")
            setErrors({})

            //  props.history.push("/types/component");

        } catch (error) {
            console.log(error)
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

    const [valueA, setValueA] = useState(0);
    const [test, setTest] = useState(0)
    const handleChangeValueA = (event) => {
        const intvalue = event.currentTarget.value;
        const test = parseInt(event.currentTarget.value)
        if (intvalue) {
            parseInt(intvalue, 10);
            const finalValue = intvalue + 5;
            //console.log(typeof (test))
            setTest(test + 5)
        }

    }

    return (<>

        { /**  <input type="number" name={valueA} defaultValue={valueA} id={valueA} onChange={handleChangeValueA} />*/}
        <h1>Aggiungi component</h1>

        <Uploader />
        {quantityNew}


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
                <input type="number" className="form-control" placeholder=""

                    id="quantity" name="quantity"
                    defaultValue={component.quantity} onChange={handleChange}
                    error={error.quantityActual}

                />
            </div>
            <div className="form-group">
                <div className="form-group">
                    <label htmlFor="quantityNew">Nuova Quantità:</label>
                    <input type="number" className="form-control" name="quantityNew"
                        placeholder="Nuova quantità" id="quantityNew"
                        defaultValue={parseInt(quantityNew)} onChange={handleChangeQuantity}
                        error={error.quantityNew}
                    />
                </div>
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
            </div>
        </form>

    </>);
}

export default ComponentAddQuantity;