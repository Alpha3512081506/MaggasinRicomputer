import React, { useState } from 'react';
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
       const handleSubmit = async (event) => {
              event.preventDefault()
              try {
                     const response = await axios.post("https://localhost:8000/api/products", product)
                     console.log(response.data)
              } catch (error) {
                     console.log(error.response)
              }

       }

       return (
              <>
                     <h1>Test</h1>


              </>);
}

export default Product