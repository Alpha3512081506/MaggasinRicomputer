import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
const HomePage = (props) => {
    return (<>
        <div className="row d-flex align-items-center">
            <div className="col-sm-6 col-md-6 col-lg-4 d-flex align-content-center ">
                <Link to="/productlist">
                    <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <button type="button" className="btn btn-success btn-lg"><span className="display-5">Products</span></button>
                    </div>
                </Link>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4 d-flex align-content-center ">
                <Link to="/categorylist">
                    <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <button type="button" className="btn btn-success btn-lg"><span className="display-5">Categories</span></button>
                    </div>
                </Link>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4 d-flex align-content-center">
                <Link to="/locationlist">
                    <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <button type="button" className="btn btn-success btn-lg"><span className="display-5">Location</span></button>
                    </div>
                </Link>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4 d-flex align-content-center">
                <Link to="/users">
                    <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <button type="button" className="btn btn-success btn-lg"><span className="display-5">Users</span></button>
                    </div>
                </Link>
            </div>
        </div>

        <hr className="mt-5" />
        <Alert />






    </>);
}

export default HomePage;