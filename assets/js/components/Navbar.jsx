import React, { /*useContext*/ } from 'react'
import { Link, NavLink } from 'react-router-dom';
import AuthAlpi from '../services/AuthApi';
import { toast } from 'react-toastify';


const Navbar = ({ history, isAuthenticated, onLogout }) => {
    //   const { isAuthenticated, onLogout } = useContext(AuthContext);
    //const [isAuthenticated, onLogout] = useState(true);;
    const handleLogout = () => {
        onLogout(false)
        AuthAlpi.logout();
        toast.info("ora sei disconnesso dall'applicazione 😒");
        history.push("/login");

    }
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" ></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
            aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item mr-5 text-white">
                    <Link to="/"><span className="text-white active">Home</span></Link>
                </li>
                {/**  <li className="nav-item mr-5 text-white">
                    <Link to="/productlist"><span className="text-white">Product</span></Link>
                </li>
                <li className="nav-item mr-5 text-white">
                    <Link to="/categorylist"><span className="text-white"> Category</span></Link>
                </li>
                <li className="nav-item mr-5 text-white">
                    <Link to="/productlist"><span className="text-white">Product</span></Link>
                </li>
                <li className="nav-item mr-5 text-white">
                    <Link to="/categorylist"><span className="text-white"> Category</span></Link>
                </li> */}
                <li className="nav-item mr-5">
                    <a className="nav-link " href="https://ricomputer.net/" target="_blank">Vai Negozzio</a>
                </li>
                <li className="nav-item mr-5">
                    <a className="nav-link " href="https://agazzino.website/ricomputer/magazzino" target="_blank">Visita Magazzini</a>
                </li>

            </ul>
            {/* <ul className="navbar-nav ml-auto ">

                <li className="nav-item"><NavLink to="/inscription"
                    className="nav-link">Inscription</NavLink></li>
                <li className="nav-item"><NavLink to="/login"
                    className="btn btn-success mx-3">connexion</NavLink></li>
                <li className="nav-item"><button onClick={handleLogout}
                    className="btn btn-danger">logout</button></li>

            </ul>*/}
            <ul className="navbar-nav ml-auto ">
                {!isAuthenticated && <>
                    <li className="nav-item" desabled="true"><NavLink to="/inscription"
                        className="nav-link">Inscription</NavLink></li>
                    <li className="nav-item"><NavLink to="/login"
                        className="btn btn-success mx-3">connexion</NavLink></li>
                </> || <li className="nav-item"><button onClick={handleLogout}
                    className="btn btn-danger">logout</button></li>
                }
            </ul>
        </div>
    </nav>



    );
}

export default Navbar;
