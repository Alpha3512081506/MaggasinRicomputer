import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import APISERVICE from '../services/PRODUCTSERVICE';
import AuthApi from '../services/AuthApi';
const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    //Gestion des Champs 
    const handleChang = ({ currentTarget }) => {
        const { value, name } = currentTarget;

        setCredentials({ ...credentials, [name]: value });
    }
    //Gestion du Submit
    const handleSubmit = async event => {
        event.preventDefault();
        /*   try {
              await AuthApi.authenticate(credentials);
              // console.log(credentials)
              setIsAuthenticated(true);
              toast.success("Ben tornato 🙌❤");
              setError("");
              history.replace("/#");
  
          } catch (error) {
              console.log(error.response)
              setError("Nessun Account Ha Questo Indirizzo o Le Informazioni Non Corrispondono");
              toast.error("si è verificato un errore");
          } */
        try {
            await AuthApi.authenticate(credentials);

            // const token = await axios.post("https://localhost:8000/api/login_check", credentials)
            //     .then(response => response.data.token);
            // setError("");
            // window.localStorage.setItem("authToken", token);
            // axios.defaults.headers["Authorization"] = "Bearer " + token;
            // const test = await APISERVICE.findAll("products");
            // console.log(test);
            setError("");
            history.replace("/#");
            toast.success("Ben tornato 🙌❤");

        } catch (error) {

            setError("Nessun Account Ha Questo Indirizzo o Le Informazioni Non Corrispondono");
            toast.error("si è verificato un errore");


        }
    }
    return (<>
        <h1>Connect to App</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="username">Indirizzo email</label>
                <input type="email"
                    name="username" className={"form-control" + (error && " is-invalid")}
                    id="username"
                    placeholder="indirizzo email di connessione "
                    value={credentials.username}
                    onChange={handleChang}
                />
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
            <div className="form-group"><label htmlFor="password">Password</label>
                <input type="password" value={credentials.password}
                    name="password" className="form-control"
                    id="password"
                    placeholder="password per collegarsi"
                    onChange={handleChang}
                /></div>
            <div className="form-group"><button type="submit" className="btn btn-success">Connect</button></div>
        </form>
    </>);
}

export default LoginPage;