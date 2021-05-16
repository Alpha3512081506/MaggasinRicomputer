import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CATEGORYSERVICE from '../services/CATEGORYSERVICE.JS';
import NestedProduct from "../components/NestedProduct";
import TableLoader from '../loader/TableLoader';
const CategoryPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const findAll = async () => {
        try {
            const data = await CATEGORYSERVICE.findAll();
            setCategories(data)
            setLoading(false)
            toast.success("connessione al server effettuata ✔ ")
        } catch (error) {
            toast.error("Devi effettuare il login per accedere alle risorse")

        }
    }
    useEffect(() => { findAll() }, []);
    const [currentPage, setCurrentPage] = useState(1);
    const handleDelete = async (id) => {
        const originalCategories = [...categories]
        setCategories(categories.filter(category => category.id !== id))

        try {
            await CATEGORYSERVICE.deleteId(id)
            toast.success("La categoria  è stato cancellata");
        } catch (error) {
            setCategories(originalCategories);
            toast.error("Impossible di cancellare la categoria")
        };


    };
    const itemPerPage = 2;
    const pageCount = Math.ceil(categories.length / itemPerPage);

    const pages = [];
    for (let index = 0; index < pageCount; index++) {
        pages.push(index);

    }

    const handleChangPage = (page) => {
        setCurrentPage(page);
    }
    const handleNestedShow = () => {
        console.log("handleNested")
    }


    return (<>

        <div className="mb-3 d-flex justify-content-between align-items-center">

            <Link to="/categorylist/:id" className="btn btn-outline-success">crea Categoria</Link>
        </div>
        <h3> Cateogories Liste</h3>
        {loading && <TableLoader />}
        {!loading && <table className="table table-hover table-border">
            <thead>
                <tr>
                    <th></th>
                    <th>CategoryName</th>
                    <th>ProductCount</th>

                </tr>

            </thead>
            <tbody>

                {categories.map(category => (
                    <tr key={category.id}><td>
                        <button className="btn btn-primary"><i className="fa fa-pencil"></i></button>
                        <button onClick={() => handleDelete(category.id)}
                            className="btn btn-danger"><i className="fa fa-trash"></i></button>
                    </td>
                        <td>{category.categoryName}
                        </td>

                        <td><button className="badge badge-info" >{category.products.length}</button>

                        </td>
                    </tr>

                ))}
                <tr>
                    <td colSpan="0">
                        <div>
                            <ul className="pagination pagination-sm center">

                                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                                    <button className="page-link " onClick={() => handleChangPage(currentPage - 1)}>&laquo;</button>
                                </li>
                                {pages.map(page =>
                                    <li key={page} className={"page-item" + (currentPage === page && " active")}>
                                        <button className="page-link" onClick={() => handleChangPage(page)}>{page}</button>
                                    </li>)}


                                <li className="page-item">
                                    <button className="page-link" onClick={() => handleChangPage(currentPage + 1)}>&raquo;</button>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>}


    </>)
}

export default CategoryPage;