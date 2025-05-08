import { defineStore } from 'pinia';
import experienceData from '@/data/Experience.json';

export const useExperienceStore = defineStore('experience', {
  state: () => ({
    experience: experienceData
  }),
  getters: {
    // You can add getters here if needed to process or filter the experience data
  },
  actions: {
    // You can add actions here if needed to modify the experience data
  }
});