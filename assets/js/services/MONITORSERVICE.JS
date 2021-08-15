import React from 'react';
import axios from 'axios';
import { API_MONITOR } from './Config';


function findAllMonitor() {
    return axios
        .get(API_MONITOR)
        .then(response => response.data['hydra:member']);
}
function findMonitorById(id) {
    return axios
        .get(API_MONITOR + "/" + id)
        .then(response => response.data);

}
async function editMonitorById(id, ressource) {
    await axios
        //"https://localhost:8000/api/products/" + id, product
        .put(API_MONITOR + "/" + id, ressource)
        .then(response => response.data);
}
function addNewMonitor(data) {
    return axios
        .post(API_MONITOR, data);

}
function deletMonitorById(id) {
    return axios
        .delete(API_MONITOR + "/" + id)
        .then(response => console.log(response));
}

export default {
    findAllMonitor,
    editMonitorById,
    deletMonitorById,
    addNewMonitor,
    findMonitorById
}

