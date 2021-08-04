import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Field from '../../../form/Field';
import axios from 'axios';
import { API_PRINTER } from '../../../services/Config';
const PrinterAdd = (props) => {
    const { id = "new" } = props.match.params;
    console.log(id);

    const [printer, setPrinter] = useState({
        printerId: "",
        category: "",
        marque: "",
        model: "",
        paper: 0,
        techno: "",
        toner: "",
        format: "",
        type: "",
        location: "Select il Luogo",
        grade: "",
        note: "Scrivere Le Note:",
        price: 0,
        priceb2b: 0
    });

    const [error, setError] = useState({
        printerId: "L'Id del prodotto è obligatoria",
        category: "la categoria è obligatoria",
        marque: "mla marca è obligatoria",
        model: "il modello è obligatorio",
        paper: "",
        techno: "",
        toner: "",
        format: "",
        type: "",
        location: "Devi Scegliere per forza  il Luogo",
        grade: "",
        note: "Scrivere Le Note:",
        price: "",
        priceb2b: ""
    });
    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setPrinter({ ...printer, [name]: value });

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //executer la request la request POST vers l'api à travers AXIOS
            const response = await axios.post(API_PRINTER, printer)
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

        <form onSubmit={handleSubmit}>

            <Field name="PrinterId"
                label="Printer ID" placeholder="id della Stampante"
                value={printer.PrinterId}
                onChange={handleChange}
                error={error.printerId}
            />
            <Field name="category"
                label="Categoria" placeholder="categoria della Stampante"
                value={printer.category}
                onChange={handleChange}
                error={error.category}
            />
            <Field name="marque"
                label="Marca" placeholder="Marca della Stampante"
                value={printer.marca}
                onChange={handleChange}
                error={error.marque}
            />

            <Field name="model"
                label="modello" placeholder="modello della Stampante"
                value={printer.modello}
                onChange={handleChange}
                error={error.model}
            />
            <Field name="type"
                label="Typo" placeholder="typo"
                value={printer.type}
                onChange={handleChange}
                error={error.type}
            />
            <Field name="tecno"
                label="Tecnologia" placeholder="Tecno della Stampante"
                value={printer.techno}
                onChange={handleChange}
                error={error.techno}

            />

            <Field name="toner"
                label="Toner" placeholder="Toner della Stampante"
                value={printer.toner}
                onChange={handleChange}
                error={error.toner}
            />
            <Field name="location"
                label="location" placeholder="location della Stampante"
                value={printer.location}
                onChange={handleChange}
                error={error.location}
            />
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
                label="Price" placeholder="Price per i rivenditori della Stampante"
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