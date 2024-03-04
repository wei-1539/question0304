<template class="overflow-hidden">
  <!-- <h2>登入頁面</h2> -->
  <div class="bg"></div>
    <div class="container m-sm-0 p-sm-0 position-absolute top-50 start-50 translate-middle text-center">
      <div class="row justify-content-center">
        <h1 class="h2 mb-3 font-weight-normal text-light">後台登入</h1>
        <div class="col-md-4 col-10">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="username"
                v-model="user.username"
                placeholder="name@example.com"
                required
                autofocus
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="user.password"
                placeholder="Password"
                required
              />
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-light">&copy; 2021~∞ - 六角學院</p>
    </div>
    <LoadingComponent v-model:active="isLoading"/>
    <ToastMessages/>
</template>

<script>
import ToastMessages from '../../components/ToastMessage.vue'
import LoadingComponent from '../../components/LoadingComponent.vue'
import { mapActions } from 'pinia'
import { useToastMessageStore } from '../../stores/toastMessage.js'

import axios from 'axios'

const { VITE_URL } = import.meta.env

export default {
  components: {
    ToastMessages,
    LoadingComponent
  },
  data () {
    return {
      isLoading: false,
      user: {}
    }
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    login () {
      const api = `${VITE_URL}admin/signin`
      this.isLoading = true
      axios.post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexSchool = ${token};expires = ${new Date(expired)}; path=/`
          // this.isLoading = false
          this.$router.push('/admin/product')
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '登入失敗',
            content: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>
.bg {
  background-image: url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
    filter: brightness(0.4) blur(1.75px);
}
</style>
