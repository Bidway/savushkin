import { api } from './apiConfig';

export const fetchSubnets = async () => {
    try {
        const response = await api.get('/api/subnets');
        return response.data;
    } catch (error) {
        console.error('Error fetching subnets:', error);
        throw error;
    }
};

export const deleteSubnet = async (id) => {
    try {
        await api.delete(`/api/subnets/${id}`);
    } catch (error) {
        console.error(`Error deleting subnets:`, error);
        throw error;
    }
};

export const createSubnet = async (subnetData) => {
    try {
        const response = await api.post('/api/subnets', subnetData);
        return response.data;
    } catch (error) {
        console.error('Error creating subnet:', error);
        throw error;
    }
};

export const updateSubnet = async (id, data) => {
    try {
        const response = await api.put(`/api/subnets/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating subnets:`, error);
        throw error;
    }
};