import axios from 'axios';
import { API_COMPONENNT } from './Config'

function findAllComponent() {
    return axios
        .get(API_COMPONENNT)
        .then(response => response.data['hydra:member']);
}
function finComponentById(id) {
    return axios
        .get(API_COMPONENNT + "/" + id)
        .then(response => response.data);

}

const getById = id => {
    return axios.get(API_COMPONENNT + `/${id}`);
}
function editComponentById(id, ressource) {
    axios
        //"https://localhost:8000/api/Components/" + id, Component
        .put(API_COMPONENNT + "/" + id, ressource)
        .then(response => response.data);
}
function addNewComponent(data) {
    return axios
        .post(API_COMPONENNT, data);

}
function deleteComponentById(id) {
    return axios
        .delete(API_COMPONENNT + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAllComponent,
    editComponentById,
    deleteComponentById,
    addNewComponent,
    finComponentById
}