import { create } from 'zustand';
import { fetchRanges, createRange, updateRange } from '../services';
import { filterRange } from '../utils/filters';

export const useRangesStore = create((set) => ({
    ranges: [],
    newRange: { projectId: '', subnetId: '', name: '', ip_start: '', ip_end: '', mask: '', gateway: '' },
    expandedRanges: [],

    // Методы
    loadRanges: async () => {
        try {
            const data = await fetchRanges();
            set({ ranges: data });
        } catch (error) {
            console.error('Error loading ranges:', error);
        }
    },

    handleCreateRange: async () => {
        const state = useRangesStore.getState();
        try {
            const newRange = await createRange(state.newRange);
            set((prev) => ({
                ranges: [...prev.ranges, newRange],
                newRange: { projectId: '', subnetId: '', name: '', ip_start: '', ip_end: '', mask: '', gateway: '' }
            }));
        } catch (error) {
            console.error('Error creating range:', error);
        }
    },

    handleUpdateRange: async (id, data) => {
        try {
            const updatedRange = await updateRange(id, filterRange(data));
            set((prev) => ({
                ranges: prev.ranges.map((range) =>
                    range.id === id ? updatedRange : range
                )
            }));
        } catch (error) {
            console.error('Error updating range:', error);
        }
    },

    setNewRange: (data) => set({ newRange: data }),
    setExpandedRanges: (data) => set({ expandedRanges: data }),
}));