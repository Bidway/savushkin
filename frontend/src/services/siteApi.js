import { api } from './apiConfig';

export const fetchSites = async () => {
    try {
        const response = await api.get('/api/sites');
        return response.data;
    } catch (error) {
        console.error('Error fetching sites:', error);
        throw error;
    }
};

export const deleteSite = async (id) => {
    try {
        await api.delete(`/api/sites/${id}`);
    } catch (error) {
        console.error(`Error deleting sites:`, error);
        throw error;
    }
};

export const createSite = async (name) => {
    try {
        const response = await api.post('/api/sites', { name });
        return response.data;
    } catch (error) {
        console.error('Error creating site:', error);
        throw error;
    }
};

export const updateSite = async (id, data) => {
    try {
        const response = await api.put(`/api/sites/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating sites:`, error);
        throw error;
    }
};
