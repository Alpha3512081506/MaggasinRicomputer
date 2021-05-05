import axios from 'axios';
import { API_CATEGORY, API_URL } from './Config'

function findAll() {
    return axios
        .get(API_CATEGORY)
        .then(response => response.data['hydra:member']);
}
function findId(id) {
    return axios
        .get(API_CATEGORY + "/" + id)
        .then(response => response.data['hydra:member']);

}
function editId(id) {
    axios
        .put(API_CATEGORY + ressource + "/" + id)
        .then(response => response.data['hydra:member']);
}
function addNew(data) {
    return axios
        .post(API_CATEGORY, data);

}
function deleteId(id) {
    return axios
        .delete(API_CATEGORY + "/" + id);

}

export default {
    findAll,
    editId,
    deleteId,
    addNew,
    findId
}