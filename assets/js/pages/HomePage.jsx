import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import PRODUCTSERVICE from "../services/PRODUCTSERVICE";
import CATEGORYSERVICE from "../services/CATEGORYSERVICE.JS";
import LOCATIONSERVICE from "../services/LOCATIONSERVICE.JS";
const HomePage = (props) => {
    const [products , setProducts] =useState([])
    const [categories, setCategories] =useState([]);
    const [locations, setLocation] = useState([]);
    const findProducts=async ()=>{
       try {
           const response = await PRODUCTSERVICE.findAll()
           setProducts(response)
       }catch (e) {

       }
    }
    const findCategory=async ()=>{
        try {
          const  response =await CATEGORYSERVICE.findAll();
          setCategories(categories)
        }catch (e) {

        }
    }
    const findLocations=async ()=>{
     try {
         const response = LOCATIONSERVICE.findAll()
         setLocation(response)
     }  catch (e) {

     }
    }
    useEffect(findCategory(),[]);
    useEffect(findLocations,[]);
    useEffect(findProducts,[])
    return (<>
        <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 shadow-sm p-3 mb-3 bg-white rounded">
                <Link to="/productlist">
                    <div className="card text-white bg-success mb-3" style={{maxWidth:"20rem"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <i className="fa fa-list fa-4x"></i>
                                </div>
                                <div className="col-8">
                                    <h2 className="card-title">0
                                    </h2>
                                    <strong className="h2">Products</strong>
                                </div>
                            </div>

                        </div>
                    </div>
                </Link>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 shadow-sm p-3 mb-3 bg-white rounded">
                <Link to="/categorylist">

                        <div className="card text-white bg-success mb-3"style={{maxWidth:"20rem"}}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fa fa-list fa-4x"></i>
                                    </div>
                                    <div className="col-8">
                                        <h2 className="card-title">0</h2>
                                        <strong className="h2">Categories</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                </Link>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 shadow-sm p-3 mb-3 bg-white rounded">
                <Link to="/locationlist">
                    <div className="card text-white bg-success mb-3" style={{maxWidth:"20rem"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <i className="fa fa-list fa-4x"></i>
                                </div>
                                <div className="col-8">
                                    <h2 className="card-title">0</h2>
                                    <strong className="h2">Locations</strong>
                                </div>
                            </div>

                        </div>
                    </div>

                </Link>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 shadow-sm p-3 mb-3 bg-white rounded">
                <Link to="/users">
                    <div className="card text-white bg-success mb-3" style={{maxWidth:"20rem"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <i className="fa fa-users fa-4x"></i>
                                </div>
                                <div className="col-8">
                                    <h2 className="card-title">0</h2>
                                    <strong className="h2">Users</strong>
                                </div>
                            </div>

                        </div>
                    </div>

                </Link>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 shadow-sm p-3 mb-3 bg-white rounded">
                <Link to="/users">
                    <div className="card text-white bg-success mb-3" style={{maxWidth:"20rem"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <i className="fa fa-arrow-up fa-4x"></i>
                                </div>
                                <div className="col-8">
                                    <h2 className="card-title">0</h2>
                                    <strong className="h2">StockInput</strong>
                                </div>
                            </div>

                        </div>
                    </div>

                </Link>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white rounded">
                <Link to="/users">
                    <div className="card text-white bg-success mb-3" style={{maxWidth:"20rem"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <i className="fa fa-arrow-down fa-4x"></i>
                                </div>
                                <div className="col-8">
                                    <h2 className="card-title">0</h2>
                                    <strong className="h2">StokUscito</strong>
                                </div>
                            </div>


                        </div>
                    </div>

                </Link>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white rounded">
                <Link to="/categorylist">

                    <div className="card text-white bg-warning mb-3"style={{maxWidth:"20rem"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <i className="fa fa-bell-o fa-4x"></i>
                                </div>
                                <div className="col-8">
                                    <h2 className="card-title">0</h2>
                                    <strong className="h2">Alert</strong>
                                </div>
                            </div>

                        </div>
                    </div>

                </Link>
            </div>

            </div>

        <hr className="mt-5" />
        <Alert />






    </>);
}

export default HomePage;