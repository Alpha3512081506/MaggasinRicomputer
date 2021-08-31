import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import $ from 'jquery';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import APISERVICE from '../services/PRODUCTSERVICE';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ExcelExporter from '../components/ExcelExporter';
import ExportToExcel from '../services/ExportToExcel';


const ProductList = (props) => {
    const [products, setProduct] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [itemsPerPage, setItemPerPage] = useState(10);

    let [dataScan, setDataScan] = useState([]);
    const findAll = async () => {
        try {
            const data = await APISERVICE.findAll();
            setProduct(data);
            setLoading(false)
            toast.success("connessione al server effettuata ✔")
        } catch (error) {
            toast.error("Devi effettuare il login per accedere alle risorse");
        }

    }
    useEffect(() => { findAll() }, []);
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

    // console.log(PaginatedProduct)
    // const itemsPerPage = 6;
    const filteredProducts = products.filter(product =>
        product.productId.toLowerCase().includes(search.toLowerCase())
        || product.ram.toLowerCase().includes(search.toLowerCase())
        || product.location.locationName.toLowerCase().includes(search.toLowerCase())
        || product.processor.toLowerCase().includes(search.toLowerCase())
        || product.hdd.toLowerCase().includes(search.toLowerCase())
        || product.model.toLowerCase().includes(search.toLowerCase())
        || product.note.toLowerCase().includes(search.toLowerCase())
        || product.screen.toLowerCase().includes(search.toLowerCase())
        || product.marque.toLowerCase().includes(search.toLowerCase())

    )


    const handlePageChange = page => { setCurrentPage(page) }
    const paginatedProducts = Pagination.getData(
        filteredProducts, currentPage, itemsPerPage)
    //console.log(paginatedProducts)
    //ici je dois gerer le sccan en changeant const par let ou var

    const fileName = "NOTEBOOK EXCEL DATI";

    const handleChangeItemsPerPage = (event) => {
        setItemPerPage(event.currentTarget.value)
        console.log(itemsPerPage)
    }
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1)
    }


    return (
        <>
            <div className="d-flex justify-content-between">
                <h5 className="font-italic text text-success">Gestisci Computer Notebook</h5>
                <Link to={"/productlist/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>

            </div>
            <hr />
            <input className="form-control" id="myInput" type="text" placeholder="Search.." value={search} onChange={handleSearch} />
            <br></br>
            <div className=" d-flex align-items-center justify-content-between">
                <div className="alert alert-primary" role="alert ">
                    <h4 className="display-5 text-center text-justify">Filtro Totale : {paginatedProducts.length} per {filteredProducts.length} </h4>
                </div>

                <div className="btn-group">
                    <button type="button" className="btn btn-outline-success ">IMPORTA</button>
                    {<ExportToExcel apiData={paginatedProducts} fileName={fileName} />}
                </div>
            </div>

            <h3 className="text-center">Lista dei Prodotti</h3>
            {loading && <Loading />}
            {!loading && <table className="table table-responsive table-hover table-bordered table-sm w-100" id="table-to-xls">
                <thead className="thead-dark " >
                    <tr className="w-100">
                        <th></th>
                        <th >CODICE INTERNO</th>
                        <th >ProductId</th>
                        <th>Modello</th>
                        <th>MARCA</th>
                        <th>Luogo</th>
                        <th>Prezzo</th>
                        <th>Prezzo B2B</th>
                        <th>C.P.U </th>
                        <th>RAM </th>
                        <th>HDD </th>
                        <th>Display </th>
                        <th>Note</th>

                    </tr>

                </thead>
                <tbody id="myTable">
                    {paginatedProducts.map(product => <tr key={product.id}><td>
                        <Link to={"/productlist/" + product.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                        <button onClick={() => handleDelete(product.id)} className="btn btn-outline-danger "><i className="fa fa-trash"></i></button>


                    </td>

                        <td>{product.id}</td>
                        <td>{product.productId}</td>
                        <td>{product.model} </td>
                        <td>{product.marque}</td>
                        <td>{product.location.locationName}</td>
                        <td>{product.price}&euro;</td>
                        <td>{product.priceb2b}</td>
                        <td>{product.processor}</td>
                        <td>{product.ram} </td>
                        <td>{product.hdd}</td>
                        <td>{product.screen}</td>

                        <td>{product.note}</td>

                    </tr>)}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="15">
                            <div className="d-flex justify-content-between">
                                {itemsPerPage < filteredProducts.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
                                    length={filteredProducts.length} onPageChanged={handlePageChange} />}
                                <div className="form-group">
                                    <label htmlFor="sel1">Quanti voi?:</label>
                                    <select className="form-control" id="sel1" onChange={handleChangeItemsPerPage}>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="50">50</option>
                                        <option value="75">75</option>
                                        <option value="100">100</option>
                                        <option value={filteredProducts.length}>tutti</option>
                                    </select>
                                </div>
                            </div>

                        </td>
                    </tr>
                </tfoot>
            </table>}

        </>
    )
}

export default ProductList;