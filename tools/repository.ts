const token = useCookie('token')

export const repository = () => ({
  async getExercices() {
    return $fetch('/api/exercice', {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
    })
  }
})