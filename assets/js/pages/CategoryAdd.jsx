import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Field from '../form/Field';
import CATEGORYSERVICE from '../services/CATEGORYSERVICE.JS';
import { toast } from "react-toastify";
import axios from 'axios';
const CategoryAdd = (props) => {
    const { id = "new" } = props.match.params;

    const [category, setCategory] = useState({
        categoryName: "",
    });
    const [editing, setEditing] = useState(false);
    const findCategory = async id => {
        try {
            const response = await CATEGORYSERVICE.findCategoryById(id);
            setCategory(response)
            console.log(response)
        } catch (error) {
            console.log(error.data)
        }
    }
    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
        }
        findCategory(id)

    }, [id])
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
            if (editing) {
                const response = await axios.put("https://localhost:8000/api/categories/" + id, category)
                toast.success("la categoria è stata modificata")
                console.log(response.data)

            } else {
                const response = await CATEGORYSERVICE.addNew(category);
                setCategory(response);
                // console.log(data);
                toast.success("La Categoria è stata registrata")
            }
        } catch (error) {
            if (error.response.data.violations) {
                const apiErr = {};
                error.response.data.violations.forEach(violation => {
                    apiErr[violation.propertyPath] = violation.message;
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