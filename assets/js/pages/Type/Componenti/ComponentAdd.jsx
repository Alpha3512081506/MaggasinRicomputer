import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../../form/Field';
const ComponentAdd = (props) => {
    const { id = "new" } = props.match.params;
    console.log(id);

    const [component, setComponent] = useState({
        productId: "",
        marque: "",
        type: "",
        specify: "",
        grade: "",
        quantity: ""

    });

    const [error, setError] = useState({
        productId: "",
        marque: "",
        type: "",
        specify: "",
        grade: "",
    });
    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setcomponent({ ...component, [name]: value });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //executer la request la request POST vers l'api à travers AXIOS
            console.log(component);
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
        <h1>Add component</h1>
        <form onSubmit={handleSubmit}>
            <Field name="productId"
                label="ProductId" placeholder="l'id del product"
                value={component.printerId} onChange={handleChange}
                error={error.productId}
            />

            <Field name="type"
                label="Tipologia" placeholder="tipologia del product"
                value={component.type} onChange={handleChange}
                error={error.type}
            />
            <Field name="marque"
                label="Marca" placeholder="Marca del product"
                value={component.marque} onChange={handleChange}
                error={error.marque}
            />
            <Field name="specify"
                label="Specifiche" placeholder="specifiche del product"
                value={component.specify} onChange={handleChange}
                error={error.specify}
            />
            <Field name="quantity"
                label="Quantità" placeholder="quantità del product"
                value={component.processor} onChange={handleChange}
                error={error.processor}
            />

            <Field name="grade"
                label="Grado" placeholder="grado del product"
                value={component.processor} onChange={handleChange}
                error={error.processor}
            />

            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
                <Link to={"/types/component"}> Vai alla lista dei Componenti</Link>
            </div>
        </form>
    </>);
}

export default ComponentAdd;