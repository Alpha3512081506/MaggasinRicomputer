import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../../components/Loading';
import Pagination from '../../../../components/Pagination';
import DesktopService from '../../../../services/DesktopService';
import { API_DESKTOP } from '../../../../services/Config';
const DesktopShow = (props) => {
    const [desktop, setDesktop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [itemsPerPage, setItemPerPage] = useState(10)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(API_DESKTOP);
                setDesktop(result.data['hydra:member']);
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
        const originalDesktop = [...desktop];
        setDesktop(desktop.filter(desktop => desktop.id !== id));
        try {
            await axios.delete(API_DESKTOP + "/" + id)

            toast.success("il prodotto è stato cancellato")
        } catch (error) {
            setDesktop(originalProduct);
            toast.error("si è verificato un errore il prodotto non è stato cancellato");
        }

    }
    // const itemsPerPage = 10;
    const pageCount = Math.ceil(desktop.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    //const start = (currentPage * itemsPerPage - itemsPerPage);
    // const paginatedDesktop = desktop.slice(start, start + itemsPerPage)
    const filteredDesktop = desktop.filter(d =>
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
    const paginatedDesktop = Pagination.getData(filteredDesktop, currentPage, itemsPerPage);
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1)
    }

    const handleChangeItemsPerPage = ({ currentTarget }) => {
        const { value } = currentTarget;
        setItemPerPage(value)
    }
    return (<>

        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci Computer Desktop</h5>
            <Link to={"/types/desktop/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>

        </div>
        <hr />
        {loading && <Loading />}
        {!loading &&
            <div>
                <input className="form-control" id="myInput" type="text" placeholder="Search.." value={search} onChange={handleSearch} />
                <br></br>
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                    <div>
                        <h4 className="display-5 text-center text-justify">Filtro Totale : {paginatedDesktop.length} per {filteredDesktop.length} </h4>
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
                            <th>Grado</th>
                            <th>Luogo</th>
                            <th>Prezzo</th>
                            <th>Prezzo al Rivenditore</th>
                            <th>Note</th>

                        </tr>

                    </thead>
                    <tbody id="myTable">
                        {paginatedDesktop.map(desktop => <tr key={desktop.id}><td>
                            <Link to={"/types/desktop/add/" + desktop.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                            <button className="btn btn-outline-danger " onClick={() => handleDelete(desktop.id)}><i className="fa fa-trash"></i></button>


                        </td>

                            <td>{desktop.id}</td>
                            <td>{desktop.productId}</td>
                            <td>{desktop.category.categoryName}</td>
                            <td>{desktop.marque}</td>
                            <td>{desktop.model}</td>
                            <td>{desktop.processor}</td>
                            <td>{desktop.ram} </td>
                            <td>{desktop.hdd}</td>
                            <td>{desktop.grade}</td>
                            <td>{desktop.location.locationName}&euro;</td>
                            <td>{desktop.price}&euro;</td>
                            <td>{desktop.priceb2b}</td>

                            <td>{desktop.note}</td>

                        </tr>)}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="15">
                                <div className="d-flex justify-content-between">
                                    {itemsPerPage < filteredDesktop.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
                                        length={filteredDesktop.length} onPageChanged={handlePageChange} />}
                                    <div className="form-group">
                                        <label htmlFor="sel1">Select list:</label>
                                        <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="75">75</option>
                                            <option value="80">80</option>
                                            <option value="100">100</option>
                                            <option value={desktop.length}>tutti</option>
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

export default DesktopShow;



