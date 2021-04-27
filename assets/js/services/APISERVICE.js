import axios from 'axios';
import { API_URL } from './Config'

function findAll(resource) {
    return axios
        .get(API_URL + resource)
        .then(response => response.data['hydra:member']);
}
function findId(ressource, id) {
    return axios
        .get(API_URL + ressource + "/" + id)
        .then(response => response.data['hydra:member']);

}
function editId(ressource, id) {
    axios
        .put(API_URL + ressource + "/" + id)
        .then(response => response.data['hydra:member']);
}
function addNew(resource, data) {
    return axios
        .post(API_URL + resource, data);

}
function deleteId(id, ressource) {
    return axios
        .delete(API_URL + ressource + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAll,
    editId,
    deleteId,
    addNew,
    findId
}