import React from 'react';
import axios from 'axios';
import { API_DESKTOP } from './Config';


function findAllDesktop() {
    return axios
        .get(API_DESKTOP)
        .then(response => response.data['hydra:member']);
}
function findDesktopById(id) {
    return axios
        .get(API_DESKTOP + "/" + id)
        .then(response => response.data);

}
async function editDesktopById(id, ressource) {
    await axios
        //"https://localhost:8000/api/products/" + id, product
        .put(API_DESKTOP + "/" + id, ressource)
        .then(response => response.data);
}
function addNewDesktop(data) {
    return axios
        .post(API_DESKTOP, data);

}
function deletDesktopById(id) {
    return axios
        .delete(API_DESKTOP + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAllDesktop,
    editDesktopById,
    deletDesktopById,
    addNewDesktop,
    findDesktopById
}

