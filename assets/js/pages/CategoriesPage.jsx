import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CategoryPage = (props) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get("https://localhost:8000/api/categories")
            .then(response => response.data['hydra:member'])
            .then(data => setCategories(data))
            ;
    }, []);
    const [currentPage, setCurrentPage] = useState(1);
    const handleDelete = (id) => {
        const originalCategories = [...categories]
        axios.delete("https://localhost:8000/api/categories/" + id)
            .then(response => setCategories(categories.filter(category => category.id !== id)))
            .catch(error => {
                setCategories(originalCategories);
                console.log(error.response)
            });
    };
    const itemPerPage = 2;
    const PpageCount = Math.ceil(categories.length / itemPerPage);

    const pages = [];
    for (let index = 0; index < PpageCount; index++) {
        pages.push(index);

    }

    const handleChangPage = (page) => {
        setCurrentPage(page);
    }

    return (<>
        <h1>List des cateogories</h1>
        <table className="table table-hover table-border">
            <thead>
                <tr>
                    <th></th>
                    <th>ProductName</th>



                </tr>

            </thead>
            <tbody>
                {categories.map(category => (
                    <tr key={category.id}><td>
                        <button className="btn btn-primary"><i className="fa fa-search"></i></button>
                        <button className="btn btn-primary"><i className="fa fa-pencil"></i></button>
                        <button onClick={() => handleDelete(category.id)}
                            className="btn btn-primary"><i className="fa fa-trash"></i></button>
                    </td>
                        <td>{category.categoryName}
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
        </table>

    </>)
}

export default CategoryPage;