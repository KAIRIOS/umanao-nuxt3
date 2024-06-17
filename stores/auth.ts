import { defineStore } from 'pinia'

interface UserPayLoadInterface {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayLoadInterface) {
      const data: any = await $fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { email, password },
      })
      this.loading = false;

      if (data.token) {
        const token = useCookie('token');
        token.value = data?.token;
        this.authenticated = true;
      }
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false;
      token.value = null;
    },
  },
});