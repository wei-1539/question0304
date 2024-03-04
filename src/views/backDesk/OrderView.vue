<template>
  <LoadingComponent :loadingStatus="isLoading"/>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="my-4 fw-bold">訂單明細</h2>
    </div>
    <div class="table-responsive">
      <table class="table align-middle table-bordered">
        <thead class="fs-5">
          <tr class="table-active">
            <th width="150" class="text-center d-none d-sm-table-cell">購買時間</th>
            <th >Email</th>
            <th >購買款項</th>
            <th width="120">應付金額</th>
            <th width="140" class="text-center">是否付款</th>
            <th class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} / {{ product.qty }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ item.total }}</td>
            <td >
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid" @change="updateOrder(item)">
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid" class="text-success fw-bold">付款</span>
                  <span v-else class="text-danger ">未付款</span>
                </label>
              </div>
            </td>
            <td class="text-center">
              <div class="btn-group flex-sm-row flex-column">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm mb-sm-0 mb-2"
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('del', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <OrderModal :order="tempOrder" @update-paid="updateOrder" ref="orderModal"/>
    <DelModal :out-item="tempOrder" @remove-data="delOder" ref="delModal"/>
    <PagePagination :pages="pagination" @emit-pages="getOrder"/>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useToastMessageStore } from '../../stores/toastMessage.js'

import OrderModal from '../../components/backDesk/OrderModal.vue'
import DelModal from '../../components/backDesk/DelModal.vue'
import PagePagination from '../../components/PagePagination.vue'
import LoadingComponent from '../../components/LoadingComponent.vue'

import axios from 'axios'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  components: {
    OrderModal,
    DelModal,
    PagePagination,
    LoadingComponent
  },
  data () {
    return {
      orders: {},
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    // 取得訂單資料
    getOrder (currentPage = 1) {
      this.currentPage = currentPage
      const url = `${VITE_URL}api/${VITE_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      axios.get(url)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.pushMessage({
            style: 'success',
            title: '成功取得訂單明細',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '訂單明細取得失敗',
            content: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 控制 Modal
    openModal (modalStatus, item) {
      if (modalStatus === 'edit') {
        this.tempOrder = { ...item }
        this.$refs.orderModal.openModal()
      } else if (modalStatus === 'del') {
        this.tempOrder = { ...item }
        this.$refs.delModal.openModal()
      }
    },
    // 修改訂單
    updateOrder (item) {
      this.isLoading = true
      const url = `${VITE_URL}api/${VITE_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      axios.put(url, { data: paid })
        .then((res) => {
          this.$refs.orderModal.hideModal()
          this.getOrder(this.currentPage)
          this.pushMessage({
            style: 'success',
            title: '更新付款狀態',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 刪除訂單
    delOder () {
      this.isLoading = true
      const url = `${VITE_URL}api/${VITE_PATH}/admin/order/${this.tempOrder.id}`
      axios.delete(url)
        .then((res) => {
          this.$refs.delModal.hideModal()
          this.getOrder(this.currentPage)
          this.pushMessage({
            style: 'success',
            title: '成功刪除',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
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
