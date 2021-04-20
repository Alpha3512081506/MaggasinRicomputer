import React from 'react'; const Location = (props) => {
    return (<>
        <h1>List des emplacements</h1>
        <table className="table table-hover table-bordered table-sm">
            <thead className="thead-dark">
                <tr>
                    <th></th>
                    <th>LocationName</th>



                </tr>

            </thead>
            <tbody>
                <tr><td>
                    <button className="btn btn-outline-success"><i className="fa fa-search"></i></button>
                    <button className="btn btn-outline-success"><i className="fa fa-pencil"></i></button>
                    <button className="btn btn-outline-success"><i className="fa fa-trash"></i></button>


                </td>

                    <td>Scafalo A</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2"><p>pagination </p></td>
                </tr>
            </tfoot>
        </table>

    </>);
}

export default Location;