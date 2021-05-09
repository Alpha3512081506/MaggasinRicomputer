import React, { useContext } from 'react';
import { Redirect, Route, } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const PrivateRoute = ({ path, component ,isAuthenticated}) => {
    /*const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ?
        (<Route path={path} component={component} />) : (
            <Redirect to="/login" />);*/
    /**
     * <Route path={path}
     * render={props=>isAuthenticated ?(<CustomerPage {...props}/>):
     * (Redirect to="/login")
     * }
     * */
 return(<>
     isAuthenticated ? (<Route path={path} component={component}/>) :
     (<Redirect to="login"/>)
 </>)
}

export default PrivateRoute;