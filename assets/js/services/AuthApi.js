import axios from 'axios';
import jwtDecode from 'jwt-decode';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
};

function authenticate(credentials) {
    return axios
        .post("https://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            setAxiosToken(token);

        });


}
function setAxiosToken(token) {
    return axios.defaults.headers["Authorization"] = "Bearer " + token;
}
function setUp() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        //console.log(jwtDecode(token).exp * 1000)
        // console.log(new Date().getTime())
        const { exp: expiration } = jwtDecode(token);

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