import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import AuthAlpi from '../services/AuthApi';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = ({ history }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        AuthAlpi.logout();
        setIsAuthenticated(false);
        toast.success("ora sei disconnesso dall'applicazione 😒");
        history.push("/login");

    }
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/"><span className="text-white"> Home</span></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mr-auto">

                <li className="nav-item active mx-5">
                    <Link to="/"><span className="text-white"> Home</span></Link>
                </li>
                <li className="nav-item mr-5 text-white">
                    <Link to="/productlist"><span className="text-white">Product</span></Link>
                </li>
                <li className="nav-item mr-5 text-white">
                    <Link to="/categorylist"><span className="text-white"> Category</span></Link>
                </li>
                <li className="nav-item mr-5">
                    <Link to="/locationlist"><span className="text-white"> Location</span></Link>
                </li>

            </ul>
            <ul className="navbar-nav ml-auto ">
                {!isAuthenticated && <>
                    <li className="nav-item"><NavLink to="/inscription"
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
