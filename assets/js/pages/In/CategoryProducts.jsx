import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_CATEGORY } from '../../services/Config';

const CategoryProducts = (props) => {
    const CategoryId = props.match.params.id;
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1- je recupere ma category

    useEffect(() => {
        const findCategory = async (id) => {
            try {
                const resultat = await axios.get(API_CATEGORY + "/" + props.match.params.id);
                setCategory(resultat.data)

                // console.log(resultat.data.products.length)
                setLoading(false);


            } catch (error) {
                console.log(error);
            }
        }
        findCategory(props.match.params.id)
    }, [props.match.params.id])
    // 2-je met à jour mon state
    // 3-j'active cette operation au chargement de la page
    //j'affice les produits dans la category

    return (<>
        <div className="card card-primary">
            {console.log(category.products)}
            <div className="card-header"><div className="alert alert-primary" role="alert ">
                <h4 className="display-5 text-center text-justify">CATEGORIA : {category.categoryName} </h4>
            </div>

            </div>
            <div className="card-body">

                <ul>
                    <li>{category.categoryName}</li>
                    <li>{category.id}</li>

                </ul>

            </div>
            <div className="card-footer">Footer</div>
        </div>


    </>);
}

export default CategoryProducts;