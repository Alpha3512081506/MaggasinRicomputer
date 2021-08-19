import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Field from '../../../form/Field';
import axios from 'axios';
import { API_PRINTER } from '../../../services/Config';
import PRINTERSERVICE from '../../../services/PRINTERSERVICE';
import LOCATIONSERVICE from '../../../services/LOCATIONSERVICE.JS';
import Select from '../../../form/Select';
import CATEGORYSERVICE from '../../../services/CATEGORYSERVICE.JS';
const PrinterAdd = (props) => {
    const { id = "new" } = props.match.params;
    // console.log(id);

    const [printer, setPrinter] = useState({
        productId: "",
        category: "",
        marque: "",
        model: "",
        paper: "",
        connector: "",
        tonner: "",
        format: "",
        type: "",
        location: "Select il Luogo",
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
        paper: "",
        connector: "",
        tonner: "",
        format: "",
        type: "",
        location: "",
        grade: "",
        note: "",
        price: "",
        priceb2b: ""
    });
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])
    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setPrinter({ ...printer, [name]: value });

    }

    useEffect(() => {
        const findAllCategories = async () => {
            try {
                const data = await CATEGORYSERVICE.findAll();

                setCategory(data)

                if (!printer.category) setPrinter({ ...printer, category: data[0]["@id"] })

            } catch (error) {
                console.log(error);
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
                if (!printer.location) {
                    setPrinter({ ...printer, location: data[0]["@id"] })

                }



            } catch (error) {
                console.log(error)

            }
        }
        findLocation()
    }, []);
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        if (id !== "new") {
            setEditing(true)

            const fetchData = async (id) => {
                try {
                    const data = await PRINTERSERVICE.findPrinterById(id)
                    // console.log(data)
                    const { productId, category, marque, model, paper, connector, tonner, format, type, location, grade, note, price, priceb2b } = data
                    setPrinter({ productId, category, marque, model, paper, connector, tonner, format, type, location, grade, note, price, priceb2b })

                    // console.log(data)
                } catch (error) {

                }
            }
            fetchData(id)

        }
    }, [id])
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {


            //executer la request la request POST vers l'api à travers AXIOS
            if (editing) {
                const data = await PRINTERSERVICE.editPrinterById(id, printer)
                // const data = await axios.put(API_PRINTER + "/" + id, printer)

                toast.success("La Stampante è stata modificata")
            } else {

                const response = await PRINTERSERVICE.addNewPrinter(printer)
                toast.success("La Stampante è stata creata")
                //const response = await axios.post(API_PRINTER, printer)
                console.log(response)
            }

        } catch (error) {
            console.log(error.response)
            if (error.response.data.violations) {
                const apiErr = {};
                error.response.data.violations.forEach(violation => {
                    apiErr[violation.propertyPath] = violation.message;
                })
                setError(apiErr)
            }

            toast.error("Erreur! impossibile di registrare la Stampante")
        }

        //console.log(printer);
    }
    return (<>
        {!editing && <h1>CREAZIONE DI STAMPANTE</h1> || <h1>EDIZIONE DI STAMPANTE</h1>}

        <form onSubmit={handleSubmit}>

            <Field name="productId"
                label="Printer ID" placeholder="id della Stampante"
                value={printer.productId}
                onChange={handleChange}
                error={error.productId}
            />
            <Select
                name="category"
                label="Category"
                value={printer.category}
                onChange={handleChange}
                error={error.category}
            >
                {category.map(category => <option key={category["@id"]} value={category["@id"]}>
                    {category.categoryName}</option>)}
            </Select>
            <Field name="marque"
                label="Marca" placeholder="Marca della Stampante"
                value={printer.marque}
                onChange={handleChange}
                error={error.marque}
            />

            <Field name="model"
                label="modello" placeholder="modello della Stampante"
                value={printer.model}
                onChange={handleChange}
                error={error.model}
            />
            <Field name="type"
                label="Typo" placeholder="typo"
                value={printer.type}
                onChange={handleChange}
                error={error.type}
            />
            <Field name="connector"
                label="Tecnologia" placeholder="Tecno della Stampante"
                value={printer.connector}
                onChange={handleChange}
                error={error.techno}

            />
            <Field name="format"
                label="Format" placeholder="Format della Stampante"
                value={printer.format}
                onChange={handleChange}
                error={error.format}

            />

            <Field name="tonner"
                label="Toner" placeholder="Toner della Stampante"
                value={printer.tonner}
                onChange={handleChange}
                error={error.tonner}
            />
            <Select
                name="location"
                label="Luogo"
                value={printer.location}
                onChange={handleChange}
                error={error.location}
            >
                {location.map(location => <option key={location["@id"]} value={location["@id"]}>
                    {location.locationName}</option>)}
            </Select>
            <Field name="grade"
                label="Grado" placeholder="Grado della Stampante"
                value={printer.grade}
                onChange={handleChange}
                error={error.grade}
            />

            <Field name="note"
                label="Note" placeholder="note della Stampante"
                value={printer.note}
                onChange={handleChange}
                error={error.note}
            />
            <Field name="paper"
                label="PP/M" placeholder="Papier per minuto della Stampante"
                value={printer.paper}
                onChange={handleChange}
                error={error.paper}
            />
            <Field name="price"
                label="price" placeholder="Price della Stampante"
                value={printer.price}
                onChange={handleChange}
                error={error.price}
            />
            <Field name="priceb2b"
                label="Price B2B" placeholder="Price per i rivenditori della Stampante"
                value={printer.priceb2b}
                onChange={handleChange}
                error={error.priceb2b}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
                <Link to={"/types/printers"}> Vai alla lista delle Stampante</Link>
            </div>
        </form>

    </>);
}

export default PrinterAdd;