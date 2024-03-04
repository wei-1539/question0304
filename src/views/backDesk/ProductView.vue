<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="my-4 fw-bold">產品明細</h2>
      <div>
        <button class="btn btn-primary" @click="openModal('add')">
          建立新的產品
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table align-middle table-bordered ">
        <thead class="fs-5">
          <tr class="table-active ">
            <th width="125" class="text-center d-none d-sm-table-cell">產品縮圖</th>
            <th class="text-center">產品名稱</th>
            <th width="120" class="text-center d-none d-sm-table-cell">分類</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100" class="text-center">啟用</th>
            <th width="100" class="text-center d-none d-sm-table-cell">推薦</th>
            <th width="140" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody class="fs-5">
          <tr v-for="item in products" :key="item.id">
            <td class="d-none d-sm-table-cell"><img class="img-fluid" :src="item.imageUrl" alt="" width="100"></td>
            <td >{{ item.title }}</td>
            <td class="text-center d-none d-sm-table-cell">{{ item.category }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <!-- 啟用 -->
            <td class="text-center">
              <span v-if="item.is_enabled" class="text-success">
                <i class="bi bi-check-circle-fill h5"></i>
                <!-- 啟用 -->
              </span>
              <span v-else class="text-danger">
                <i class="bi bi-x-circle-fill h5"></i>
                <!-- 未啟用 -->
              </span>
            </td>
            <!-- 推薦 -->
            <td class="text-center d-none d-sm-table-cell">
              <span v-if="item.is_love" class="text-danger">
                <!-- <i class="bi bi-check-circle-fill h5"></i> -->
                <i class="bi bi-heart-fill" h5></i>
                <!-- 啟用 -->
              </span>
            </td>
            <td class="text-center">
              <div class="btn-group flex-sm-row flex-column">
                <button type="button" class="btn btn-outline-primary btn-sm mb-sm-0 mb-2" @click="openModal('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('del', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分頁元件 Ｓ -->
    <!-- 這裡不能使用getData() 這樣會一直吃到 getData 設定【頁面的預設值】 導致無法到下一頁-->
    <Pagination :pages="pagination" @emit-pages="getData"/>
    <!-- 分頁元件 Ｅ -->
    <ProductModal :product="tempProduct" :is-new="isNew" @update-product="updateData"  ref="productModal" />
    <DelModal :out-item="tempProduct" @remove-data="removeData" ref="delModal"/>
    <LoadingComponent :loadingStatus="isLoading"/>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useToastMessageStore } from '../../stores/toastMessage.js'

import axios from 'axios'

import LoadingComponent from '../../components/LoadingComponent.vue'
import Pagination from '../../components/PagePagination.vue'
import ProductModal from '../../components/backDesk/ProductModal.vue'
import DelModal from '../../components/backDesk/DelModal.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  components: {
    ProductModal,
    DelModal,
    Pagination,
    LoadingComponent
  },
  data () {
    return {
      products: [],
      // 用於判斷是 『新增 ＆ 編輯』
      isNew: false,
      // 蒐集當下資料『新增 ＆ 編輯』
      tempProduct: {
        imagesUrl: []
      },
      // 分頁
      pagination: {},
      // loadingd控制
      isLoading: false,
      currentPage: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    // 取得資料
    getData (page = 1) {
      this.currentPage = page
      const url = `${VITE_URL}api/${VITE_PATH}/admin/products?page=${page}`
      this.isLoading = true
      axios.get(url)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.pushMessage({
            style: 'success',
            title: '成功取得產品資訊',
            content: res.data.message
          })
        })
        .catch(err => {
          this.pushMessage({
            style: 'danger',
            title: '取得產品資訊失敗',
            content: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 控制modal事件
    openModal (modalStatus, item) {
      // 新增
      if (modalStatus === 'add') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.productModal.openModal()
      } else if (modalStatus === 'edit') {
        this.tempProduct = { ...item }
        this.isNew = false
        this.$refs.productModal.openModal()
      } else if (modalStatus === 'del') {
        this.tempProduct = { ...item }
        this.$refs.delModal.openModal()
      }
    },
    // 整合 編輯 ＆ 新增
    updateData (item) {
      this.isLoading = true
      this.tempProduct = item
      let url = `${VITE_URL}api/${VITE_PATH}/admin/product`
      let http = 'post'
      let status = '新增產品'
      // 利用 isNew 來確認是哪個  功能 true ＝post新增  false = put修改
      if (!this.isNew) {
        url = `${VITE_URL}api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        http = 'put'
        status = '更新產品'
      }
      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          this.pushMessage({
            style: 'success',
            title: `成功${status}`,
            content: res.data.message
          })
          this.$refs.productModal.hideModal()
          this.getData(this.currentPage)
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: `${status}失敗`,
            content: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 刪除商品
    removeData () {
      const url = `${VITE_URL}api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      axios.delete(url)
        .then(res => {
          this.pushMessage({
            style: 'success',
            title: '成功刪除產品',
            content: res.data.message
          })
          this.$refs.delModal.hideModal()
          // 傳送需求給外層
          this.getData(this.currentPage)
        })
        .catch(err => {
          this.pushMessage({
            style: 'danger',
            title: '無法刪除產品',
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
