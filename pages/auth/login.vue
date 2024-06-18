<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const { authenticateUser } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore())

const user = ref({
  email: 'mcavata@kairios.fr',
  password: '',
});

const router = useRouter()

const login = async () => {
  await authenticateUser(user.value)
  if (authenticated.value) {
    await router.push('/')
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
