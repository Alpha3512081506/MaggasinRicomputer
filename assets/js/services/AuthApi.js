import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_API } from './Config';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            //je stock le token dans mon localStorage
            window.localStorage.setItem("authToken", token);
            setAxiosToken(token);

        });


}
function setAxiosToken(token) {
    // je previent a axios que maintenant j'ai des en tetes par defaut pour toutes mes requestes HTTP
    return axios.defaults.headers["Authorization"] = "Bearer " + token;
}
function setUp() {
    //voir si on a le token
    const token = window.localStorage.getItem("authToken");
    if (token) {
        //console.log(jwtDecode(token).exp * 1000)
        // console.log(new Date().getTime()) en second
        //Decoder le token pour recuprer la date d'expiration
        //exp: la date d'expiration du token exprimè en timestamp

        const { exp: expiration } = jwtDecode(token);
        //Verifier que le token est valide
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);

        } else {
            logout();
        }
    } else {
        logout();
    }


}
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        //Date()getTime() en ms et exp en seconde on converti en ms
        if (expiration * 1000 > new Date().getTime()) {

            return true;
        }
        //si le token est expirè
        return false;
    }
    //s'il ya pas de token
    return false;
}
export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
}