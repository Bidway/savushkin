import { create } from 'zustand';
import { fetchDevices, createDevice, updateDevice } from '../services';
import { filterDevice } from '../utils/filters';

export const useDevicesStore = create((set) => ({
    devices: [],
    newDevice: { projectId: '', name: '', location: '' },

    // Методы
    loadDevices: async () => {
        try {
            const data = await fetchDevices();
            set({ devices: data });
        } catch (error) {
            console.error('Error loading devices:', error);
        }
    },

    handleCreateDevice: async () => {
        const state = useDevicesStore.getState();
        try {
            const newDevice = await createDevice(state.newDevice);
            set((prev) => ({
                devices: [...prev.devices, newDevice],
                newDevice: { projectId: '', name: '', location: '' }
            }));
        } catch (error) {
            console.error('Error creating device:', error);
        }
    },

    handleUpdateDevice: async (id, data) => {
        try {
            const updatedDevice = await updateDevice(id, filterDevice(data));
            set((prev) => ({
                devices: prev.devices.map((device) =>
                    device.id === id ? updatedDevice : device
                )
            }));
        } catch (error) {
            console.error('Error updating device:', error);
        }
    },

    setNewDevice: (data) => set({ newDevice: data }),
}));