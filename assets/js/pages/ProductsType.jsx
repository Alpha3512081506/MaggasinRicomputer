import React from 'react';
import { Link } from 'react-router-dom';
import Caroussel from '../components/Carousel';
const ProductsType = (props) => {
    return (<>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to={"/types/notebook"} className="nav-link" >NOTEBOOK <span className="badge badge-secondary">10</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/types/monitors"} className="nav-link" >MONITORS <span className="badge badge-secondary">80</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/types/desktop"} className="nav-link">DESKTOP <span className="badge badge-secondary">2</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/types/printers"} className="nav-link"> STAMPANTI<span className="badge badge-secondary">34</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/types/component"} className="nav-link "> COMPONENTI<span className="badge badge-secondary">54</span></Link>
                    </li>
                </ul>
            </div>
        </div>

    </>);
}

export default ProductsType;