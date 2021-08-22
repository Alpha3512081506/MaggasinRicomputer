import React, { useContext, useState } from 'react';
import ReactDom from 'react-dom';
import { Route, Switch, HashRouter, withRouter, Redirect } from 'react-router-dom';
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/popper.js/dist/popper.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../node_modules/font-awesome/css/font-awesome.css"

// any CSS you import will output into a single css file (app.css in this case)
import './styles/bootswatch.css';
import './styles/app.css';
import './styles/tooltype.css';


// start the Stimulus application
import './bootstrap';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import ProductList from './js/pages/ProductList';
import Location from './js/pages/Location';
import CategoryPage from './js/pages/CategoriesPage';
import LoginPage from './js/pages/LoginPage';
import AuthApi from './js/services/AuthApi';
import AuthContext from './js/context/AuthContext';
import PrivateRoute from './js/components/PrivateRoute';
import ProductNew from './js/pages/ProductNew';
import CategoryAdd from './js/pages/CategoryAdd';
import LocationAdd from './js/pages/LocationAdd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowProductById from "./js/pages/ShowProductById";
import Registration from './js/pages/Registration.jsx';
import Product from "./js/pages/Product";
import ErrorBoundary from './js/services/ErrorBoundary.jsx';
import CategoryProducts from './js/pages/In/CategoryProducts.jsx';
import LocationProducts from './js/pages/In/LocationProducts.jsx';
import ProductsType from './js/pages/ProductsType.jsx';
import NoteBookShow from './js/pages/Type/NoteBook/NoteBookShow.jsx';
import NoteBookAdd from './js/pages/Type/NoteBook/NoteBookAdd.jsx';
import DesktopShow from './js/pages/Type/NoteBook/Desktop/Desktop.jsx';
import GroupedProduct from './js/pages/Type/Componenti/Componenti.jsx';
import PrinterShow from './js/pages/Type/Printer/PrinterShow.jsx';
import PrinterAdd from './js/pages/Type/Printer/PrinterAdd.jsx';
import DesktopAdd from './js/pages/Type/NoteBook/Desktop/DesktopAdd.jsx';
import Componenti from './js/pages/Type/Componenti/Componenti.jsx';
import ComponentAdd from './js/pages/Type/Componenti/ComponentAdd.jsx';
import MonitorAdd from './js/pages/Type/monitors/MonitorAdd.jsx';
import MonitorShow from './js/pages/Type/monitors/MonitorShow.jsx';
import ComponentAddQuantity from './js/pages/Type/Componenti/ComponentAddQuantity.jsx';
import ComponentAddMinusQuantity from './js/pages/Type/Componenti/ComponentAddMinusQuantity.jsx';
import AlertQuantity from './js/pages/AlertQuantity.jsx';

