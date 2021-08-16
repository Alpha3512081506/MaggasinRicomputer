import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import PRODUCTSERVICE from '../services/PRODUCTSERVICE';

import { toast } from "react-toastify";
import CATEGORYSERVICE from '../services/CATEGORYSERVICE.JS';
import Select from '../form/Select';
import LOCATIONSERVICE from '../services/LOCATIONSERVICE.JS';
import axios from 'axios';
import { API_PRODUCT } from '../services/Config';
const ProductNew = props => {
    const { id = "new" } = props.match.params;
    const [product, setProduct] = useState({
        productId: "",
        marque: "",
        category: "",
        location: "",
        priceb2b: 0,
        hdd: "",
        model: "",
        note: "Scrivere Le Note:",
        processor: "",
        ram: "",
        screen: "",
        price: 0

    });
    const [errors, setErrors] = useState({
        productId: "",
        marque: "",
        category: "",
        location: "",
        priceb2b: "",
        processor: "",
        ram: "",

        screen: "",
        hdd: "",
        model: "",
        note: "",
        price: ""

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
                const response = await axios.put(API_PRODUCT + "/" + id, product)
                // const response = await PRODUCTSERVICE.editProductById(id, product)
                toast.success("il prodotto è stato modificato con successo");
                setErrors({})

                props.history.push("/productlist");

                // console.log(response)
            } else {
                console.log(product)
                const response = await PRODUCTSERVICE.addNew(product);
                toast.success("il prodotto è stato registrato con successo");
                console.log(product)
                setErrors({});


                props.history.push("/productlist");
            }
        } catch (error) {
            console.log(error.response)
            if (error.response.data.violations) {
                const apiError = {};
                error.response.data.violations.forEach(violation => {
                    apiError[violation.propertyPath] = violation.message
                });
                setErrors(apiError);
            }
        }



    }


    useEffect(() => {
        if (id !== "new") setEditing(true),
            findProduct(id)
    }, [id])



    useEffect(() => {
        const findAllCategories = async () => {
            try {
                const data = await CATEGORYSERVICE.findAll();
                setCategories(data);
                if (!product.category) {
                    setProduct({ ...product, category: data[0]["@id"] })
                }
                //console.log(data)
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

                if (!product.location) {
                    setProduct({ ...product, location: data[0]["@id"] });

                }

            } catch (error) {
                console.log(error)

            }
        }
        findLocation()
    }, []);
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
            <Field name="marque" label="Marque"
                placeholder="Nome del prodotto"
                onChange={handleChange}
                value={product.marque}
                error={errors.marque}
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

            <Field name="priceb2b" label="Prezzo B2B"
                placeholder="quantita del  prodotto" type="number"
                onChange={handleChange}
                value={product.priceb2b}
                error={errors.priceb2b}
            />
            <Field name="price" label="Prezzo "
                placeholder="Prezzo al rivenditore" type="number"
                onChange={handleChange}
                value={product.price}
                error={errors.price}
            />
            <Field name="hdd" label="HDD"
                placeholder="codice interno del  prodotto"
                onChange={handleChange}
                value={product.hdd}
                error={errors.hdd}
            />
            <Field name="processor" label="CPU"
                placeholder="processor del  prodotto"
                onChange={handleChange}
                value={product.processor}
                error={errors.processor}
            />
            <Field name="ram" label="RAM"
                placeholder="memoria ram"
                onChange={handleChange}
                value={product.ram}
                error={errors.ram}
            />
            <Field name="model" label="Model"
                placeholder="specifiche del  prodotto"
                onChange={handleChange}
                value={product.model}
                error={errors.model}
            />
            <Field name="screen" label="Schermo"
                placeholder="display del  prodotto"
                onChange={handleChange}
                value={product.screen}
                error={errors.screen}
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


    </>);
}

export default ProductNew;