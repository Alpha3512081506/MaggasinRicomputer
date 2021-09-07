import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from "xlsx";
import { API_DESKTOP, API_PRODUCT } from './Config';

const IMPORTXLSXDESKTOP = () => {
    const [items, setItems] = useState([]);
    //  const [isUploaded, setIsUploaded] = false;
    const [product, setProduct] = useState({});

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
            // setIsUploaded(true)

        });
    };
    if (items.length > 0) {
        console.log("************************************************************************");
        console.log(items[0])
        console.log("************************************************************************");
    }
    useEffect(() => {
        if (items.length > 0) {

            for (let i = 0; i < items.length; i++) {
                const saveData = async (data) => {
                    try {
                        const response = await axios.post(API_DESKTOP, items[i])
                        toast.success("successo registrazione")
                    } catch (error) {
                        console.log(error)
                        toast.error(error.response.data["hydra:description"])
                    }
                }
                saveData(items)

            }
        }


    }, [items]);

    return (
        <div>

            <input className="btn btn-primary btn-lg btn-block my-5"
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }}
            />

        </div>
    );
}
export default IMPORTXLSXDESKTOP