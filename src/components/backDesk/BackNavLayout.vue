<template>
<VueLoading :active="isLoading" :z-index="1060" >
    <div class="loadingio-spinner-double-ring-0ut21surusy">
    <div class="ldio-2uwwzn0tw8t">
      <div></div>
      <div></div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
  </VueLoading>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <div class="navbar-brand">CINEMA</div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/admin/product" class="nav-link">產品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/order" class="nav-link">訂單</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/coupons" class="nav-link">優惠卷</RouterLink>
          </li>
          <li class="nav-item">
            <a @click="logout" class="nav-link " style="cursor:pointer">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'pinia'
import { useToastMessageStore } from '../../stores/toastMessage.js'

import axios from 'axios'
const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    logout () {
      this.isLoading = true
      const url = `${VITE_URL}/logout`
      axios.post(url)
        .then((res) => {
          this.isLoading = false
          this.pushMessage({
            style: 'success',
            title: '登出成功',
            content: res.data.message
          })
          document.cookie = 'hexToken=; expires=; path=/'
          this.$router.push('/login')
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '登出失敗',
            content: err.response.data.message
          })
        })
    }
  }
}
</script>
