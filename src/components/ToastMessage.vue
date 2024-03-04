<template>
  <div class="toast-container osition-fixed pe-3 end-0" style="z-index:1500; top:6% ">
    <div v-for="(item, ind) in messages" :key="`toast${ind}`" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <span :class="`bg-${item.style}`" class="rounded me-2 p-2 d-inline-block" ></span>
        <strong class="me-auto">{{item.title}}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="clearToast(ind)"
        ></button>
      </div>
      <div class="toast-body" v-if="item.content">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
// 導入 pinia 的使用方法
import { mapActions, mapState } from 'pinia'
// 導入pinia檔案
import { useToastMessageStore } from '../stores/toastMessage.js'

export default {
  // 提取 pinia 內的資料集
  computed: {
    ...mapState(useToastMessageStore, ['messages'])
  },
  // 提取 pinia 內的方法 『 DOM 』結構讀取到要關閉
  methods: {
    ...mapActions(useToastMessageStore, ['clearToast'])
  }
}
</script>
