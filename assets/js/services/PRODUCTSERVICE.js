import axios from 'axios';
import { API_PRODUCT, API_URL } from './Config'

function findAll() {
    return axios
        .get(API_PRODUCT)
        .then(response => response.data['hydra:member']);
}
function findId(id) {
    return axios
        .get(API_PRODUCT + "/" + id)
        .then(response => response.data['hydra:member']);

}
function editId(id) {
    axios
        .put(API_PRODUCT + ressource + "/" + id)
        .then(response => response.data['hydra:member']);
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
    editId,
    deleteId,
    addNew,
    findId
}