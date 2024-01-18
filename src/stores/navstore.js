import { defineStore } from 'pinia'

export const useNavStore = defineStore('navstore', {
    state: () => ({
        navbardarkmode: true,
        isNavbarExpanded: false,
    }),
})