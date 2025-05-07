// src/stores/sitesStore.js
import { create } from 'zustand';
import { fetchSites, createSite, updateSite } from '../services';
import { filterSite } from '../utils/filters';

export const useSitesStore = create((set) => ({
    // Состояние
    sites: [],
    newSiteName: '',
    selectedSite: null,

    // Методы
    loadSites: async () => {
        try {
            const data = await fetchSites();
            set({ sites: data });
        } catch (error) {
            console.error('Error loading sites:', error);
        }
    },

    handleCreateSite: async () => {
        const state = useSitesStore.getState();
        try {
            const newSite = await createSite(state.newSiteName);
            set((prev) => ({
                sites: [...prev.sites, newSite],
                newSiteName: '',
            }));
        } catch (error) {
            console.error('Error creating site:', error);
        }
    },

    handleUpdateSite: async (id, data) => {
        try {
            const updatedSite = await updateSite(id, filterSite(data));
            set((prev) => ({
                sites: prev.sites.map((site) =>
                    site.id === id ? updatedSite : site
                ),
            }));
        } catch (error) {
            console.error('Error updating site:', error);
        }
    },

    setNewSiteName: (name) => set({ newSiteName: name }),
    setSelectedSite: (siteId) => set({ selectedSite: siteId }),
}));