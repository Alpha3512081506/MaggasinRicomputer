import React, { useEffect } from 'react';
import APISERVICE from '../services/APISERVICE';
const ProductShow = (props) => {
    const [product, setProduct] = useState([]);
    const prodcutShow = async () => {
        try {
            const data = await APISERVICE.findId()
            setProduct(data)
        } catch (error) {
            console.log("console ")
        }

    }
    useEffect({
        prodcutShow()
    }, [id])
    return (<>
    </>);
}

export default ProductShow;