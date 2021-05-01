import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import PRODUCTSERVICE from '../services/PRODUCTSERVICE';
import CategoryAdd from "./CategoryAdd";
import LocationAdd from "./LocationAdd";
import {toast} from "react-toastify";
const ProductNew =  props  => {

    const {id="new"} = props.match.params;
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
            await PRODUCTSERVICE.addNew(product);

            toast.success("il prodotto è stato registrato con successo")

        } catch (error) {
            console.log(error.response)
            toast.error("Errerur impossibile di registrare il prodotto")
        }


    }
    const [editing, setEditing]= useState(false)

   useEffect(()=>{
       if (id !== "new") setEditing(true)
   },[id])
    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            {!editing && <h1>Crea prodotto</h1>||<h1>Edit Prodotto</h1>}
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
            <div className="form-group">
                <label htmlFor="sel1">Category:</label>
                <select className="form-control" id="sel1">
                    <option>categorie1</option>
                    <option>categorie2</option>
                    <option>categorie3</option>
                    <option>categorie4</option>
                </select>
            </div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus"></i></button>
            <Field name="location" label="Location"
                placeholder="luogo di stockaggio"
                onChange={handleChange}
                value={product.location}
                error={errors.location}
            />
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal2"><i className="fa fa-plus"></i></button>

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

    </>);
}

export default ProductNew;