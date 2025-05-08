import { defineStore } from 'pinia';
import linkData from '@/data/LinkData.json';

export const useLinkStore = defineStore('link', {
  state: () => ({
    links: linkData
  }),
  getters: {
    // You can add getters here to process or filter link data
  },
  actions: {
    // You can add actions here to modify link data if needed
  }
});