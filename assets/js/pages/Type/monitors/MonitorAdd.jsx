import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../../form/Field';
import Select from '../../../form/Select';
import CATEGORYSERVICE from '../../../services/CATEGORYSERVICE.JS';
import MONITORSERVICE from '../../../services/MONITORSERVICE.JS';
import LOCATIONSERVICE from '../../../services/LOCATIONSERVICE.JS';
import { toast } from 'react-toastify';


const MonitorAdd = (props) => {
    const { id = "new" } = props.match.params;
    const [monitor, setMonitor] = useState({
        productId: "",
        category: "",
        marca: "",
        model: "",
        grade: "",
        display: "",
        price: 0,
        priceb2b: 0,
        location: ""
    });
    const [error, setError] = useState({
        productId: "",
        category: "",
        marca: "",
        model: "",
        grade: "",
        display: "",
        price: "",
        priceb2b: "",
        location: ""
    });
    const [editing, setEditing] = useState(false);
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setMonitor({ ...monitor, [name]: value });
    }
    useEffect(() => {
        const findAllCategories = async () => {
            try {
                const data = await CATEGORYSERVICE.findAll();
                setCategory(data);
                if (!monitor.category) setMonitor({ ...monitor, category: data[0]["@id"] })

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
                if (!monitor.location) setMonitor({ ...monitor, location: data[0]["@id"] })



            } catch (error) {
                console.log(error)

            }
        }
        findLocation()
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //executer la request la request POST vers l'api à travers AXIOS
            if (editing) {
                console.log(monitor)
                const response = await MONITORSERVICE.editMonitorById(id, monitor)

                toast.success("il monitor è stato modificato")
                console.log(response)


            } else {
                const response = await MONITORSERVICE.addNewMonitor(monitor);
                console.log(response.data)
                toast.success("il monitor è stato registrato")
                console.log(monitor);
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
    useEffect(() => {
        if (id !== "new") {
            setEditing(true)

            const fetchData = async (id) => {
                try {
                    //const data = await axios.get(API_DESKTOP + "/" + id)
                    const data = await MONITORSERVICE.findMonitorById(id)
                    const { productId, category, marca, model, display, location, grade, note, price, priceb2b } = data
                    setMonitor({ productId, category, marca, model, display, location, grade, note, price, priceb2b })
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
        {!editing && <h2>AGGIUNGI UN MONITOR</h2> || <h1>MODIFICA IL MONITOR </h1>}
        <form onSubmit={handleSubmit}>
            <Field name="productId"
                label="ProductId" placeholder="l'id del product"
                value={monitor.productId} onChange={handleChange}
                error={error.productId}
            />

            <Select
                name="category"
                label="Category"
                value={monitor.category}
                onChange={handleChange}
                error={error.category}
            >
                {category.map(category => <option key={category["@id"]} value={category["@id"]}>
                    {category.categoryName}</option>)}
            </Select>

            <Field name="marca"
                label="Marca" placeholder="Marca del product"
                value={monitor.marca} onChange={handleChange}
                error={error.marca}
            />
            <Field name="model"
                label="Modello" placeholder="Modello del product"
                value={monitor.model} onChange={handleChange}
                error={error.model}
            />
            <Field name="display"
                label="Schermo" placeholder="display del producto"
                value={monitor.display} onChange={handleChange}
                error={error.display}
            />

            <Select
                name="location"
                label="Luogo"
                value={monitor.location}
                onChange={handleChange}
                error={error.location}
            >
                {location.map(location => <option key={location["@id"]} value={location["@id"]}>
                    {location.locationName}</option>)}
            </Select>


            <Field name="grade"
                label="Grado" placeholder="Grado del product"
                value={monitor.grade} onChange={handleChange}
                error={error.grade}
            />
            <Field name="note"
                label="Note" placeholder="Note"
                value={monitor.note} onChange={handleChange}
                error={error.note}
            />
            <Field name="price"
                label="Prezzo" placeholder="Prezzo"
                value={monitor.price} onChange={handleChange}
                error={error.price}
            />
            <Field name="priceb2b"
                label="Prezzo B2B" placeholder="Prezzo"
                value={monitor.priceb2b} onChange={handleChange}
                error={error.priceb2b}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Crea il Prodotto</button>
                <Link to={"/types/monitors"}> Vai alla lista dei monitor</Link>
            </div>

        </form>
    </>);
}


export default MonitorAdd