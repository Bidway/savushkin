import axios from 'axios';

const API_URL = 'http://localhost:8080/api/subnets';

export const getSubnets = async (siteId = null) => {
    const params = siteId ? { siteId } : {};
    return axios.get(API_URL, { params }).then(res => res.data);
};

export const getSubnetsWithDevices = async (siteId) => {
    return axios.get(`${API_URL}/with-devices`, { params: { siteId } }).then(res => res.data);
};

export const getSubnetById = async (id) => {
    return axios.get(`${API_URL}/${id}`).then(res => res.data);
};

export const createSubnet = async (subnetData) => {
    return axios.post(API_URL, subnetData).then(res => res.data);
};

export const updateSubnet = async (id, updateData) => {
    return axios.put(`${API_URL}/${id}`, updateData).then(res => res.data);
};

export const deleteSubnet = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};