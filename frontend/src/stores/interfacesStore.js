import { create } from 'zustand';
import { fetchInterfaces, createInterface, updateInterface } from '../services';
import { filterInterface } from '../utils/filters';

export const useInterfacesStore = create((set) => ({
    interfaces: [],
    newInterface: { rangeId: '', deviceId: '', name: '', ip_address: '', mac_address: '' },

    // Методы
    loadInterfaces: async () => {
        try {
            const data = await fetchInterfaces();
            set({ interfaces: data });
        } catch (error) {
            console.error('Error loading interfaces:', error);
        }
    },

    handleCreateInterface: async () => {
        const state = useInterfacesStore.getState();
        try {
            const newInterface = await createInterface(state.newInterface);
            set((prev) => ({
                interfaces: [...prev.interfaces, newInterface],
                newInterface: { rangeId: '', deviceId: '', name: '', ip_address: '', mac_address: '' }
            }));
        } catch (error) {
            console.error('Error creating interface:', error);
        }
    },

    handleUpdateInterface: async (id, data) => {
        try {
            const updatedInterface = await updateInterface(id, filterInterface(data));
            set((prev) => ({
                interfaces: prev.interfaces.map((intf) =>
                    intf.id === id ? updatedInterface : intf
                )
            }));
        } catch (error) {
            console.error('Error updating interface:', error);
        }
    },
    handleUpdateInterface: async (id, data) => {
        try {
            const updatedInterface = await updateInterface(id, filterInterface(data));
            set((prev) => ({
                interfaces: prev.interfaces.map((intf) =>
                    intf.id === id ? updatedInterface : intf
                )
            }));
        } catch (error) {
            console.error('Error updating interface:', error);
        }
    },

    setNewInterface: (data) => set({ newInterface: data }),
}));