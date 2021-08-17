import axios from 'axios';
import { API_PRODUCT, API_URL } from './Config'

function findAll() {
    return axios
        .get(API_PRODUCT)
        .then(response => response.data['hydra:member']);
}
async function finProductdById(id) {
    const response = await axios
        .get(API_PRODUCT + "/" + id);
    return response.data;

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
async function deleteId(id) {
    const response = await axios
        .delete(API_PRODUCT + "/" + id);
    return console.log(response);
}

export default {
    findAll,
    editProductById,
    deleteId,
    addNew,
    finProductdById
}