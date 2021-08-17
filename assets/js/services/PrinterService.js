import React from 'react';
import axios from 'axios';
import { API_PRINTER } from './Config';


async function findAllPrinter() {
    const response = await axios
        .get(API_PRINTER);
    return response.data['hydra:member'];
}
async function findPrinterById(id) {
    const response = await axios
        .get(API_PRINTER + "/" + id);
    return response.data;

}
function editPrinterById(id, ressource) {
    axios
        //"https://localhost:8000/api/products/" + id, product
        .put(API_PRINTER + "/" + id, ressource)
        .then(response => response.data);
}
function addNewPrinter(data) {
    return axios
        .post(API_PRINTER, data);

}
function deletPrinterById(id) {
    return axios
        .delete(API_PRINTER + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAllPrinter,
    editPrinterById,
    deletPrinterById,
    addNewPrinter,
    findPrinterById
}

