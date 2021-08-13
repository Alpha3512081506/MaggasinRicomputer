import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
        quantityNew: 0,
        quantity: "",


    });

    const [error, setErrors] = useState({
        productId: "",

        quantity: ""
    });


    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setComponent({ ...component, [name]: value });

    }
    /** const findComponent = async (id) => {
        try {
            // const data = await COMPONENTSERVICE.finComponentById(idComponent)
            const data = await axios.get("https://localhost:8000/api/components/125")
            setComponent(data)
            //console.log(data)
        } catch (error) {
            console.log(error)
            toast.error("Si è verificato un errore")
        }
    }



    const [data, setData] = useState([]);
  
      useEffect(() => {
  
          function getFetchUrl() {
              return API_COMPONENNT;
          }
          async function fetchData() {
              const result = await axios.get(getFetchUrl());
              setData(result.data);
              console.log("**********************************************")
              console.log(data)
          }
  
          fetchData();
      }, [data]); // ✅ Deps are OK
  
      // ...
      */



    const [quantityNew, setNuantityNew] = useState(0)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(component)
            setComponent({ ...component })
            //await COMPONENTSERVICE.editComponentById(idComponent, component);
            toast.success("il componente è stato modificato con successo");
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
                // console.log(data)
                const { productId, quantity } = data
                setComponent({ productId, quantity })
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
                <label htmlFor="quantityNew">Nuova Quantità:</label>
                <input type="number" className="form-control" name="quantityNew"
                    placeholder="Nuova quantità" id="quantityNew"
                    defaultValue={component.quantityNew} onChange={handleChange}
                    error={error.quantityNew}
                />
            </div>


            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
            </div>
        </form>
    </>);
}

export default ComponentAddQuantity;