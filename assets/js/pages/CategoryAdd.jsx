import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import CATEGORYSERVICE from '../services/CATEGORYSERVICE.JS';
import { toast } from "react-toastify";
const CategoryAdd = (props) => {
    // const {id ="new"}=props.match.params ;
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
            const response = await CATEGORYSERVICE.addNew(category);
            setCategory(response);
           // console.log(data);
            toast.success("La Categoria è stata registrato")
            setCategory({})
        } catch (error) {
            if (error.response.data.violations){
               const apiErr = {};
               error.response.data.violations.forEach(violation=>{
                   apiErr[violation.propertyPath]= violation.message ;
               })
                setErrors(apiErr)
            }

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
                value={category.categoryName}
                error={errors.categoryName}
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