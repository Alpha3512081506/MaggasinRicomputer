import axios from 'axios';
import { API_PRODUCT, API_URL } from './Config'

function findAll() {
    return axios
        .get(API_PRODUCT)
        .then(response => response.data['hydra:member']);
}
function finProductdById(id) {
    return axios
        .get(API_PRODUCT + "/" + id)
        .then(response => response.data);

}
function editProductById(id, ressource) {
    axios
        //"https://localhost:8000/api/products/" + id, product
        .put(API_PRODUCT + "/" + id, ressource)
        .then(response => response.data);
}
function addNew(data) {
    return axios
        .post(API_PRODUCT, data);

}
function deleteId(id) {
    return axios
        .delete(API_PRODUCT + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAll,
    editProductById,
    deleteId,
    addNew,
    finProductdById
}