import axios from 'axios';

const API_URL = 'http://localhost:8080/api/devices';

export const getDevices = async (subnetId = null) => {
    try {
        const params = subnetId ? { subnetId } : {};
        const response = await axios.get(API_URL, { params });
        return response.data || []; // Гарантируем возврат массива
    } catch (error) {
        console.error('Error fetching devices:', error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
};

export const getDeviceById = async (id) => {
    return axios.get(`${API_URL}/${id}`).then(res => res.data);
};

export const createDevice = async (device) => {
    return axios.post(API_URL, device).then(res => res.data);
};

export const updateDevice = async (id, updateData) => {
    return axios.put(`${API_URL}/${id}`, updateData).then(res => res.data);
};

export const deleteDevice = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
