import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Field from '../../../../form/Field';
import { API_DESKTOP } from '../../../../services/Config';
import { toast } from 'react-toastify';
import CATEGORYSERVICE from '../../../../services/CATEGORYSERVICE.JS';
import LOCATIONSERVICE from '../../../../services/LOCATIONSERVICE.JS';
import Select from '../../../../form/Select';
import DesktopService from '../../../../services/DesktopService';
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
        price: "",
        priceb2b: ""
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

    //GESTION DE L'EDITION
    const [editing, setEditing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //executer la request la request POST vers l'api à travers AXIOS
            if (editing) {
                console.log(desktop)
                const response = DesktopService.editDesktopById(id, desktop);
                toast.success("il Computer è stato modificato")
                console.log(response)


            } else {
                const response = await axios.post(API_DESKTOP, desktop);
                console.log(response.data)
                toast.success("il computer è stato registrato")
                console.log(desktop);
            }

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
                console.log(data[0]["@id"])
                if (!desktop.location) {
                    setDesktop({ ...desktop, location: data[0]["@id"] })

                }

            } catch (error) {
                console.log(error)

            }
        }
        findLocation()
    }, []);
    useEffect(() => {
        if (id !== "new") {
            setEditing(true)

            const fetchData = async (id) => {
                try {
                    //const data = await axios.get(API_DESKTOP + "/" + id)
                    const data = await DesktopService.findDesktopById(id)
                    console.log(data)
                    const { productId, category, marque, model, processor, ram, hdd, location, grade, note, price, priceb2b } = data
                    setDesktop({ productId, category, marque, model, processor, ram, hdd, location, grade, note, price, priceb2b })
                    //  console.log(printer)
                    // console.log(data)
                } catch (error) {

                }
            }
            fetchData(id)

        }
    }
        , [id])
    return (<>
        {!editing && <h1>Add desktop</h1> || <h1>EDIZIONE DEL DESKTOP </h1>}
        <form onSubmit={handleSubmit}>
            <Field name="productId"
                label="ProductId" placeholder="l'id del product"
                value={desktop.productId} onChange={handleChange}
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
                <Link to={"/types/desktop"}> Vai alla lista dei desktop</Link>
            </div>

        </form>
    </>);
}

export default DesktopAdd;
