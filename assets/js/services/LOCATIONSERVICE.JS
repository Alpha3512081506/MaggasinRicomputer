import axios from 'axios';
import { API_LOCATION } from './Config'

function findAll() {
    return axios
        .get(API_LOCATION)
        .then(response => response.data['hydra:member']);
}
function findId(id) {
    return axios
        .get(API_LOCATION + "/" + id)
        .then(response => response.data['hydra:member']);

}
function editId(id) {
    axios
        .put(API_LOCATION + ressource + "/" + id)
        .then(response => response.data['hydra:member']);
}
function addNew(data) {
    return axios
        .post(API_LOCATION, data);

}
function deleteId(id) {
    return axios
        .delete(API_LOCATION + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAll,
    editId,
    deleteId,
    addNew,
    findId
}