import { api } from './apiConfig';

export const fetchInterfaces = async () => {
    try {
        const response = await api.get('/api/interfaces');
        return response.data;
    } catch (error) {
        console.error('Error fetching interfaces:', error);
        throw error;
    }
};

export const deleteInterface = async (id) => {
    try {
        await api.delete(`/api/interfaces/${id}`);

    } catch (error) {
        console.error(`Error deleting interfaces:`, error);
        throw error;
    }
};


export const createInterface = async (interfaceData) => {
    try {
        const  response = await api.post('/api/interfaces', interfaceData);
        return response.data;
    } catch (error) {
        console.error('Error creating interface:', error);
        throw error;
    }
};

export const updateInterface = async (id, data) => {
    try {
        const response = await api.put(`/api/interfaces/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating interfaces:`, error);
        throw error;
    }
};