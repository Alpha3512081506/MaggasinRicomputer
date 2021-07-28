import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_CATEGORY } from '../../services/Config';

const CategoryProducts = (props) => {
    const CategoryId = props.match.params.id;
    const [state, setstate] = useState({});
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1- je recupere ma category
    const findCategory = async (id) => {
        try {
            const resultat = await axios.get(API_CATEGORY + "/" + CategoryId);
            setstate(resultat.data);
            console.log(resultat.data)
            setLoading(false);
            console.log(state)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        findCategory(CategoryId)
    }, [CategoryId])
    // 2-je met à jour mon state
    // 3-j'active cette operation au chargement de la page
    //j'affice les produits dans la category

    return (<>
        <div className="card">
            <div className="card-header">{category.categoryName}</div>
            <div className="card-body">
                <table className="table table-responsive table-hover table-bordered table-sm w-100" id="table-to-xls">
                    <thead className="thead-dark " >
                        <tr className="w-100">
                            <th></th>
                            <th >InternoId</th>
                            <th >ProductId</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Modello</th>
                            <th>C.P.U</th>
                            <th>Grado</th>
                            <th>Luogo</th>
                            <th>Prezzo</th>
                            <th>Prezzo al Rivenditore</th>
                            <th>codice interno</th>


                            <th>Note</th>

                        </tr>

                    </thead>
                    <tbody id="myTable">
                        <tr>
                            <td>
                                <Link to={"/"}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                                <button className="btn btn-outline-danger "><i className="fa fa-trash"></i></button>


                            </td>

                            <td>1</td>
                            <td>qweryb35</td>
                            <td>Desktop</td>
                            <td>Dell</td>
                            <td>EliteBook</td>
                            <td>i5 </td>
                            <td>Grado A</td>
                            <td>Capannone</td>
                            <td>0&euro;</td>
                            <td>0&euro;</td>
                            <td></td>

                            <td><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed quisquam sit obcaecati nisi dolorum ea, nam qui, deleniti quia molestias a voluptatem explicabo cum aspernatur. Voluptates laboriosam error quaerat vel?</p></td>

                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="11">
                                <p>Pagination</p>

                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="card-footer">Footer</div>
        </div>


    </>);
}

export default CategoryProducts;