import { defineStore } from 'pinia';
import logoData from '@/data/LogoData.json';

export const useLogoStore = defineStore('logo', {
  state: () => ({
    logos: logoData
  }),
  getters: {
    // You can add getters here to process or filter logo data
  },
  actions: {
    // You can add actions here to modify logo data
  }
});