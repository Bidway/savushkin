import axios from 'axios';

const API_URL = 'http://localhost:8080/api/metadata';

export const getMetadata = async () => {
    return axios.get(API_URL).then(res => res.data);
};

export const getMetadataById = async (id) => {
    return axios.get(`${API_URL}/${id}`).then(res => res.data);
};

export const createMetadata = async (metadata) => {
    return axios.post(API_URL, metadata).then(res => res.data);
};

export const deleteMetadata = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};