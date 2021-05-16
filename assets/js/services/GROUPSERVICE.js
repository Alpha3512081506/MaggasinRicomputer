import axios from 'axios';
import { API_GROUP, API_URL } from './Config'

function findAll() {
    return axios
        .get(API_GROUP)
        .then(response => response.data['hydra:member']);
}
function findId(id) {
    return axios
        .get(API_GROUP + "/" + id)
        .then(response => response.data['hydra:member']);

}
function editId(id) {
    axios
        .put(API_GROUP + ressource + "/" + id)
        .then(response => response.data['hydra:member']);
}
function addNew(data) {
    return axios
        .post(API_GROUP, data);

}
function deleteId(id) {
    return axios
        .delete(API_GROUP + "/" + id);

}

export default {
    findAll,
    editId,
    deleteId,
    addNew,
    findId
}