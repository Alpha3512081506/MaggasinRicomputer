import axios from 'axios';
import { API_LOCATION } from './Config'

function findAll() {
    return axios
        .get(API_LOCATION)
        .then(response => response.data['hydra:member']);
}
function findlocationById(id) {
    return axios
        .get(API_LOCATION + "/" + id)
        .then(response => response.data);

}
function editLocationById(id, ressourc) {
    axios
        .put(API_LOCATION + "/" + id, ressource)

}
function addNew(data) {
    return axios
        .post(API_LOCATION, data);

}
async function deleteId(id) {
    const response = await axios
        .delete(API_LOCATION + "/" + id);
    return console.log(response);
}

export default {
    findAll,
    editLocationById,
    deleteId,
    addNew,
    findlocationById
}