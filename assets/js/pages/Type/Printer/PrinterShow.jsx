import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';
import { API_PRINTER } from '../../../services/Config';
import ExportToExcel from '../../../services/ExportToExcel';

const PrinterShow = (props) => {
    const [printer, setPrinter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [itemsPerPage, setItemPerPage] = useState(5)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(API_PRINTER);
                setPrinter(result.data['hydra:member']);
                toast.success("connessione al server effettuata ✔")
                setLoading(false);

            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error.data)
            }


        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const orignalPrinter = [...printer];
        setPrinter(printer.filter(printer => printer.id !== id));
        try {
            await axios.delete(API_PRINTER + "/" + id)

            toast.success("il prodotto è stato cancellato")
        } catch (error) {
            setComponent(orignalPrinter);
            toast.error("si è verificato un errore il prodotto non è stato cancellato");
        }

    }
    // const itemsPerPage = 10;
    const pageCount = Math.ceil(printer.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const filteredPrinter = printer.filter(d =>
        (d.productId && d.productId.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.type && d.type.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.model && d.model.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.marque && d.marque.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.connector && d.connector.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.grade && d.grade.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.tonner && d.tonner.toLowerCase().includes(search.toLocaleLowerCase()))
        // (d.location.locationName && d.location.locationName.toLowerCase().includes(search.toLocaleLowerCase()))
        //||(d.category.categoryName && d.category.categoryName.toLowerCase().includes(search.toLocaleLowerCase()))

    )
    const paginatedePrinter = Pagination.getData(filteredPrinter, currentPage, itemsPerPage);
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1)
    }

    const handleChangeItemsPerPage = ({ currentTarget }) => {
        const { value } = currentTarget;
        setItemPerPage(value)
    }
    const fileName = "Printer";
    const { productId, marque, model, connector, type } = paginatedePrinter
    return (<>

        <div className="d-flex justify-content-between">
            <ExportToExcel apiData={paginatedePrinter} fileName={fileName} />
            <h5 className="font-italic text text-success">Gestisci le stampante</h5>
            <Link to={"/types/printers/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>
        </div>
        <hr />
        {loading && <Loading />}
        {!loading &&
            <div>
                <input className="form-control" id="myInput" type="text" placeholder="Search.." value={search} onChange={handleSearch} />
                <br></br>
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                    <div>
                        <h4 className="display-5 text-center text-justify">Filtro Totale : {paginatedePrinter.length} per {filteredPrinter.length} </h4>
                    </div>
                </div>
                <table className="table table-responsive table-hover table-bordered table-sm w-100" id="table-to-xls">

                    <thead className="thead-dark " >
                        <tr className="w-100">
                            <th></th>
                            <th >codiceInterno</th>
                            <th >ProductId</th>

                            <th>Marca</th>
                            <th>Modello</th>
                            <th>PP/M</th>
                            <th>Connessioni</th>
                            <th>Tipo</th>
                            <th>Toner</th>
                            <th>Grado</th>
                            <th>Formato</th>

                            <th>Categoria</th>
                            <th>Location</th>

                            <th>Prezzo</th>
                            <th>Prezzo al Rivenditore</th>
                            <th>Note</th>


                        </tr>

                    </thead>
                    <tbody id="myTable">
                        {paginatedePrinter.map(printer => <tr key={printer.id}><td>
                            <Link to={"/types/printers/add/" + printer.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                            <button className="btn btn-outline-danger " onClick={() => handleDelete(printer.id)}><i className="fa fa-trash"></i></button>


                        </td>

                            <td>{printer.id}</td>
                            <td>{printer.productId}</td>

                            <td>{printer.marque}</td>
                            <td>{printer.model}</td>
                            <td>{printer.paper}</td>
                            <td>{printer.connector}</td>
                            <td>{printer.type}</td>
                            <td>{printer.tonner}</td>
                            <td>{printer.grade}</td>
                            <td>{printer.format}</td>

                            <td>{printer.category}</td>
                            <td>{printer.location}</td>

                            <td>{printer.price}</td>
                            <td>{printer.priceb2b}</td>
                            <td>{printer.note}</td>


                        </tr>)}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="15">
                                <div className="d-flex justify-content-between">
                                    {itemsPerPage < filteredPrinter.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
                                        length={filteredPrinter.length} onPageChanged={handlePageChange} />}
                                    <div className="form-group">
                                        <label htmlFor="sel1">Select list:</label>
                                        <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="35">35</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value={filteredPrinter.length}>tutti</option>
                                            <option value={printer.length}>tutti</option>
                                        </select>

                                    </div>
                                </div>

                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            // condition ? true : false


        }
        <div>

        </div>

    </>);
}

export default PrinterShow;






