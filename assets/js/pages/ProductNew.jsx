import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import APISERVICE from '../services/APISERVICE';
import CategoryAdd from "./CategoryAdd";
import LocationAdd from "./LocationAdd";
const ProductNew = ({ props }) => {
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
        try {
            const data = APISERVICE.addNew("products", product);
            console.log(data);
        } catch (error) {
            console.log(error.response)
        }


    }
    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Crea prodotto</h1>
            <button className="btn btn-outline-success" ><i className="fa fa-camera-retro">Scan CodeBarre</i></button>
            <button className="btn btn-outline-success" ><i className="fa fa-camera-retro">Close Camera </i></button>

            <Link to="/productadd" className="btn btn-outline-success">crea prodotto</Link>
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
            <Field name="category" label="Category"
                placeholder="Categoria del prodotto"
                onChange={handleChange}
                value={product.category}
                error={errors.category}
            />
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus"></i></button>
            <Field name="location" label="Location"
                placeholder="luogo di stockaggio"
                onChange={handleChange}
                value={product.location}
                error={errors.location}
            />
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal2"><i class="fa fa-plus"></i></button>

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
                <Link to=""><button className="btn btn-outline-success ">Vai alla lista dei prodotti</button>
                </Link>

            </div>







        </form>
        <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <CategoryAdd />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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

    </>);
}

export default ProductNew;