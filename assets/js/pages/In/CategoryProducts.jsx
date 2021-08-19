import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { API_CATEGORY } from '../../services/Config';

const CategoryProducts = (props) => {
    const [products, setProduct] = useState([])
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1- je recupere ma category

    useEffect(() => {
        const findCategory = async (id) => {
            try {
                const resultat = await axios.get(API_CATEGORY + "/" + props.match.params.id);
                setCategory(resultat.data)
                setProduct(resultat.data.products)

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

    const handleDelete = async (id) => {
        const originalProduct = [...products];
        setProduct(products.filter(product => product.id !== id));
        try {
            await APISERVICE.deleteId(id)
            toast.success("il prodotto è stato cancellato")
        } catch (error) {
            setProduct(originalProduct);
            toast.error("si è verificato un errore il prodotto non è stato cancellato");
        }

    }
    return (<>
        <div className="card card-primary">
            {console.log(products)}



            <div className="card-header"><div className="alert alert-primary" role="alert ">
                <h4 className="display-5 text-center text-justify">CATEGORIA : {category.categoryName} </h4>
            </div>

            </div>
            <div className="card-body">
                {loading && <Loading />}
                {!loading && products.length > 0 && <table className="table table-responsive table-hover table-bordered table-sm w-100" id="table-to-xls">
                    <thead className="thead-dark " >
                        <tr className="w-100">
                            <th></th>

                            <th >ProductId</th>
                            <th>Marca</th>
                            <th>Luogo</th>
                            <th>CPU</th>
                            <th>HDD/SSD</th>
                            <th>RAM</th>
                            <th>SCHERMO</th>
                            <th>Note</th>

                        </tr>

                    </thead>
                    <tbody id="myTable">
                        {products.map(product => <tr key={product.id}><td>
                            <Link to={"/productlist/" + product.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                            <button onClick={() => handleDelete(product.id)} className="btn btn-outline-danger "><i className="fa fa-trash"></i></button>


                        </td>

                            <td>{product.productId}</td>
                            <td>{product.marque}</td>
                            <td>{product.location.locationName}</td>
                            <td>{product.processor}</td>
                            <td>{product.hdd}</td>
                            <td>{product.ram} </td>
                            <td>{product.screen} </td>
                            <td>{product.note}</td>

                        </tr>)}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td>test</td>
                        </tr>
                    </tfoot>
                </table> || <h2>NON SI SONO PRODOTTI REGISTRATI IN QUESTA CATEGORIA</h2>}




            </div>
            <div className="card-footer">Footer</div>
        </div>


    </>);
}

export default CategoryProducts;