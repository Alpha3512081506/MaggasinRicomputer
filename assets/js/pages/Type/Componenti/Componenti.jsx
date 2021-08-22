import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';
import Select from '../../../form/Select';
import COMPONENTSERVICE from '../../../services/COMPONENTSERVICE';
import { API_COMPONENNT } from '../../../services/Config';
const Componenti = (props) => {
    const [component, setComponent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [itemsPerPage, setItemPerPage] = useState(10)
    const paginationItem = [5, 10, 20, 30, 40, 50, 80, 100];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await COMPONENTSERVICE.findAllComponent();
                setComponent(result);
                // toast.success("connessione al server effettuata ✔")
                setLoading(false);
                // console.log(desktop)
            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error.result)
            }


        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const originalComponent = [...component];
        setComponent(component.filter(component => component.id !== id));
        try {
            await COMPONENTSERVICE.deleteComponentById(id)
            //await axios.delete(API_COMPONENNT + "/" + id)

            toast.success("il prodotto è stato cancellato")
        } catch (error) {
            setComponent(originalComponent);
            toast.error("si è verificato un errore il prodotto non è stato cancellato");
        }

    }
    // const itemsPerPage = 10;
    const pageCount = Math.ceil(component.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    //const start = (currentPage * itemsPerPage - itemsPerPage);
    // const paginatedDesktop = desktop.slice(start, start + itemsPerPage)
    const filteredComponent = component.filter(d =>
        (d.productId && d.productId.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.type && d.type.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.model && d.model.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.marque && d.marque.toLowerCase().includes(search.toLocaleLowerCase())) ||
        // (d.quantity && d.quantity.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.grade && d.grade.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.location.locationName && d.location.locationName.toLowerCase().includes(search.toLocaleLowerCase())) ||
        (d.category.categoryName && d.category.categoryName.toLowerCase().includes(search.toLocaleLowerCase()))

    )
    const paginatedComponent = Pagination.getData(filteredComponent, currentPage, itemsPerPage);
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1)
    }

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        console.log(value)
        setItemPerPage(value)

    }
    return (<>

        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">GESTISCI COMPONENTI</h5>
            <Link to={"/types/component/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Componente</i></button></Link>

        </div>
        <hr />
        {loading && <Loading />}
        {!loading &&
            <div>
                <input className="form-control" id="myInput" type="text" placeholder="Search.." value={search} onChange={handleSearch} />
                <br></br>
                <div className=" d-flex align-items-center justify-content-between">
                    <div className="alert alert-primary" role="alert ">
                        <h4 className="display-5 text-center text-justify">Filtro Totale : {filteredComponent.length} </h4>
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
                            <th>Tipologia</th>
                            <th>Specifiche</th>
                            <th>Quantità</th>
                            <th>Grado</th>
                            <th>Luogo</th>
                            {/**   <th>Azioni</th>*/}


                        </tr>

                    </thead>
                    <tbody id="myTable">
                        {paginatedComponent.map(component => <tr key={component.id}><td>
                            <Link to={"/types/component/add/" + component.id}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                            <button className="btn btn-outline-danger " onClick={() => handleDelete(component.id)}><i className="fa fa-trash"></i></button>


                        </td>

                            <td>{component.id}</td>
                            <td>{component.productId}</td>
                            <td>{component.category.categoryName}</td>
                            <td>{component.marque}</td>
                            <td>{component.type}</td>
                            <td>{component.specify}</td>
                            <td>{component.quantity}</td>
                            <td>{component.grade}</td>
                            <td>{component.location.locationName}</td>
                            {/**<td>
                                <Link to={"/types/component/plus/" + component.id}><button className="btn btn-outline-primary "><i className="fa fa-plus"></i></button></Link>
                                <Link to={"/types/component/minus/" + component.id}> <button className="btn btn-outline-primary " ><i className="fa fa-minus"></i></button></Link>
                            </td>*/}


                        </tr>)}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="15">
                                <div className="d-flex justify-content-between">
                                    {itemsPerPage < filteredComponent.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
                                        length={filteredComponent.length} onPageChanged={handlePageChange} />}
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

export default Componenti;


