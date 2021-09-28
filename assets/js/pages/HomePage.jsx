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
import { API_MONITOR, API_PRINTER, API_URL, API_USER } from '../services/Config';
import '../../styles/bg.css';
import COMPONENTSERVICE from '../services/COMPONENTSERVICE';
import PRINTERSERVICE from '../services/PRINTERSERVICE'
import { toast } from 'react-toastify';
import DesktopService from '../services/DesktopService';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import Chart from '../components/chart/Chart';

const HomePage = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [printer, setPrinter] = useState([]);
    const [locations, setLocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [component, setComponent] = useState([]);
    const [monitor, setMonitor] = useState([]);
    const [desktop, setDesktop] = useState([]);
    const [users, setUser] = useState([]);



    useEffect(() => {
        const findProducts = async () => {
            try {
                const data = await PRODUCTSERVICE.findAll()
                setProducts(data)
                // setLoading(false)

            } catch (e) {
                console.log(e.data)

            }
        }
        findProducts()

    }, [])




    //useEffect(() => { findCategory() }, []);
    useEffect(() => {
        const findLocations = async () => {
            try {
                const response = await LOCATIONSERVICE.findAll()
                setLocation(response)
                // setLoading(false)
            } catch (e) {
                console.log(e.response)
            }
        }
        findLocations()
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const result = await axios.get(API_PRINTER);

                const result = await PRINTERSERVICE.findAllPrinter()
                // console.log(result)
                setPrinter(result);
                // toast.success("connessione al server effettuata ✔")
                // setLoading(false);
                // console.log(result)
            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error)
            }


        };

        fetchData();
    }, []);
    // useEffect(() => { findProducts() }, [])


    useEffect(() => {
        const findAll = async () => {
            try {
                const data = await LOCATIONSERVICE.findAll();
                setLocation(data);

                // setLoading(false)
            } catch (error) {
                console.log(error)
                toast.error("Devi effettuare il login per accedere alle risorse")
            }
        }
        findAll()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await COMPONENTSERVICE.findAllComponent();
                setComponent(result);
                // toast.success("connessione al server effettuata ✔")
                // setLoading(false);
                // console.log(desktop)
            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error.result)
            }


        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(API_MONITOR);
                setMonitor(result.data['hydra:member']);
                //setLoading(false);
                // console.log(desktop)
            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error)
            }


        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(API_USER);
                setUser(result.data['hydra:member']);
                //setLoading(false);
                // console.log(desktop)
            } catch (error) {
                console.log("Erreur!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                toast.error("Devi effettuare il login per accedere alle risorse")
                console.log(error)
            }


        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const result = await axios.get(API_DESKTOP);
                const result = await DesktopService.findAllDesktop();
                setDesktop(result);
                toast.success("connessione al server effettuata ✔")
                setLoading(false);

            } catch (error) {
                console.log(error)
            }


        };

        fetchData();
    }, []);
    const FilteredComponent = component.filter(c => c.quantity < 10 && c.isAlertActivate == "Sì");
    //  const [data, setCharData] = useState({});
    // const dataAray = [products.length, printer.length, component.length, desktop.length, monitor.length];
    {/**useEffect(() => {
        setCharData(
            {
                labels: ['notebook', 'printer', 'componenti', 'desktop', 'monitor'],
                datasets: [
                    {
                        label: 'Quantità In Stock',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '6800B4'],

                        borderWidth: 2,
                        data: dataAray
                        //data: [12, 19, 3, 5, 2, 3]
                    }
                ]
            });
    }, []) */ }



    return (<>
        <h3 className="text-center bg-success text-white"> PANNELLO DI CONTROLLO</h3>
        {loading && <ListLoader />}
        {!loading && <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4  bg-info shadow-p3  mb-5 bg-success rounded">
                    <h6 className="text-white text-center"><u>COMPONNEMTI CHE STANNO PER FINIRE O FINITI</u></h6>
                    <table className="my-2 table table-responsive table-stiped text-white table-hover table-bordered table-sm w-100" id="table-to-xls">
                        <thead className="thead-dark " >
                            <tr className="w-100">

                                <th >Marca</th>
                                <th>Tipo</th>
                                <th>Quantità</th>
                                <th>Luogo</th>


                            </tr>

                        </thead>
                        <tbody >
                            {FilteredComponent.map(component => <tr key={component.id}>

                                <td>{component.marque}</td>
                                <td>{component.type.substr(0, 10)}...</td>
                                <td className="text-center">{component.quantity}</td>
                                <td>{component.location.locationName}</td>
                                {/**<td>
                                <Link to={"/types/component/plus/" + component.id}><button className="btn btn-outline-primary "><i className="fa fa-plus"></i></button></Link>
                                <Link to={"/types/component/minus/" + component.id}> <button className="btn btn-outline-primary " ><i className="fa fa-minus"></i></button></Link>
                            </td>*/}


                            </tr>)}

                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>


                </div>
                <div className="col card">
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
                                                <h1>{products.length}</h1>
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

                                                <strong className="h3">PRINTER</strong>
                                                <h1>{printer.length}</h1>
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
                                                <h1>{desktop.length}</h1>
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
                                                <h1>{component.length}</h1>
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
                                                <h1>{locations.length}</h1>
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
                                                <strong className="h3">MONITOR</strong>
                                                <h1>{monitor.length}</h1>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </Link>
                        </div>

                    </div>

                    <hr className="my-3" />
                    <h4 className="text-center"> Utenti</h4>
                    {!loading &&
                        <table className="table table-responsive table-hover table-bordered table-sm  table-dark">
                            <thead >
                                <tr>
                                    <th>Nome</th>
                                    <th>Cognome</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>)}

                            </tbody>

                        </table>}
                    { /**  <Bar
                        data={data}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    /> */}



                </div>
            </div>
        </div>
        }





    </>);
}

export default HomePage;