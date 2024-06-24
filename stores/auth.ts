import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  actions: {
    logUserOut() {
      const token = useCookie('token');
      token.value = null;
    },
  },
});