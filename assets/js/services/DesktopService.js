import axios from "axios";
import { API_DESKTOP } from './Config';
function findAllDesktop() {
    return axios.get(API_DESKTOP)
        .then(response => response.data['hydra:member']);
}
export default {
    findAllDesktop,
}
