import React from 'react';
import { Link } from 'react-router-dom';
const Componenti = () => {
    return (<>
        <div className="d-flex justify-content-between">
            <h5 className="font-italic text text-success">Gestisci Componenti</h5>
            <Link to={"/types/component/add/new"}> <button className="btn btn-outline-success "><i className="fa fa-plus">Aggiungi Componente</i></button></Link>

        </div>
        <hr />

        <table className="table table-responsive table-hover table-bordered table-sm">
            <thead className="thead-dark " >
                <tr>
                    <th></th>
                    <th >codiceInterno</th>
                    <th >ProductId</th>
                    <th>Tipologia</th>
                    <th>Marca</th>
                    <th>Specifiche</th>
                    <th>Quantità</th>
                    <th>Grado</th>


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
                    <td>RAM</td>
                    <td>DELL</td>
                    <td>DDR3</td>
                    <td>10</td>
                    <td>Grado A</td>


                </tr>

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="8">
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

export default Componenti;