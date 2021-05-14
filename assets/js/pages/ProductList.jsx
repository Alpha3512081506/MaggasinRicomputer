import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import APISERVICE from '../services/PRODUCTSERVICE';
import { Link } from 'react-router-dom';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import { toast } from 'react-toastify';
import Alert from '../components/Alert';


const ProductList = (props) => {

    const [products, setProduct] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isScan, setIsScan] = useState(false);

    let [dataScan, setDataScan] = useState([]);
    const findAll = async () => {
        try {
            const data = await APISERVICE.findAll();
            setProduct(data);
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
    const itemsPerPage = 5;
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
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);

        setCurrentPage(1)
    }
    const handleScanSuccess = (data) => {
        setDataScan(data)
        setIsScan(false)

        console.log(dataScan)



    }
    const handeShow = (id) => {
        console.log(id)
    }
    const [errorScan,setErrorScan]= useState("");
    const handleErrorScan=()=>{
        toast.error("Scansione fallita");
        setIsScan(false);
    }
    return (
        <>
            {isScan && <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                    dataScan = result;
                    if (dataScan) {
                        setDataScan(dataScan);
                        console.log(dataScan);
                        setSearch(dataScan.text);
                        setSearch(dataScan[0])
                    }

                }}
            />
            }
            <div className="row">
                <div className="col-sm-6">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-success" onClick={handleScanSuccess}><i className="fa fa-camera-retro">Scan CodeBarre</i></button>
                        <button className="btn btn-outline-success" onClick={() => { setIsScan(false) }}><i className="fa fa-camera-retro">Close Camera </i></button>
                        <Link to="/productadd" className="btn btn-outline-success">crea prodotto</Link>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <input type="text" placeholder="search....."
                    onChange={handleSearch} value={search}
                    className="form-control" />
            </div>
            <h3 className="text-center">Liste des produits</h3>
           <div id="beep">
               <audio src="beep.mp3"></audio>
           </div>
            <table className="table table-responsive table-hover table-bordered table-sm w-100">
                <thead className="thead-dark " >
                    <tr className="w-100">
                        <th></th>
                        <th >ProductId</th>
                        <th>ProductName</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>CurrentQuantity</th>
                        <th>AlertQuantity</th>
                        <th>Marque</th>
                        <th>Model</th>
                        <th>Specifiques</th>
                        <th>Note</th>
                    </tr>

                </thead>
                <tbody>
                    {products.length === 0 && <tr><td colSpan="11"><Loading /></td></tr>}
                    {paginatedProducts.map(product => <tr key={product.id}><td>
                        <Link to="/"> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                        <button onClick={() => handleDelete(product.id)} className="btn btn-outline-danger "><i className="fa fa-trash"></i></button>


                    </td>

                        <td>{product.productId}</td>
                        <td>{product.productName}</td>
                        <td>{product.category.categoryName}</td>
                        <td>{product.location.categoryName}</td>
                        <td>{product.currentQuantity}</td>
                        <td>{product.alertQuanty}</td>
                        <td>{product.customField1}</td>
                        <td>{product.customField2}</td>
                        <td>{product.customField1} </td>
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
            </table>
            <Alert />

        </>
    )
}

export default ProductList;