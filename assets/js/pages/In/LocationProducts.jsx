import React, { useEffect } from 'react';
const LocationProducts = (props) => {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const findAll = async () => {
        try {
            const data = await APISERVICE.findAll();
            setProduct(data);
            setLoading(false)
            toast.success("connessione al server effettuata ✔")
        } catch (error) {
            toast.error("Devi effettuare il login per accedere alle risorse");
        }

    }
    useEffect(() => { findAll() }, []);
    return (<>
        <h1>Hello le test</h1>
    </>);
}

export default LocationProducts;