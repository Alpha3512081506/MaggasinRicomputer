import React, { useEffect, useState } from 'react';
import TableLoader from '../../loader/TableLoader';

import CATEGORYSERVICEJS from '../../services/CATEGORYSERVICE.JS';
const CategoryProducts = (props) => {
    const CategoryId = props.match.params;
    console.log(CategoryId)
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1- je recupere ma category
    const findCategory = async (id) => {
        try {
            const data = await CATEGORYSERVICEJS.findCategoryById(CategoryId);
            setCategory(data);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    }
    useEffect(() => { findCategory() }, []);
    // 2-je met à jour mon state
    // 3-j'active cette operation au chargement de la page
    //j'affice les produits dans la category

    return (<>
        <h1>TestCategoryProducts</h1>

    </>);
}

export default CategoryProducts;