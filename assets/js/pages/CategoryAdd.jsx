import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import CATEGORYSERVICE from '../services/CATEGORYSERVICE.JS';
import { toast } from "react-toastify";
const CategoryAdd = (props) => {
    // const {id ="new"}=props.match.params ;
    console.log(props);
    //  console.log(id);

    const [category, setCategory] = useState({
        categoryName: "",
    });
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCategory({ ...category, [name]: value })
    }
    const [errors, setErrors] = useState({
        categoryName: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await CATEGORYSERVICE.addNew(category);
            setCategory(data);
           // console.log(data);
            toast.success("La Categoria è stata registrato")
        } catch (error) {
            console.log(error.response)
            toast.error("Erreur! impossibile di registrare la categoria")
        }
    }
    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h3>Crea Categoria</h3>
            <button className="btn btn-outline-success">Scan CodeBarre</button>
        </div>
        <form onSubmit={handleSubmit}>
            <Field name="categoryName"
                label="Category Name" placeholder="nome della categoria"
                onChange={handleChange}
                value={category.name}
                error={errors.name}
            />


            <div className="form-group">
                <button type="submit" className="btn btn-outline-success ">Crea la Categoria</button>
                <Link to="/categorylist"><button className="btn btn-outline-success ">Vai alla lista delle categorie</button>
                </Link>

            </div>
        </form>
    </>);
}

export default CategoryAdd;