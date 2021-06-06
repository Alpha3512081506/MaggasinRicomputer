import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import PRODUCTSERVICE from '../services/PRODUCTSERVICE';

import { toast } from "react-toastify";
import Alert from '../components/Alert';
import CATEGORYSERVICE from '../services/CATEGORYSERVICE.JS';
import Select from '../form/Select';
import LOCATIONSERVICE from '../services/LOCATIONSERVICE.JS';
import axios from 'axios';
import { API_PRODUCT } from '../services/Config';
const ProductNew = props => {
    const { id = "new" } = props.match.params;
    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        category: "Select la Categoria",
        location: "Select il Luogo",
        currentQuantity: 0,
        alertQuanty: 0,
        customField1: "",
        customField2: "",
        customField3: "",
        note: "Scrivere Le Note:",

    });
    const [errors, setErrors] = useState({
        productId: "",
        productName: "",
        category: "",
        location: "",
        currentQuantity: "",
        alertQuanty: "",
        customField1: "",
        customField2: "",
        customField3: "",
        note: "",

    });
    const [editing, setEditing] = useState(false)
    const [categories, setCategories] = useState([]);
    const [locations, setLocation] = useState([]);


    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setProduct({ ...product, [name]: value })

    }
    const findProduct = async id => {
        try {
            const data = await PRODUCTSERVICE.finProductdById(id)
            setProduct(data)
        } catch (error) {
            console.log("il ya une erreur")
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (editing) {
                const response = await axios.put(API_PRODUCT + "/" + + id, product)
                // const response = await PRODUCTSERVICE.editProductById(id, product)
                toast.success("il prodotto è stato modificato con successo")
                console.log(response)
            } else {
                await PRODUCTSERVICE.addNew(product);
                toast.success("il prodotto è stato registrato con successo")
            }
        } catch (error) {
            console.log(error.response)
        }



    }


    useEffect(() => {
        if (id !== "new") setEditing(true),
            findProduct(id)
    }, [id])


    const findAllCategories = async () => {
        try {
            const data = await CATEGORYSERVICE.findAll();
            setCategories(data)
            //console.log(data)
        } catch (error) {
            console.log(error);
            toast.error("Erreur de chargement des categories")
        }
    }
    useEffect(() => { findAllCategories() }, []);
    const findLocation = async () => {
        try {
            const data = await LOCATIONSERVICE.findAll()
            setLocation(data);
            //console.log(data)
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
        <form onSubmit={handleSubmit} className="form-horizontal" >
            <Field name="productId"
                label="ProductID" placeholder="id del prodotto"
                onChange={handleChange}
                value={product.productId}
                error={errors.productId}
            />
            <Field name="productName" label="Grado"
                placeholder="Nome del prodotto"
                onChange={handleChange}
                value={product.productName}
                error={errors.productName}
            />
            <div className="row d-flex align-content-between align-items-center">
                <div className="col-10">
                    <Select label="Categoria"
                        name="category"
                        value="product.category['@id']"
                        onChange={handleChange}
                        error={errors.category}
                    >
                        {categories.map(category => <option key={category["@id"]}
                            value={category["@id"]}>{category.categoryName}</option>)}
                    </Select>
                </div>
                {/* <div className="col-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus"></i></button>
                </div> */}
            </div>
            <div className="row d-flex align-content-between align-items-center">
                <div className="col-10">
                    <Select label="Location"
                        name="location"
                        value="product.location['@id']"
                        onChange={handleChange}
                        error={errors.location}
                    >
                        {locations.map(location => <option key={location["@id"]}
                            value={location["@id"]}>{location.locationName}</option>)}
                    </Select>
                </div>
                {/* <div className="col-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal2"><i className="fa fa-plus"></i></button>

                </div> */}
            </div>

            <Field name="currentQuantity" label="Prezzo"
                placeholder="quantita del  prodotto" type="number"
                onChange={handleChange}
                value={product.currentQuantity}
                error={errors.currentQuantity}
            />
            <Field name="alertQuanty" label="Prezzo minimale"
                placeholder="quantita del  prodotto" type="number"
                onChange={handleChange}
                value={product.alertQuanty}
                error={errors.alertQuanty}
            />
            <Field name="customField1" label="Marca"
                placeholder="marca del  prodotto"
                onChange={handleChange}
                value={product.customField1}
                error={errors.customField1}
            />
            <Field name="customField2" label="Modello"
                placeholder="modello  del  prodotto"
                onChange={handleChange}
                value={product.customField2}
                error={errors.customField2}
            />
            <Field name="customField3" label="Specifiche"
                placeholder="specifiche del  prodotto"
                onChange={handleChange}
                value={product.customField3}
                error={errors.customField3}
            />
            <div className="form-group">
                <label htmlFor="Note">Note:</label>
                <textarea className="form-control" rows="5" id="note"
                    name="note"
                    onChange={handleChange}
                    value={product.note}
                    error={errors.note}
                >

                </textarea>
            </div>
            <div className="form-group d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-outline-success ">Crea il Prodotto</button>
                <Link to="/productlist"><button className="btn btn-outline-success ">Vai alla lista dei prodotti</button>
                </Link>

            </div>
        </form>
        {/*   <div className="modal fade" id="myModal">
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
        </div> */}
        <Alert />

    </>);
}

export default ProductNew;