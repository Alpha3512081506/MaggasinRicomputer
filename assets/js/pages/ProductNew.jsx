import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import PRODUCTSERVICE from '../services/PRODUCTSERVICE';
import CategoryAdd from "./CategoryAdd";
import LocationAdd from "./LocationAdd";
import { toast } from "react-toastify";
import Alert from '../components/Alert';
import CATEGORYSERVICE from '../services/CATEGORYSERVICE.JS';
import Select from '../form/Select';
import LOCATIONSERVICE from '../services/LOCATIONSERVICE.JS';
const ProductNew = props => {

    const { id = "new" } = props.match.params;
    // const { id } = props.match.params;


    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        category: "",
        location: "",
        currentQuantity: 1,
        alertQuantity: 0,
        marque: "",
        model: "",
        specify: "",
        note: ""
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setProduct({ ...product, [name]: value })


    }
    const [errors, setErrors] = useState({
        productId: "",
        productName: "",
        category: "",
        location: "",
        currentQuantity: "",
        alertQuantity: "",
        marque: "",
        model: "",
        specify: "",
        note: ""
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(product);
        try {
           const response= await PRODUCTSERVICE.addNew(product);
            setProduct(response)
            toast.success("il prodotto è stato registrato con successo")

        } catch (error) {
            if (error.response.data.violations){
                const apiErr = {};
                error.response.data.violations.forEach(violation=>{
                    apiErr[violation.propertyPath]= violation.message ;
                })
                setErrors(apiErr)
            }
            console.log(error.response)
            toast.error("Errerur impossibile di registrare il prodotto")
        }


    }
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if (id !== "new") setEditing(true)
    }, [id])

    const [categories, setCategories] = useState([]);
    const findAllCategories = async () => {
        try {
            const data = await CATEGORYSERVICE.findAll();
            setCategories(data)
            console.log(data)
        } catch (error) {
            console.log(error);
            toast.error("Erreur de chargement des categories")
        }
    }
    useEffect(() => { findAllCategories() }, []);
    const [locations, setLocation] = useState([])
    const findLocation = async () => {
        try {
            const data = await LOCATIONSERVICE.findAll()
            setLocation(data);
            console.log(data)
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => { findLocation() }, []);
    return (<>
        {!editing && <h3 className="text-center">Crea prodotto</h3> || <h3 className="text-center">Edit Prodotto</h3>}
        <div className="mb-3 d-flex justify-content-between align-items-center">

            <button className="btn btn-outline-success" ><i className="fa fa-camera-retro">Scan CodeBarre</i></button>
            <button className="btn btn-outline-success" ><i className="fa fa-camera-retro">Close Camera </i></button>
        </div>
        <form onSubmit={handleSubmit} className="form-horizontal">
            <Field name="productId"
                label="ProductID" placeholder="id del prodotto"
                onChange={handleChange}
                value={product.productId}
                error={errors.productId}
            />
            <Field name="productName" label="ProductName"
                placeholder="Nome del prodotto"
                onChange={handleChange}
                value={product.productName}
                error={errors.productName}
            />
            <div className="row">
                <div className="col-10">
                    <Select label="Category"
                        name="category"
                        value="product.category"
                        onChange={handleChange}
                        error={errors.category}
                    >
                        {categories.map(category => <option key={category.id}
                            value={category.id}>{category.categoryName}</option>)}
                    </Select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus"></i></button>
                </div>
            </div>

            <div className="row">
                <div className="col-10">
                    <Select label="Location"
                        name="location"
                        value="product.location"
                        onChange={handleChange}
                        error={errors.location}
                    >
                        {locations.map(location => <option key={location.id}
                            value={location.id}>{location.locationName}</option>)}
                    </Select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal2"><i className="fa fa-plus"></i></button>

                </div>
            </div>

            <Field name="currentQuantity" label="CurrentQuantity"
                placeholder="quantita del  prodotto" type="number"
                onChange={handleChange}
                value={product.currentQuantity}
                error={errors.currentQuantity}
            />
            <Field name="alertQuantity" label="AlertQuantity"
                placeholder="quantita del  prodotto" type="number"
                onChange={handleChange}
                value={product.alertQuantity}
                error={errors.alertQuantity}
            />
            <Field name="marque" label="Marque"
                placeholder="marca del  prodotto"
                onChange={handleChange}
                value={product.marque}
                error={errors.marque}
            />
            <Field name="model" label="Model"
                placeholder="modello  del  prodotto"
                onChange={handleChange}
                value={product.model}
                error={errors.model}
            />
            <Field name="specify" label="Specifiche"
                placeholder="specifiche del  prodotto"
                onChange={handleChange}
                value={product.specify}
                error={errors.specify}
            />
            <Field name="note" label="Note" type="textarea"
                placeholder="note sul  prodotto"
                onChange={handleChange}
                value={product.note}
                error={errors.note}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-outline-success ">Crea il Prodotto</button>
                <Link to="/productlist"><button className="btn btn-outline-success ">Vai alla lista dei prodotti</button>
                </Link>

            </div>
        </form>
        <div className="modal fade" id="myModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <CategoryAdd />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>

        <div className="modal fade" id="myModal2">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <LocationAdd />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
        <Alert />

    </>);
}

export default ProductNew;