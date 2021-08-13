import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';
import { API_NOTEBOOK } from '../../../services/Config';
const NoteBookShow = (props) => {
    const [notebook, setNoteBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(API_NOTEBOOK);
                setNoteBook(result.data['hydra:member']);
                // toast.success("connessione al server effettuata ✔")
                setLoading(false);
                // console.log(desktop)
            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error.data)
            }


        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const originalNotebook = [...notebook];
        setNoteBook(notebook.filter(notebook => notebook.id !== id));
        try {
            await axios.delete(API_NOTEBOOK + "/" + id)

            toast.success("il prodotto è stato cancellato")
        } catch (error) {
            setNoteBook(originalNotebook);
            toast.error("si è verificato un errore il prodotto non è stato cancellato");
        }

    }
    const itemsPerPage = 75;
    const pageCount = Math.ceil(notebook.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    //const start = (currentPage * itemsPerPage - itemsPerPage);
    // const paginatedDesktop = desktop.slice(start, start + itemsPerPage)
    const filteredNotebook = notebook.filter(d =>
        d.productId.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.marque.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.model.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.processor.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.hdd.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.ram.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.processor.toLowerCase().includes(search.toLocaleLowerCase()) ||
        d.grade.toLowerCase().includes(search.toLocaleLowerCase()) ||
        (d.location.locationName && d.location.locationName.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.category.categoryName && d.category.categoryName.toLowerCase().includes(search.toLocaleLowerCase()))

    )
    const paginatedNotebook = Pagination.getData(filteredNotebook, currentPage, itemsPerPage);
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1)
    }


    return (<>

        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci Computer Desktop</h5>
            <Link to={"/types/notebook/add/:id"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>

        </div>
        <hr />
        {loading && <Loading />}
        {!loading &&
            <div>
                <input className="form-control" id="myInput" type="text" placeholder="Search.." value={search} onChange={handleSearch} />
                <br></br>
                <div className=" d-flex align-items-center justify-content-between">
                    <div className="alert alert-primary" role="alert ">
                        <h4 className="display-5 text-center text-justify">Filtro Totale : {filteredNotebook.length} </h4>
                    </div>

                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-success ">STAMPA</button>
                        <button type="button" className="btn btn-outline-success ">ESPORTA EXCEL</button>
                        <button type="button" className="btn btn-outline-success ">IMPORTA EXCEL</button>
                    </div>
                </div>
                <table className="table table-responsive table-hover table-bordered table-sm w-100" id="table-to-xls">

                    <thead className="thead-dark " >
                        <tr className="w-100">
                            <th></th>
                            <th >codiceInterno</th>
                            <th >ProductId</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Modello</th>
                            <th>C.P.U</th>
                            <th>RAM</th>
                            <th>HDD</th>
                            <th>Display</th>
                            <th>Grado</th>
                            <th>Luogo</th>
                            <th>Prezzo</th>
                            <th>Prezzo al Rivenditore</th>
                            <th>Note</th>

                        </tr>

                    </thead>
                    <tbody id="myTable">
                        {paginatedNotebook.map(notebook => <tr key={notebook.id}><td>
                            <Link to={"/types/desktop/add/" + notebook.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                            <button className="btn btn-outline-danger " onClick={() => handleDelete(notebook.id)}><i className="fa fa-trash"></i></button>


                        </td>

                            <td>{notebook.id}</td>
                            <td>{notebook.productId}</td>
                            <td>{notebook.category.categoryName}</td>
                            <td>{notebook.marque}</td>
                            <td>{notebook.model}</td>
                            <td>{notebook.processor}</td>
                            <td>{notebook.ram} </td>
                            <td>{notebook.hdd}</td>
                            <td>{notebook.screen}</td>
                            <td>{notebook.grade}</td>
                            <td>{notebook.location.locationName}</td>
                            <td>{notebook.price}&euro;</td>
                            <td>{notebook.priceb2b}&euro;</td>

                            <td>{notebook.note}</td>

                        </tr>)}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="15">
                                <div className="d-flex justify-content-between">
                                    {itemsPerPage < filteredNotebook.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
                                        length={filteredNotebook.length} onPageChanged={handlePageChange} />}
                                    <div className="form-group">
                                        <label htmlFor="sel1">Select list:</label>
                                        <select className="form-control" id="sel1">
                                            <option>25</option>
                                            <option>50</option>
                                            <option>100</option>
                                            <option>Tutti</option>
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

export default NoteBookShow;



