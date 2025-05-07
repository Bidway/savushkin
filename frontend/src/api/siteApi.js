import axios from 'axios';

const API_URL = 'http://localhost:8080/api/sites';

export const getSites = async () => {
    return axios.get(API_URL).then(res => res.data);
};

export const createSite = async (site) => {
    return axios.post(API_URL, site).then(res => res.data);
};

export const deleteSite = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};