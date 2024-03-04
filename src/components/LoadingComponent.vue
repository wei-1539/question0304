<template>
  <VueLoading  :z-index="1060">
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
</template>

<script>
export default {
  props: ['loadingStatus'],
  data () {
    return {
      isLoading: false
    }
  },
  watch: {
    loadingStatus () {
      this.isLoading = this.loadingStatus
      console.log(this.loadingStatus)
    }
  }
}
</script>
