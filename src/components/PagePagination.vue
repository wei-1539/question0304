<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ 'disabled': pages.current_page === 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitPages(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 抓取總頁數 使用v-for -->
      <li class="page-item" v-for="(item, ind) in pages.total_pages" :key="ind"
        :class="{ 'active': item === pages.current_page }">
        <!-- 這裡使用 v-if v-else 來判斷 如果是當前的頁面就不加上 【點擊事件】-->
        <span class="page-link" v-if="item === pages.current_page">{{ item }}</span>
        <!-- 相反則是使用 【點擊事件】 -->
        <a class="page-link" href="#" v-else @click.prevent="emitPages(item)">{{ item }}</a>
      </li>
      <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li> -->
      <li class="page-item" :class="{ 'disabled': pages.current_page === pages.total_pages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="emitPages(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    emitPages (item) {
      this.$emit('emit-pages', item)
    }
  }
}
</script>
