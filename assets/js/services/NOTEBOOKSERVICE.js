import React from 'react';
import axios from 'axios';
import { API_NOTEBOOK, API_URL } from './Config'

function findAllNotebook() {
    return axios
        .get(API_NOTEBOOK)
        .then(response => response.data['hydra:member']);
}
function findNotebookById(id) {
    return axios
        .get(API_NOTEBOOK + "/" + id)
        .then(response => response.data);

}
function editNotebookById(id, ressource) {
    axios
        //"https://localhost:8000/api/products/" + id, product
        .put(API_NOTEBOOK + "/" + id, ressource)
        .then(response => response.data);
}
function addNewNotebook(data) {
    return axios
        .post(API_NOTEBOOK, data);

}
function deletNotebookById(id) {
    return axios
        .delete(API_NOTEBOOK + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAllNotebook,
    editNotebookById,
    deletNotebookById,
    addNewNotebook,
    findNotebookById
}