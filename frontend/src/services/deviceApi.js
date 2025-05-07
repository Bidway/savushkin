import { api } from './apiConfig';

export const fetchDevices = async () => {
    try {
        const response = await api.get('/api/devices');
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
};

export const deleteDevice = async (id) => {
    try {
        await api.delete(`/api/devices/${id}`);
    } catch (error) {
        console.error(`Error deleting devices:`, error);
        throw error;
    }
};

export const createDevice = async (deviceData) => {
    try {
        const response = await api().post('/api/devices', deviceData);
        return response.data;
    } catch (error) {
        console.error('Error creating device:', error);
        throw error;
    }
};

export const updateDevice = async (id, data) => {
    try {
        const response = await api.put(`/api/devices/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating devices:`, error);
        throw error;
    }
};