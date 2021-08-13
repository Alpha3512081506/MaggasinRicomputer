import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../../../form/Field';
import Select from '../../../form/Select';
import CATEGORYSERVICE from '../../../services/CATEGORYSERVICE.JS';
import COMPONENTSERVICE from '../../../services/COMPONENTSERVICE';
import { API_COMPONENNT } from '../../../services/Config';
import LOCATIONSERVICE from '../../../services/LOCATIONSERVICE.JS';
const ComponentAdd = (props) => {
    const { id = "new" } = props.match.params;
    //  console.log(id);

    const [component, setComponent] = useState({
        productId: "",
        marque: "",
        type: "",
        specify: "",
        grade: "",
        quantity: "",
        category: "",
        location: ""

    });

    const [error, setErrors] = useState({
        productId: "",
        marque: "",
        type: "",
        specify: "",
        grade: "",
        quantity: ""
    });
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])
    const [editing, setEditing] = useState(false)



    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setComponent({ ...component, [name]: value });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //executer la request la request POST vers l'api à travers AXIOS
            if (editing) {
                const response = await axios.put(API_COMPONENNT + "/" + id, component);
                console.log("*********************************")
                console.log(response.data)
                console.log("*********************************")
                toast.success("il componente è stato modificato con successo");
                setErrors({})

                props.history.push("/types/component");
            } else {
                const data = COMPONENTSERVICE.addNewComponent(component)
                //const data = await axios.post(API_COMPONENNT, component);
                setErrors({});
                setComponent(data)
                toast.success("Componente salvato")
                props.history.push("/types/component");
            }

            if (!component.category) setComponent({ ...component, category: data[0]["@id"] })
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


    const findAllCategories = async () => {
        try {
            const data = await CATEGORYSERVICE.findAll();
            setCategory(data);
            if (!component.category) setComponent({ ...component, category: data[0]["@id"] })

        } catch (error) {
            console.log(error);
            toast.error("Erreur de chargement des categories")
        }
    }
    useEffect(() => { findAllCategories() }, []);
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            const fetchData = async (id) => {
                try {
                    const data = await COMPONENTSERVICE.finComponentById(id)
                    //const data = await axios.get(API_COMPONENNT + "/" + id)
                    // console.log(data)
                    const { productId, marque, type, specify, grade, quantity, category, location } = data
                    setComponent({ productId, marque, type, specify, grade, quantity, category, location })

                } catch (error) {
                    console.log(error.data)
                }
            }
            fetchData(id)
        }

    }, [id])


    const findLocation = async () => {
        try {
            const data = await LOCATIONSERVICE.findAll()
            setLocation(data);
            // console.log(location)
            if (!component.location) {
                //  setLocation({ ...component, location: data[0]["@id"] })

            }



        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => { findLocation() }, []);
    return (<>
        {!editing && <h1>Add component</h1> || <h1>Modifica Componente</h1>}
        <form onSubmit={handleSubmit}>
            <Field name="productId"
                label="ProductId" placeholder="l'id del product"
                value={component.productId} onChange={handleChange}
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
                value={component.quantity} onChange={handleChange}
                error={error.quantity}
            />

            <Field name="grade"
                label="Grado" placeholder="grado del product"
                value={component.grade} onChange={handleChange}
                error={error.processor}
            />


            <Select
                name="category"
                label="Category"
                value={component.category}
                onChange={handleChange}
                error={error.category}
            >
                {category.map(category => <option key={category["@id"]} value={category["@id"]}>
                    {category.categoryName}</option>)}
            </Select>

            <Select
                name="location"
                label="Luogo"
                value={component.location}
                onChange={handleChange}
                error={error.location}
            >
                {location.map(location => <option key={location["@id"]} value={location["@id"]}>
                    {location.locationName}</option>)}
            </Select>

            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
                <Link to={"/types/component"}> Vai alla lista dei Componenti</Link>
            </div>
        </form>
    </>);
}

export default ComponentAdd;