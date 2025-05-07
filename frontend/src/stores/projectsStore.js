// src/stores/projectsStore.js
import { create } from 'zustand';
import { fetchProjects, createProject, updateProject } from '../services';
import { filterProject } from '../utils/filters';

export const useProjectsStore = create((set) => ({
    // Состояние
    projects: [],
    newProject: { siteId: '', name: '' },
    expandedProjects: [],

    // Методы
    loadProjects: async () => {
        try {
            const data = await fetchProjects();
            set({ projects: data });
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    },

    handleCreateProject: async () => {
        const state = useProjectsStore.getState();
        try {
            const newProject = await createProject(state.newProject);
            set((prev) => ({
                projects: [...prev.projects, newProject],
                newProject: { siteId: '', name: '' },
            }));
        } catch (error) {
            console.error('Error creating project:', error);
        }
    },

    handleUpdateProject: async (id, data) => {
        try {
            const updatedProject = await updateProject(id, filterProject(data));
            set((prev) => ({
                projects: prev.projects.map((project) =>
                    project.id === id ? updatedProject : project
                ),
            }));
        } catch (error) {
            console.error('Error updating project:', error);
        }
    },
    setNewProject: (data) => set({ newProject: data }),
    setExpandedProjects: (data) => set({ expandedProjects: data }),
}));