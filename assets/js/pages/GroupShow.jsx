import React from 'react';
import { toast } from 'react-toastify';
import GROUPSERVICE from '../services/GROUPSERVICE';
const GroupShow = (props) => {
    const [group, setGroup] = useState([]);
    const findGroup = async (id) => {
        try {
            const response = await GROUPSERVICE.findId(id);
            setGroup(response)
            toast.success("connessione al server effettuata ✔ ")
        } catch (error) {
            console.log(error.response)
            toast.error("Error")
        }
    }
    useEffect(() => { findGroup(id) }, [id]);
    return (<>
        <h1>Group Show</h1>
    </>);
}

export default GroupShow;