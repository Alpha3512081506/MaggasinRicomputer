import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';
import Select from '../../../form/Select';
import { API_MONITOR } from '../../../services/Config';
import EXCELIMPORTER from '../../../services/EXCELIMPORTER';
import ExportToExcel from '../../../services/ExportToExcel';
import IMPORTXLSXMONITOR from '../../../services/IMPORTXLSXMONITOR';


const MonitorShow = (props) => {
    const [monitor, setMonitor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [itemsPerPage, setItemPerPage] = useState(100)
    const paginationItem = [20, 30, 40, 50, 80, 100];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(API_MONITOR);
                setMonitor(result.data['hydra:member']);
                toast.success("connessione al server effettuata ✔")
                setLoading(false);
                // console.log(desktop)
            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error)
            }


        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const originalMonitor = [...monitor];
        setMonitor(monitor.filter(monitor => monitor.id !== id));
        try {
            await axios.delete(API_MONITOR + "/" + id)

            toast.success("il prodotto è stato cancellato")
        } catch (error) {
            setMonitor(originalMonitor);
            toast.error("si è verificato un errore il prodotto non è stato cancellato");
        }

    }
    // const itemsPerPage = 10;
    const pageCount = Math.ceil(monitor.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    //const start = (currentPage * itemsPerPage - itemsPerPage);
    // const paginatedDesktop = desktop.slice(start, start + itemsPerPage)
    const filteredMonitor = monitor.filter(d =>
        (d.productId && d.productId.toString().toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.marca && d.marca.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.model && d.model.toLowerCase().includes(search.toLocaleLowerCase())) ||
        d.display.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.grade.toLowerCase().includes(search.toLocaleLowerCase()) ||
        (d.location.locationName && d.location.locationName.toLowerCase().includes(search.toLocaleLowerCase()))

    )
    const paginatedMonitor = Pagination.getData(filteredMonitor, currentPage, itemsPerPage);
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1)
    }


    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        console.log(value)
        setItemPerPage(value)
        // setNotebok({ ...notebook, [name]: value });

    }
    const fileName = "Monitors";
    return (<>
        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci  Monitors</h5>
            <Link to={"/types/monitors/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>
        </div>
        <hr />
        <div className="card border-success">
            <div className="card-header bg-success">
                <h4 className="text-center text-white"> Excel Dati</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <IMPORTXLSXMONITOR />
                    </div>
                    <div className="col">
                        <div className="alert alert-primary my-1" role="alert">
                            {<ExportToExcel apiData={paginatedMonitor} fileName={fileName} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {loading && <Loading />}
        {!loading &&
            <div>
                <input className="form-control my-4" id="myInput" type="text" placeholder="Search.." value={search} onChange={handleSearch} />
                <br></br>
                <div className=" d-flex align-items-center justify-content-between">
                    <div className="alert alert-primary" role="alert ">
                        <h4 className="display-5 text-center text-justify">Filtro Totale : {paginatedMonitor.length} per {filteredMonitor.length} </h4>
                    </div>


                </div>

                <table className="table table-responsive table-hover table-bordered table-sm w-100" id="table-to-xls">

                    <thead className="thead-dark " >
                        <tr className="w-100">
                            <th></th>
                            <th >codice Interno</th>
                            <th >ProductId</th>
                            <th>Marca</th>
                            <th>Modello</th>
                            <th>Grado</th>
                            <th>Display</th>
                            <th>Luogo</th>
                            <th>Prezzo</th>
                            <th>Prezzo B2B</th>
                            <th>Note</th>

                        </tr>

                    </thead>
                    <tbody id="myTable">
                        {paginatedMonitor.map(monitor => <tr key={monitor.id}><td>
                            <Link to={"/types/monitors/add/" + monitor.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                            <button className="btn btn-outline-danger " onClick={() => handleDelete(monitor.id)}><i className="fa fa-trash"></i></button>


                        </td>

                            <td className="text-center">{monitor.id}</td>
                            <td>{monitor.productId}</td>
                            <td>{monitor.marca}</td>
                            <td>{monitor.model}</td>
                            <td>{monitor.grade}</td>
                            <td>{monitor.display}</td>
                            <td>{monitor.location.locationName}</td>
                            <td className="text-center">{monitor.price}&euro;</td>
                            <td className="text-center">{monitor.priceb2b}&euro;</td>
                            <td>{monitor.note}</td>

                        </tr>)}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="15">
                                <div className="d-flex justify-content-between">
                                    {itemsPerPage < filteredMonitor.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
                                        length={filteredMonitor.length} onPageChanged={handlePageChange} />}
                                    <div className="form-group">
                                        <Select
                                            name="pagination"
                                            label="Quanti?"
                                            value={itemsPerPage}
                                            onChange={handleChange}

                                        >
                                            {paginationItem.map(p => <option key={p} value={p}>
                                                {p}</option>)}
                                        </Select>

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

export default MonitorShow;



