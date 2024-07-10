<script lang="ts" setup>
const { setUser, setToken } = useUserStore()

const user = ref({
  email: 'mcavata@kairios.fr',
  password: '',
});

const login = async () => {
  try {
    const data: any = await $fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.value.email,
        password: user.value.password
      }),
    });

    // On set l'user dans le store
    if (data) {

      console.log('data :', data)
      setToken(data.token)
      setUser(data.user)
    }
    // Rediriger l'utilisateur vers la page d'accueil
    navigateTo('/')
  } catch (e) {
    setToken()
    setUser()
    console.error(e)
  }
};
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center">
      <div class="card w-25">
        <div class="card-header">
          <div class="d-flex justify-content-center">
            <span class="fw-bold fs-4">Se connecter</span>
          </div>
        </div>
        <div class="card-body">
          <div class="vstack gap-2">
            <div class="hstack gap-2 justify-content-between">
              Email :
              <div class="form-group">
                <input v-model="user.email" class="form-control" id="email" type="email" placeholder="Email" />
              </div>
            </div>
            <div class="hstack gap-2 justify-content-between">
              Password :
              <div class="form-group">
                <input v-model="user.password" class="form-control" id="password" type="password" placeholder="Mot de passe" />
              </div>
            </div>
          </div>
          <div class="float-end mt-2">
            <button class="btn btn-umanao" @click="login">Connexion</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
