import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',
  () => {
    const roles = ref(null)
    const user = ref({
      id: null,
    })
    const token = useCookie('token')

    function isGranted(role: string): boolean {
      return roles.value === role
    }

    const setToken = (data: string) => {
      token.value = data
    }
    const setUser = (data: any) => {
      user.value = data
      roles.value = data?.roles
    }

    return {
      roles,
      user,
      token,
      setUser,
      setToken,
      isGranted,
    }
  },
)