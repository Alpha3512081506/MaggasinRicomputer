import axios from "axios";
import { API_DESKTOP } from './Config';
async function findAllDesktop() {
    const response = await axios.get(API_DESKTOP);
    return response.data['hydra:member'];
}
export default {
    findAllDesktop,
}
