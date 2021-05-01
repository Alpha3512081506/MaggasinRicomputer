import React from 'react';
const HomePage = (props) => {
    return (<>

        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4  d-flex align-content-center">
                        <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <button type="button" className="btn btn-success btn-lg"><span className="display-5">StockIn</span></button>
                        </div></div>
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-content-center">
                        <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <button type="button" className="btn btn-success btn-lg"><span className="display-5">Stockout</span></button>
                        </div></div>
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-content-center">
                        <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <button type="button" className="btn btn-success btn-lg"><span className="display-5">Category</span></button>
                        </div></div>
                </div>
               {/* <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-content-center">
                        <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <button type="button" className="btn btn-success btn-lg"><span className="display-5">Product</span></button>
                        </div></div>
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-content-center">
                        <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <button type="button" className="btn btn-success btn-lg"><span className="display-5">Location</span></button>
                        </div></div>
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-content-center">
                        <div className="alert alert-dismissible alert-success shadow-lg p-4 mb-4 bg-white">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <button type="button" className="btn btn-success btn-lg"><span className="display-5">User</span></button>
                        </div></div>
                </div>*/}

            </div>
        </div>
        <hr className="mt-5" />






    </>);
}

export default HomePage;