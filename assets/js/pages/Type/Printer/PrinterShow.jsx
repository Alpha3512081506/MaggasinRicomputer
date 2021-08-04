import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const PrinterShow = () => {

    const [printer, setPrinter] = useState([]);
    const [loading, setLoading] = useState(true);

    return (<>
        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci le stampante</h5>
            <Link to={"/types/printers/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>

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
                    <th>PP/M</th>
                    <th>Connessioni</th>
                    <th>Tipo</th>
                    <th>Toner</th>
                    <th>Grado</th>
                    <th>Formato</th>
                    <th>Luogo</th>
                    <th>Prezzo</th>
                    <th>Prezzo al Rivenditore</th>
                    <th>Note</th>

                </tr>

            </thead>
            <tbody >
                <tr>
                    <td>
                        <Link to={""}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
                        <button className="btn btn-outline-danger "><i className="fa fa-trash"></i></button>


                    </td>

                    <td>1</td>
                    <td>AWEVRTYU</td>
                    <td>Portatile</td>
                    <td>DELL</td>
                    <td>Latitude E7470</td>
                    <td>‎28</td>
                    <td>USB</td>
                    <td>Stamp-MultiF.</td>
                    <td>Laser</td>
                    <td>Grado A</td>
                    <td>A4</td>
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

export default PrinterShow;