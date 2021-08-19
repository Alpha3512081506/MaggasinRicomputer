import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { API_LOCATION } from '../../services/Config';
const LocationProducts = (props) => {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const findAll = async (id) => {
            try {
                const data = await axios.get(API_LOCATION + "/" + props.match.params.id)
                console.log(data)
                setProduct(data);
                setLoading(false)
                toast.success("connessione al server effettuata ✔")
            } catch (error) {
                toast.error("Devi effettuare il login per accedere alle risorse");
            }

        }
        findAll(props.match.params.id)
    }, [props.match.params.id]);
    return (<>
        <h1>{console.log(products.data.products[0])}</h1>
    </>);
}

export default LocationProducts;