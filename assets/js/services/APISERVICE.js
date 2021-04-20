import axios from 'axios';
let url = "https://localhost:8000/api/";
function findAll(resource) {
    return axios
        .get(url + resource)
        .then(response => response.data['hydra:member']);
}
function findId(ressource, id) {
    return axios
        .get(url + ressource + "/" + id)
        .then(response => response.data['hydra:member']);

}
function editId(ressource, id) {
    axios
        .put(url + ressource + "/" + id)
        .then(response => response.data['hydra:member']);
}
function addNew(resource, data) {
    return axios
        .post(url + resource, data);

}
function deleteId(id, ressource) {
    return axios
        .delete(url + ressource + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAll,
    editId,
    deleteId,
    addNew,
    findId
}