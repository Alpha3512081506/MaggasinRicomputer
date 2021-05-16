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
import GROUPSERVICE from "../services/GROUPSERVICE";
const ProductNew = props => {

    const { id = "new" } = props.match.params;
    // const { id } = props.match.params;


    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        category: "",
        location: "",
        currentQuantity: 1,
        alertQuanty: 0,
        customField1: "",
        customField2: "",
        customField3: "",
        note: "",
        group: ""
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
        group: ""
    });
    const [editing, setEditing] = useState(false)
    const [categories, setCategories] = useState([]);
    const [locations, setLocation] = useState([]);
    const [group, setGroup] = useState([]);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setProduct({ ...product, [name]: value })
        //console.log(product)
        // const { name, value, type } = currentTarget;
        /*  const currentProductFormData = Object.assign({}, group, {
             [name]: type === "number" ? parseInt(value, 10) : value
         });
         console.log(currentProductFormData);
         setProduct(currentProductFormData) */

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resposne = await PRODUCTSERVICE.addNew(product);
            toast.success("il prodotto è stato registrato con successo")

            console.log(resposne)
        } catch (error) {
            console.log(error)
        }


    }


    useEffect(() => {
        if (id !== "new") setEditing(true)
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
    const findGroup = async () => {
        try {
            const data = await GROUPSERVICE.findAll();
            setGroup(data)
        } catch (e) {
            console.log(e.data)

        }
    }
    useEffect(() => { findGroup() }, [])


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
                        value="product.category['@id']"
                        onChange={handleChange}
                        error={errors.category}
                    >
                        {categories.map(category => <option key={category["@id"]}
                            value={category["@id"]}>{category.categoryName}</option>)}
                    </Select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus"></i></button>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <Select label="Dove?"
                        name="storage"
                        value="product.storage"
                        onChange={handleChange}
                        error={errors.storage}
                    >
                        <option value="Laboratorio">Laboratorio</option>
                        <option value="Negoggio">Negoggio</option>
                        <option value="Cabanone">Cabanone</option>
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
                        {locations.map(location => <option key={location["@id"]}
                            value={location["@id"]}>{location.locationName}</option>)}
                    </Select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal2"><i className="fa fa-plus"></i></button>

                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <Select label="Grouppo"
                        name="group"
                        value="group.group['@id']"
                        onChange={handleChange}
                        error={errors.group}
                    >
                        {group.map(group => <option key={group["@id"]}
                            value={group["@id"]}>{group.nameGroup}</option>)}
                    </Select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus"></i></button>
                </div>
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
            <Field name="customField1" label="Marque"
                placeholder="marca del  prodotto"
                onChange={handleChange}
                value={product.customField1}
                error={errors.customField1}
            />
            <Field name="customField2" label="Model"
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
            <Field name="note" label="Note" type="textarea"
                placeholder="note sul  prodotto"
                onChange={handleChange}
                value={product.note}
                error={errors.note}
            />
            <div className="form-group d-flex justify-content-between align-items-center">
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