<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink> |
    <RouterLink v-if="token === ''" to="/login">後台登入</RouterLink>
    <RouterLink v-else to="/admin/product">進入後台</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<script>
export default {
  data () {
    return {
      token: ''
    }
  },
  methods: {
    check () {
      // 取出token
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*=\s*([^;]*).*$)|^.*$/, '$1')
    }
  },
  created () {
    this.check()
  }
}
</script>
