import { api } from './apiConfig';

export const fetchRanges = async () => {
    try {
        const response = await api.get('/api/ranges');
        return response.data;
    } catch (error) {
        console.error('Error fetching ranges:', error);
        throw error;
    }
};

export const deleteRange = async (id) => {
    try {
        await api.delete(`/api/ranges/${id}`);
    } catch (error) {
        console.error(`Error deleting ranges:`, error);
        throw error;
    }
};


export const createRange = async (rangeData) => {
    try {
        const response = await api.post('/api/ranges', rangeData);
        return response.data; // Возвращаем полный объект диапазона с сервера
    } catch (error) {
        console.error('Error creating range:', error);
        throw error;
    }
};

export const updateRange = async (id, data) => {
    try {
        const response = await api.put(`/api/ranges/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating ranges:`, error);
        throw error;
    }
};
