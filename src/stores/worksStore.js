import { defineStore } from 'pinia';
import worksData from '@/data/WorksData.json';

export const useWorksStore = defineStore('works', {
  state: () => ({
    works: worksData
  }),
  getters: {
    // You can add getters here if needed
  },
  actions: {
    // You can add actions here if needed
  }
});