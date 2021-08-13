import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Field from '../../../../form/Field';
import { API_DESKTOP } from '../../../../services/Config';
import { toast } from 'react-toastify';
import CATEGORYSERVICE from '../../../../services/CATEGORYSERVICE.JS';
import LOCATIONSERVICE from '../../../../services/LOCATIONSERVICE.JS';
import Select from '../../../../form/Select';
const DesktopAdd = (props) => {
    const { id = "new" } = props.match.params;
    // console.log(id);

    const [desktop, setDesktop] = useState({
        productId: "",
        category: "",
        marque: "",
        model: "",
        processor: "",
        ram: "",
        hdd: "",
        location: "",
        grade: "",
        note: "Scrivere Le Note:",
        price: 0,
        priceb2b: 0
    });

    const [error, setError] = useState({
        productId: "",
        category: "",
        marque: "",
        model: "",
        processor: "",
        ram: "",
        hdd: "",
        location: "",
        grade: "",
        note: "",
        price: "",
        priceb2b: ""
    });
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setDesktop({ ...desktop, [name]: value });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //executer la request la request POST vers l'api à travers AXIOS
            const response = await axios.post(API_DESKTOP, desktop);
            console.log(response.data)
            toast.success("Registrato")
            console.log(desktop);
        } catch (error) {
            console.log(error.response)
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
        const findAllCategories = async () => {
            try {
                const data = await CATEGORYSERVICE.findAll();
                setCategory(data);
                if (!desktop.category) setDesktop({ ...desktop, category: data[0]["@id"] })

            } catch (error) {
                console.log(error);
                toast.error("Erreur de chargement des categories")
            }
        }

        findAllCategories()
    },
        []);



    useEffect(() => {

        const findLocation = async () => {
            try {
                const data = await LOCATIONSERVICE.findAll()
                setLocation(data);
                // console.log(location)
                if (!desktop.location) {
                    //  setLocation({ ...desktop, location: data[0]["@id"] })

                }

            } catch (error) {
                console.log(error)

            }
        }
        findLocation()
    }, []);
    return (<>
        <h1>Add desktop</h1>
        <form onSubmit={handleSubmit}>
            <Field name="productId"
                label="ProductId" placeholder="l'id del product"
                value={desktop.printerId} onChange={handleChange}
                error={error.productId}
            />

            <Select
                name="category"
                label="Category"
                value={desktop.category}
                onChange={handleChange}
                error={error.category}
            >
                {category.map(category => <option key={category["@id"]} value={category["@id"]}>
                    {category.categoryName}</option>)}
            </Select>

            <Field name="marque"
                label="Marca" placeholder="Marca del product"
                value={desktop.marque} onChange={handleChange}
                error={error.marque}
            />
            <Field name="model"
                label="Modello" placeholder="Modello del product"
                value={desktop.model} onChange={handleChange}
                error={error.model}
            />
            <Field name="processor"
                label="C.P.U" placeholder="processor del product"
                value={desktop.processor} onChange={handleChange}
                error={error.processor}
            />

            <Select
                name="location"
                label="Luogo"
                value={desktop.location}
                onChange={handleChange}
                error={error.location}
            >
                {location.map(location => <option key={location["@id"]} value={location["@id"]}>
                    {location.locationName}</option>)}
            </Select>


            <Field name="ram"
                label="RAM" placeholder="la Ram del product"
                value={desktop.ram} onChange={handleChange}
                error={error.ram}
            />
            <Field name="hdd"
                label="H.D.D" placeholder="il disco del product"
                value={desktop.hdd} onChange={handleChange}
                error={error.hdd}
            />


            <Field name="grade"
                label="Grado" placeholder="Grado del product"
                value={desktop.grade} onChange={handleChange}
                error={error.grade}
            />
            <Field name="note"
                label="Note" placeholder="Note"
                value={desktop.note} onChange={handleChange}
                error={error.note}
            />
            <Field name="price"
                label="Prezzo" placeholder="Prezzo"
                value={desktop.price} onChange={handleChange}
                error={error.price}
            />
            <Field name="priceb2b"
                label="Prezzo al rivenditore" placeholder="Prezzo"
                value={desktop.priceb2b} onChange={handleChange}
                error={error.priceb2b}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
                <Link to={"/types/ragrupati"}> Vai alla lista notebook</Link>
            </div>

        </form>
    </>);
}

export default DesktopAdd;
