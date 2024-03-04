<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="my-4 fw-bold">優惠卷</h2>
      <button class="btn btn-primary" type="button" @click="openModal('add', item)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th class="text-center">是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent}} %</td>
          <td>{{ $filters.date(item.due_date)}}</td>
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
          <td>
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
  <Pagination :pages="pagination" @emit-pages="getCoupons"/>
  </div>
  <CouponModal :coupon="tempCoupon" :is-new="isNew"  @update-coupon="updateCoupon" ref="couponModal"/>
  <DelModal :out-item="tempCoupon" @remove-data="delCoupon" ref="delCoupon"/>
  <LoadingComponent v-model:active="isLoading"/>
</template>

<script>
import { mapActions } from 'pinia'
import { useToastMessageStore } from '../../stores/toastMessage.js'

import axios from 'axios'

import CouponModal from '../../components/backDesk/CouponModal.vue'
import DelModal from '../../components/backDesk/DelModal.vue'
import Pagination from '../../components/PagePagination.vue'
import LoadingComponent from '../../components/LoadingComponent.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  components: {
    CouponModal,
    DelModal,
    Pagination,
    LoadingComponent
  },
  data () {
    return {
      isLoading: false,
      coupons: {},
      isNew: false,
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      currentPage: 1,
      pagination: {}
    }
  },
  created () {
    this.getCoupons()
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    // 取得優惠卷
    getCoupons (page = 1) {
      this.currentPage = page
      this.isLoading = true
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons?page=${page}`
      axios.get(url)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.pushMessage({
            style: 'success',
            title: '取得優惠卷資料',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '優惠卷資料取得失敗',
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
        this.isNew = true
        // 自動顯示現在時間
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
        this.$refs.couponModal.openModal()
      } else if (modalStatus === 'edit') {
        this.isNew = false
        this.tempCoupon = { ...item }
        this.$refs.couponModal.openModal()
      } else if (modalStatus === 'del') {
        this.tempCoupon = { ...item }
        this.$refs.delCoupon.openModal()
      }
    },
    // 修改
    updateCoupon (item) {
      this.isLoading = true
      this.tempCoupon = item
      let url = `${VITE_URL}api/${VITE_PATH}/admin/coupon`
      let http = 'post'
      let data = item
      let status = '新增優惠卷'
      // 利用 isNew 來確認是哪個  功能 true ＝post新增  false = put修改
      if (!this.isNew) {
        url = `${VITE_URL}api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
        http = 'put'
        data = this.tempCoupon
        status = '更新優惠卷'
      }
      axios[http](url, { data })
        .then((res) => {
          this.pushMessage({
            style: 'success',
            title: `${status}`,
            content: res.data.message
          })
          this.getCoupons(this.currentPage)
          this.$refs.couponModal.hideModal()
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '優惠卷刪除失敗',
            content: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 刪除
    delCoupon () {
      this.isLoading = true
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
      axios.delete(url)
        .then((res) => {
          this.pushMessage({
            style: 'success',
            title: '成功刪除優惠卷',
            content: res.data.message
          })
          this.getCoupons(this.currentPage)
          this.$refs.delCoupon.hideModal()
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '優惠卷刪除失敗',
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
