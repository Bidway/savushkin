import { create } from 'zustand';
import { fetchSubnets, createSubnet, updateSubnet } from '../services';
import { filterSubnet } from '../utils/filters';

export const useSubnetsStore = create((set) => ({
    subnets: [],
    newSubnet: { siteId: '', ip: '', mask: '' },

    // Методы
    loadSubnets: async () => {
        try {
            const data = await fetchSubnets();
            set({ subnets: data });
        } catch (error) {
            console.error('Error loading subnets:', error);
        }
    },

    handleCreateSubnet: async () => {
        const state = useSubnetsStore.getState();
        try {
            const newSubnet = await createSubnet(state.newSubnet);
            set((prev) => ({
                subnets: [...prev.subnets, newSubnet],
                newSubnet: { siteId: '', ip: '', mask: '' }
            }));
        } catch (error) {
            console.error('Error creating subnet:', error);
        }
    },

    handleUpdateSubnet: async (id, data) => {
        try {
            const updatedSubnet = await updateSubnet(id, filterSubnet(data));
            set((prev) => ({
                subnets: prev.subnets.map((subnet) =>
                    subnet.id === id ? updatedSubnet : subnet
                )
            }));
        } catch (error) {
            console.error('Error updating subnet:', error);
        }
    },

    setNewSubnet: (data) => set({ newSubnet: data }),
}));