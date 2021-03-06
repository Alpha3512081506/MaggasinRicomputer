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


const ProductList = (props) => {
    const [products, setProduct] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isScan, setIsScan] = useState(false);
    const [loading, setLoading] = useState(true);

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
    const PaginatedProduct = Pagination.getData(products, currentPage, 5)
    // console.log(PaginatedProduct)
    const itemsPerPage = 100;
    const filteredProducts = products.filter(product =>
        product.productId.toLowerCase().includes(search.toLowerCase())
        || product.productName.toLowerCase().includes(search.toLowerCase())
        || product.category.categoryName.toLowerCase().includes(search.toLowerCase())
        || product.location.locationName.toLowerCase().includes(search.toLowerCase())
        || product.customField1.toLowerCase().includes(search.toLowerCase())
        || product.customField2.toLowerCase().includes(search.toLowerCase())
        || product.customField3.toLowerCase().includes(search.toLowerCase())
        || product.note.toLowerCase().includes(search.toLowerCase())
    )

    const handlePageChange = page => { setCurrentPage(page) }
    const paginatedProducts = Pagination.getData(
        filteredProducts, currentPage, itemsPerPage)
    //console.log(paginatedProducts)
    //ici je dois gerer le sccan en changeant const par let ou var
    const handleSearch = () => {
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });

        setCurrentPage(1)
    }


    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6  my-3">

                    <Link to="/productlist/new" className="btn btn-outline-success">crea prodotto</Link>
                </div>
                <div className="col-12 col-sm-12 col-md-6 my-3">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-outline-success"
                        table="table-to-xls"
                        filename="Prodotto In Magazzino"
                        sheet="Prodotto In Magazzino"
                        buttonText="export to Excel" />
                </div>
                <div className="row"><div className="col-12 col-sm-12  my-3">
                    <ExcelExporter />

                </div>

                </div>
            </div>

            <div className="form-group">
                <input type="text" placeholder="search....."
                    id="myInput"
                    onChange={handleSearch}
                    className="form-control" />
            </div>
            <h3 className="text-center">Lista dei Prodotti</h3>
            {loading && <Loading />}
            {!loading && <table className="table table-responsive table-hover table-bordered table-sm w-100" id="table-to-xls">
                <thead className="thead-dark " >
                    <tr className="w-100">
                        <th></th>
                        <th >InternoId</th>
                        <th >ProductId</th>
                        <th>Categoria</th>
                        <th>Grado</th>
                        <th>Luogo</th>
                        <th>Prezzo</th>
                        <th>Prezzo al Rivenditore</th>
                        <th>codice interno</th>
                        <th>Marca</th>
                        <th>Modello</th>
                        <th>Specifiche</th>
                        <th>Note</th>

                    </tr>

                </thead>
                <tbody id="myTable">
                    {products.map(product => <tr key={product.id}><td>
                        <Link to={"/productlist/" + product.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                        <button onClick={() => handleDelete(product.id)} className="btn btn-outline-danger "><i className="fa fa-trash"></i></button>


                    </td>
                        <td>{product.id}</td>
                        <td>{product.productId}</td>
                        <td>{product.category.categoryName}</td>
                        <td>{product.productName}</td>
                        <td>{product.location.locationName}</td>
                        <td>{product.currentQuantity}&euro;</td>
                        <td>{product.price}&euro;</td>
                        <td>{product.alertQuanty}</td>
                        <td>{product.customField1}</td>
                        <td>{product.customField2}</td>
                        <td>{product.customField3} </td>
                        <td>{product.note}</td>

                    </tr>)}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="11">
                            {itemsPerPage < filteredProducts.length && <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filteredProducts.length}
                                onPageChanged={handlePageChange}
                            />}

                        </td>
                    </tr>
                </tfoot>
            </table>}

        </>
    )
}

export default ProductListCopy;