import React, {useEffect, useState} from "react";
import PRODUCTSERVICE from "../services/PRODUCTSERVICE";

const ShowProductById = (props)=>{
 /*   const [product , setProduct]= useState();
    useEffect(async ()=>{
       const data= await PRODUCTSERVICE.findId(id);
           setProduct(data)
        console.log(data)

    },[product.id])
    const handleShow=async(id)=>{
      try {
          const p= await PRODUCTSERVICE.findId(id)
      }  catch(error){console.log(error.response)}

    }
*/
    return(
        <>
            <div className="card bg-success">
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-light">ProductId: </li>
                        <li className="list-group-item">ProductName:</li>
                        <li className="list-group-item">Category:</li>
                        <li className="list-group-item">Location:</li>
                        <li className="list-group-item">currentQuantity:</li>
                        <li className="list-group-item">alertQuantity:</li>
                        <li className="list-group-item">Marque:</li>
                        <li className="list-group-item">Model:</li>
                        <li className="list-group-item">Specifiche:</li>
                        <li className="list-group-item">customField1:</li>
                        <li className="list-group-item">customField2:</li>
                        <li className="list-group-item">customField3:</li>
                        <li className="list-group-item">Note:</li>

                    </ul>
                </div>
            </div>
        </>
    )
}
export default ShowProductById ;