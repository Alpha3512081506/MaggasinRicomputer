import axios from 'axios';
import { API_COMPONENNT } from './Config'

async function findAllComponent() {
    const response = await axios
        .get(API_COMPONENNT);
    return response.data['hydra:member'];
}
async function finComponentById(id) {
    const response = await axios
        .get(API_COMPONENNT + "/" + id);
    return response.data;

}

const getById = id => {
    return axios.get(API_COMPONENNT + `/${id}`);
}
async function editComponentById(id, ressource) {
    await axios
        //"https://localhost:8000/api/Components/" + id, Component
        .put(API_COMPONENNT + "/" + id, ressource)
        .then(response => response.data);
}
function addNewComponent(data) {
    return axios
        .post(API_COMPONENNT, data);

}
async function deleteComponentById(id) {
    const response = await axios
        .delete(API_COMPONENNT + "/" + id);
    return console.log(response);
}

export default {
    findAllComponent,
    editComponentById,
    deleteComponentById,
    addNewComponent,
    finComponentById
}