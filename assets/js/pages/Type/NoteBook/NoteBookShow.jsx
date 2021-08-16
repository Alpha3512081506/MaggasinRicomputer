import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';
import { API_NOTEBOOK } from '../../../services/Config';
import ExportToExcel from '../../../services/ExportToExcel';
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
                console.log(result.data['hydra:member'])
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
    const [itemsPerPage, setItemPerPage] = useState(10);
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
    const handleChangeItemsPerPage = (event) => {
        setItemPerPage(event.currentTarget.value)
    }
    const [excelData, setExcelData] = useState([])
    const fileName = "NOTEBOOK";

    //Document
    const [table, setTable] = useState([]);
    const componentRef = React.useRef(null);
    const handleTest = () => {
        console.log(componentRef.current.table)
    }

    /*  function sortTable(n) {
          var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
          table = document.getElementById("#myTable2");
          switching = true;
          dir = "asc";
         
          while (switching) {
              switching = false;
              rows = table.rows;
              for (i = 1; i < (rows.length - 1); i++) {
                  shouldSwitch = false;
                  x = rows[i].getElementsByTagName("TD")[n];
                  y = rows[i + 1].getElementsByTagName("TD")[n];
                  if (dir == "asc") {
                      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                          shouldSwitch = true;
                          break;
                      }
                  } else if (dir == "desc") {
                      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                          shouldSwitch = true;
                          break;
                      }
                  }
              }
              if (shouldSwitch) {
                  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                  switching = true;
                  switchcount++;
              } else {
                  if (switchcount == 0 && dir == "asc") {
                      dir = "desc";
                      switching = true;
                  }
              }
          }
      }*/
    return (<>

        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci Computer Desktop</h5>
            <Link to={"/types/notebook/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>

        </div>
        <hr />
        {loading && <Loading />}
        {!loading &&
            <div>
                <input className="form-control" id="myInput" type="text" placeholder="Search.." value={search} onChange={handleSearch} />
                <br></br>
                <div className=" d-flex align-items-center justify-content-between">
                    <div className="alert alert-primary" role="alert ">
                        <h4 className="display-5 text-center text-justify">Filtro Totale : {paginatedNotebook.length} per {filteredNotebook.length} </h4>
                    </div>

                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-success ">STAMPA</button>
                        {<ExportToExcel apiData={paginatedNotebook} fileName={fileName} />}
                        <button onClick={handleTest} type="button" className="btn btn-outline-success ">IMPORTA EXCEL</button>
                    </div>
                </div>
                <table ref={componentRef} className="table table-responsive table-hover table-bordered table-sm w-100" id="myTable2">

                    <thead className="thead-dark " >
                        <tr className="w-100">
                            <th></th>
                            <th  >codiceInterno <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th >ProductId</th>
                            <th>Categoria</th>
                            <th>Marca  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>Modello  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>C.P.U  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>RAM  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>HDD  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>Display  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>Grado  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>Luogo  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>Prezzo  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
                            <th>Prezzo al Rivenditore  <i className="fa fa-arrow-up"></i><i className="fa fa-arrow-down"></i></th>
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
                                        <select className="form-control" id="sel1" onChange={handleChangeItemsPerPage}>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="50">50</option>
                                            <option value="75">75</option>
                                            <option value="100">100</option>
                                            <option value={filteredNotebook.length}>tutti</option>
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



