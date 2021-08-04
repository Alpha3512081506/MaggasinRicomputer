import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DesktopService from '../../../../services/DesktopService';
const DesktopShow = (props) => {
    const [desktop, setDesktop] = useState([]);
    const [loading, setLoading] = useState(true);

    const [datat, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('redux');
    const [test, setTest] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        axios.get('https://127.0.0.1:8000/api/product_desktops').then(response => response.data['hydra:member'])
            .then(data => setTest(data));
        console.log(test)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios.get('https://127.0.0.1:8000/api/product_desktops');

                setDatat(result.data);

            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);









    /* const [datas, setDatas] = useState({ hits: [] });
  
      useEffect(() => {
          const fetchData = async () => {
              const result = await axios.get(
                  'https://127.0.0.1:8000/api/product_desktops',
              );
  
  
              setDatas(result.data);
  
          };
  
          fetchData();
          console.log(datas)
      }, []);
   useEffect(() => {
          async () => {
              try {
                  const data = await DesktopService.findAllDesktop()
                  setDesktop(data);
                  console.log("hello Test")
                  setLoading(false)
                  toast.success("connessione al server effettuata ✔")
                  console.log(desktop);
              } catch (error) {
                  toast.error("Devi effettuare il login per accedere alle risorse")
                  console.log(error.data)
              }
          }
      }, [])
  */
    return (<>
        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci Computer Desktop</h5>
            <Link to={"/types/desktop/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>

        </div>
        <hr />

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
            <tbody >
                <tr>
                    <td>
                        <Link to={"/types/desktop/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                        <button className="btn btn-outline-danger "><i className="fa fa-trash"></i></button>


                    </td>

                    <td>1</td>
                    <td>AWEVRTYU</td>
                    <td>Portatile</td>
                    <td>DELL</td>
                    <td>Latitude E7470</td>
                    <td>i5</td>
                    <td>8GB</td>
                    <td>256 SSD</td>
                    <td>Grado A</td>
                    <td>Negozzio</td>
                    <td>400&euro;</td>
                    <td>3.50&euro;</td>


                    <td>Qualche segni </td>

                </tr>

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="15">
                        {/**itemsPerPage < filteredProducts.length && <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filteredProducts.length}
                                onPageChanged={handlePageChange}
                    />*/}
                        <p>Pagination</p>

                    </td>
                </tr>
            </tfoot>
        </table>

    </>);
}

export default DesktopShow;