import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../../../form/Field';
import Select from '../../../form/Select';
import CATEGORYSERVICE from '../../../services/CATEGORYSERVICE.JS';
import { API_NOTEBOOK } from '../../../services/Config';
import LOCATIONSERVICE from '../../../services/LOCATIONSERVICE.JS';
import NOTEBOOKSERVICE from '../../../services/NOTEBOOKSERVICE';
const NoteBookAdd = (props) => {
    const { id = "new" } = props.match.params;
    console.log(id);

    const [notebook, setNotebok] = useState({
        productId: "",
        category: "",
        marque: "",
        model: "",
        processor: "",
        ram: "",
        hdd: "",
        secreen: "",
        location: "Select il Luogo",
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
        secreen: "",
        location: "",
        grade: "",
        note: "",
        price: "",
        priceb2b: ""
    });
    const [editing, setEditing] = useState(false);
    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setNotebok({ ...notebook, [name]: value });

    }

    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])
    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
            const findNoteBook = async id => {
                try {
                    const data = await NOTEBOOKSERVICE.findNotebookById(id)
                    console.log(data)
                    setProduct(data)
                } catch (error) {
                    console.log("il ya une erreur")
                }
            }
            findNoteBook(id)
        }
    }, [id])
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //executer la request la request POST vers l'api à travers AXIOS
            if (editing) {
                NOTEBOOKSERVICE.editNotebookById(id, Component)

            } else {
                //  const data = await axios.post(API_NOTEBOOK, notebook)
                await NOTEBOOKSERVICE.addNewNotebook(Component)
                setNotebok(data)
                console.log(notebook);
            }


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
        const findAllCategories = async () => {
            try {
                const data = await CATEGORYSERVICE.findAll();
                setCategory(data)

                if (!notebook.category) setNotebok({ ...notebook, category: data[0]["@id"] })

            } catch (error) {
                console.log(error.data);
                toast.error("Erreur de chargement des categories")
            }
        }
        findAllCategories()
    }, []);



    useEffect(() => {
        const findLocation = async () => {
            try {
                const data = await LOCATIONSERVICE.findAll()
                setLocation(data);
                // console.log(location)
                if (!notebook.location) {
                    //  setLocation({ ...notebook, location: data[0]["@id"] })

                }



            } catch (error) {
                console.log(error)

            }
        }
        findLocation()
    }, []);
    return (<>
        <h1>Add NoteBook</h1>
        <form onSubmit={handleSubmit}>
            <Field name="productId"
                label="ProductId" placeholder="l'id del product"
                value={notebook.printerId} onChange={handleChange}
                error={error.productId}
            />
            <Select
                name="category"
                label="Category"
                value={notebook.category}
                onChange={handleChange}
                error={error.category}
            >
                {category.map(category => <option key={category["@id"]} value={category["@id"]}>
                    {category.categoryName}</option>)}
            </Select>


            <Field name="marque"
                label="Marca" placeholder="Marca del product"
                value={notebook.marque} onChange={handleChange}
                error={error.marque}
            />
            <Field name="model"
                label="Modello" placeholder="Modello del product"
                value={notebook.model} onChange={handleChange}
                error={error.model}
            />
            <Field name="processor"
                label="C.P.U" placeholder="processor del product"
                value={notebook.processor} onChange={handleChange}
                error={error.processor}
            />

            <Select
                name="location"
                label="Luogo"
                value={notebook.location}
                onChange={handleChange}
                error={error.location}
            >
                {location.map(location => <option key={location["@id"]} value={location["@id"]}>
                    {location.locationName}</option>)}
            </Select>
            <Field name="ram"
                label="RAM" placeholder="la Ram del product"
                value={notebook.ram} onChange={handleChange}
                error={error.ram}
            />
            <Field name="hdd"
                label="H.D.D" placeholder="il disco del product"
                value={notebook.hdd} onChange={handleChange}
                error={error.hdd}
            />

            <Field name="sreen"
                label="Schermo" placeholder="schermo del product"
                value={notebook.secreen} onChange={handleChange}
                error={error.secreen}
            />
            <Field name="grade"
                label="Grado" placeholder="Grado del product"
                value={notebook.grade} onChange={handleChange}
                error={error.grade}
            />
            <Field name="note"
                label="Note" placeholder="Note"
                value={notebook.note} onChange={handleChange}
                error={error.note}
            />
            <Field name="price"
                label="Prezzo" placeholder="Prezzo"
                value={notebook.price} onChange={handleChange}
                error={error.price}
            />
            <Field name="priceb2b"
                label="Prezzo al rivenditore" placeholder="Prezzo"
                value={notebook.priceb2b} onChange={handleChange}
                error={error.priceb2b}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
                <Link to={"/types/notebook"}> Vai alla lista notebook</Link>
            </div>

        </form>
    </>);
}

export default NoteBookAdd;