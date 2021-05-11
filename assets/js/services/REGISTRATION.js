import axios from 'axios';
import { API_USER, API_URL } from './Config'

function findAll() {
    return axios
        .get(API_USER)
        .then(response => response.data['hydra:member']);
}
function findId(id) {
    return axios
        .get(API_USER + "/" + id)
        .then(response => response.data['hydra:member']);

}
function editId(id) {
    axios
        .put(API_USER + ressource + "/" + id)
        .then(response => response.data['hydra:member']);
}
function addNew(data) {
    return axios
        .post(API_USER, data);

}
function deleteId(id) {
    return axios
        .delete(API_USER + "/" + id);

}

export default {
    findAll,
    editId,
    deleteId,
    addNew,
    findId
}