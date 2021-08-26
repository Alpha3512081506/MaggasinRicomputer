import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import PRODUCTSERVICE from "../services/PRODUCTSERVICE";
import CATEGORYSERVICE from "../services/CATEGORYSERVICE.JS";
import LOCATIONSERVICE from "../services/LOCATIONSERVICE.JS";
import TableLoader from '../loader/ListLoader';
import ListLoader from '../loader/ListLoader';
import ExcelExporter from '../components/ExcelExporter';
import axios from 'axios';
import { API_PRINTER } from '../services/Config';
const HomePage = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [printer, setPrinter] = useState([]);
    const [locations, setLocation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const findProducts = async () => {
            try {
                const data = await PRODUCTSERVICE.findAll()
                setProducts(data)
                setLoading(false)

            } catch (e) {
                console.log(e.data)

            }
        }
        findProducts()

    }, [])
    useEffect(() => {
        const findCategory = async () => {
            try {
                const response = await CATEGORYSERVICE.findAll();
                setCategories(response)
                setLoading(false)
            } catch (e) {
                console.log(e.response)
            }
        }
        findCategory()
    }, [])




    //useEffect(() => { findCategory() }, []);
    useEffect(() => {
        const findLocations = async () => {
            try {
                const response = await LOCATIONSERVICE.findAll()
                setLocation(response)
                setLoading(false)
            } catch (e) {
                console.log(e.response)
            }
        }
        findLocations()
    }, []);
    useEffect(() => {
        const findPrinters = async () => {
            try {
                const response = await axios.get(API_PRINTER);

                setPrinter(response)
                setLoading(false)
            } catch (e) {
                console.log(e.response)
            }
        }
        findPrinters()
    }, []);
    // useEffect(() => { findProducts() }, [])
    return (<>
        {console.log(printer)}
        {loading && <ListLoader />}
        {!loading &&

            < div className="row d-flex align-items-center justify-content-between">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-3 bg-white rounded">
                    <Link to="/productlist">
                        <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-laptop fa-4x"></i>
                                    </div>
                                    <div className="col-8">

                                        <strong className="h3">NOTEBOOK</strong>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-3 bg-white rounded">
                    <Link to="/types/printers">

                        <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-print fa-4x"></i>
                                    </div>
                                    <div className="col-8">

                                        <strong className="h3">PRINTERS</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Link>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-3 bg-white rounded">
                    <Link to="/types/desktop">
                        <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-desktop fa-4x"></i>
                                    </div>
                                    <div className="col-8">
                                        <strong className="h3">DESKTOP</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-3 bg-white rounded">
                    <Link to="/types/component">
                        <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-list fa-4x"></i>
                                    </div>
                                    <div className="col-8">
                                        <strong className="h4">COMPONENTI</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-5 bg-white rounded">
                    <Link to="/categorylist">
                        <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-list fa-4x"></i>
                                    </div>
                                    <div className="col-8">
                                        <strong className="h3">Categorie</strong>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-3 bg-white rounded">
                    <Link to="/locationlist">
                        <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-home fa-4x"></i>
                                    </div>
                                    <div className="col-8">

                                        <strong className="h3">Luoghi</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-5 bg-white rounded">
                    <Link to="/types/monitors">

                        <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-desktop fa-4x"></i>
                                    </div>
                                    <div className="col-8">
                                        <strong className="h3">MONITORS</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Link>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 shadow-sm p-3 mb-5 bg-white rounded">
                    <Link to="/types/component/alert">

                        <div className="card text-white bg-warning mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-bell-o fa-4x"></i>
                                    </div>
                                    <div className="col-8">
                                        <strong className="h3">Alert</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Link>
                </div>

            </div>}

        <hr className="mt-5" />







    </>);
}

export default HomePage;