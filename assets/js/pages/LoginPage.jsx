import React, {useState} from 'react';
import Field from "../form/Field";
import {Link} from "react-router-dom";
import AuthAPI from "../services/AuthApi";
import {toast} from "react-toastify";
const LoginPage = ({onLogin,history}) => {

    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    })
    const [errors, setErrors] = useState("");
    //Gestion dess Champs
    const handleChange=({currentTarget})=>{
        const {name, value}=currentTarget
        setCredentials({...credentials, [name]: value})
    }
    //Gestion du Submit
    const handleSubmit = async event=>{
        event.preventDefault();
        try {
            const response = await AuthAPI.authenticate(credentials)
          // const response = await axios.post(LOGIN_API,credentials)
            toast.success("Ben Tornato  ✅✅✅")
            setErrors("");
            onLogin(true)
            history.replace("/")


        }catch (error) {
            setErrors("Invalide Credentials, il Nome dell'Utente o La Password non è Corretto ")
            toast.error("C'è Stato un errore 🥱🥱🥱🥱🥱🥱")
            console.log(error.response)
        }


    }
    return (<>
            <h1>Connect To App</h1>
        <form onSubmit={handleSubmit}>
            <Field name="username"
                   icon="fa fa-user"
                   label="Nome del'Utente" placeholder="Nome del'Utente"
                   onChange={handleChange}
                   value={credentials.username}
                   error={errors}
            />
        <Field name="password"
               type="password"
               icon="fa fa-unlock"
               label="Password" placeholder="password"
               onChange={handleChange}
               value={credentials.password}
               error={errors}
        />
            <div className="form-group align-items-center">
                <button type="submit" className="btn btn-outline-success mr-4">Login</button>
                <Link to="/registration"><button className="btn btn-outline-success mr-4 ">Register</button>
                </Link>

            </div>
        </form>
    </>);
}

export default LoginPage;