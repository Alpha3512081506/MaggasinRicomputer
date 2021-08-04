import React from 'react';
import { Link } from 'react-router-dom';
const NoteBookShow = (props) => {


    return (<>
        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci Prodotti</h5>
            <Link to={"/types/notebook/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Prodotto</i></button></Link>

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
                    <th>Schermo</th>


                    <th>Note</th>

                </tr>

            </thead>
            <tbody >
                <tr>
                    <td>
                        <Link to={"/types/notebook/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-pencil"></i></button></Link>
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
                    <td>14 POLLICI</td>
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

export default NoteBookShow;