AuthApi.setUp();



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());
    //const [isAuthenticated, setIsAuthenticated] = useState(false);

    const NavbarWithRouter = withRouter(Navbar);
    /**
     * <AuthContext.Provider value={isAuthenticated,
            setIsAuthenticated}>
            <HashRouter>
                <NavbarWithRouter isAuthenticated={isAuthenticated} />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" render={(props) => <LoginPage isAuthenticated={isAuthenticated}
                            onLogin={setIsAuthenticated} />} />
                        <PrivateRoute path="/locationlist" component={Location}
                        />
                        <Route path="/productlist" component={ProductList} />
                        <PrivateRoute path="/productadd" component={ProductNew} />
                        <PrivateRoute path="/categoryadd" component={CategoryAdd} />
                        <PrivateRoute path="/locationadd" component={LocationAdd} />
                        <PrivateRoute path="/categorylist" component={CategoryPage} />
                        <PrivateRoute exact={true} path="/" component={HomePage} />

                    </Switch>

                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </AuthContext.Provider>
     */

    return (<>
        <HashRouter>
            <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
            <main className="container pt-5">
                <ErrorBoundary>
                    <Switch>
                        <Route path="/login" render={props => <LoginPage isAuthenticated={isAuthenticated} {...props}
                            onLogin={setIsAuthenticated} />} />
                        {/* ===============CATEGORIES ROUTES ========================*/}
                        <Route path="/categorylist/:id"
                            render={props => isAuthenticated ? (< CategoryAdd{...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/categorylist"
                            render={props => isAuthenticated ? (< CategoryPage{...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route exact={true} path="/" render={props => isAuthenticated ? (< HomePage{...props} />) :
                            (<Redirect to="/login" />)} />

                        {/* ===============LOCATIONS ROUTES ========================*/}
                        <Route path="/location/products/show/:id"
                            render={props => isAuthenticated ? (< LocationProducts {...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/locationlist/:id"
                            render={props => isAuthenticated ? (< LocationAdd{...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/locationlist"
                            render={props => isAuthenticated ? (< Location{...props} />) :
                                (<Redirect to="/login" />)} />
                        {/* ===============PRODUCTS ROUTES ========================*/}
                        <Route path="/productlist/show/:id"
                            render={props => isAuthenticated ? (< ShowProductById {...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/category/products/show/:id"
                            render={props => isAuthenticated ? (< CategoryProducts{...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/productlist/:id"
                            render={props => isAuthenticated ? (< ProductNew{...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/productlist"
                            render={props => isAuthenticated ? (<ProductList {...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/inscription" component={Registration} />
                        <Route path="/productadd"
                            render={props => isAuthenticated ? (< ProductNew{...props} />) :
                                (<Redirect to="/login" />)} />
                        {/* ===============NoteBook ROUTES ========================*/}
                        <Route path="/types/notebook/add/:id"
                            render={props => isAuthenticated ? (<NoteBookAdd{...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/types/notebook"
                            render={props => isAuthenticated ? (<NoteBookShow{...props} />) :
                                (<Redirect to="/login" />)} />


                        {/* ===============Desktop ROUTES ========================*/}
                        <Route path="/types/desktop/add/:id"
                            render={props => isAuthenticated ? (<DesktopAdd {...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/types/desktop"
                            render={props => isAuthenticated ? (<DesktopShow {...props} />) :
                                (<Redirect to="/login" />)} />


                        {/* ===============Desktop ROUTES ========================*/}

                        <Route path="/types/component/plus/:id"
                            render={props => isAuthenticated ? (<ComponentAddQuantity {...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/types/component/minus/:id"
                            render={props => isAuthenticated ? (<ComponentAddMinusQuantity {...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/types/component/add/:id"
                            render={props => isAuthenticated ? (<ComponentAdd{...props} />) :
                                (<Redirect to="/login" />)} />

                        <Route path="/types/component/alert"
                            render={props => isAuthenticated ? (<AlertQuantity {...props} />) :
                                (<Redirect to="/login" />)} />
                        <Route path="/types/component"
                            render={props => isAuthenticated ? (<Componenti {...props} />) :
                                (<Redirect to="/login" />)} />
                        {/* ===============Monitor ROUTES ========================*/}

                        <Route path="/types/monitors/add/:id"
                            render={props => isAuthenticated ? (<MonitorAdd {...props} />) : (<Redirect to={"/login"} />)} />
                        <Route path="/types/monitors"
                            render={props => isAuthenticated ? (<MonitorShow {...props} />) :
                                (<Redirect to="/login" />)} />



                        {/* ===============Desktop ROUTES ========================*/}

                        <Route path="/types/printers/add/:id"
                            render={props => isAuthenticated ? (<PrinterAdd {...props} />) : (<Redirect to={"/login"} />)} />
                        <Route path="/types/printers"
                            render={props => isAuthenticated ? (<PrinterShow {...props} />) :
                                (<Redirect to="/login" />)} />

                        <Route path="/types"
                            render={props => isAuthenticated ? (< ProductsType{...props} />) :
                                (<Redirect to="/login" />)} />


                    </Switch>
                </ErrorBoundary>

            </main>
        </HashRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
    );
}
const rootElement = document.querySelector("#app");
ReactDom.render(<App />, rootElement)

