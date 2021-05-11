import React, {useState} from 'react';
import Field from "../form/Field";
import axios from "axios";
const Product = (props) => {
    const [product, setProduct] = useState({
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

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setProduct({ ...product, [name]: value })


    }
    const handleSubmit= async (event)=>{
       event.preventDefault()
        try {
               const response= await axios.post("https://localhost:8000/api/products",product)
            console.log(response.data)
        }catch (error) {
            console.log(error.response)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Field name="productId"
                       label="ProductID" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.productId}
                       error={errors.productId}
                />
                <Field name="productName"
                       label="ProductName" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.productName}
                       error={errors.productName}
                />
                <Field name="category"
                       label="Category" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.category.categoryName}
                       error={errors.category}
                />
                <Field name="location"
                       label="Location" placeholder="location del prodotto"
                       onChange={handleChange}
                       value={product.location}
                       error={errors.location}
                />
                <Field name="currentQuantity"
                       label="QtityCurent" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.currentQuantity}
                       error={errors.currentQuantity}
                />
                <Field name="alertQuantity"
                       label="QtityAlert" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.alertQuantity}
                       error={errors.alertQuantity}
                />
                <Field name="marque"
                       label="Marque" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.marque}
                       error={errors.marque}
                />
                <Field name="model"
                       label="Model" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.model}
                       error={errors.model}
                />
                <Field name="specify"
                       label="Specify" placeholder="id del prodotto"
                       onChange={handleChange}
                       value={product.specify}
                       error={errors.specify}
                />
                <Field name="note"
                       label="Note  del prodotto"
                       onChange={handleChange}
                       value={product.note}
                       error={errors.note}
                />
                <button type="submit" className="btn-outline-primary">Creer</button>

            </form>
         </>);
}

export default Product