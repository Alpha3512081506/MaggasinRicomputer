import axios from 'axios';
import { API_CATEGORY } from './Config'

function findAll() {
    return axios
        .get(API_CATEGORY)
        .then(response => response.data['hydra:member']);
}
async function findCategoryById(id) {
    const response = await axios
        .get(API_CATEGORY + "/" + id);
    return response.data;

}
function editCategoryById(id, resource) {
    axios
        .put(API_CATEGORY + "/" + id, resource)
        .then(response => response.data);
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
    editCategoryById,
    deleteId,
    addNew,
    findCategoryById
}