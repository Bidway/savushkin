import { api } from './apiConfig';

export const fetchProjects = async () => {
    try {
        const response = await api.get('/api/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const deleteProject = async (id) => {
    try {
        await api.delete(`/api/projects/${id}`);
    } catch (error) {
        console.error(`Error deleting projects:`, error);
        throw error;
    }
};

export const createProject = async (projectData) => {
    try {
        const response = await api.post('/api/projects', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};
export const updateProject = async (id, data) => {
    try {
        const response = await api.put(`/api/projects/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating project:`, error);
        throw error;
    }
};
