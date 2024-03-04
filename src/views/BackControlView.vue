<template>
  <BackNavLayout/>
  <div class="container-fluid">
    <ToastMessages/>
    <RouterView v-if="status"/>
  </div>
</template>

<script>
import ToastMessages from '../components/ToastMessage.vue'
import { mapActions } from 'pinia'
import { useToastMessageStore } from '../stores/toastMessage.js'

import axios from 'axios'
import BackNavLayout from '../components/backDesk/BackNavLayout.vue'

const { VITE_URL } = import.meta.env

export default {
  components: { BackNavLayout, ToastMessages },
  data () {
    return {
      status: false
    }
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    checkUser () {
      const api = `${VITE_URL}api/user/check`
      axios.post(api)
        .then((res) => {
          this.pushMessage({
            style: 'success',
            title: '登入成功',
            content: res.data.message
          })
          this.status = true
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: err.response.data.message
          })
          // 這裡有問題~ 當移除token時部會跳回登入頁面
          this.$router.push('/login')
        })
    }
  },
  created () {
    // 取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*=\s*([^;]*).*$)|^.*$/, '$1')
    //  當axios 發出api請求時 自動全部將header加入上去
    axios.defaults.headers.common.Authorization = token
    this.checkUser()
  }
}
</script>
