<template>
  <div id="productModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>訂單內容</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3 class="fw-bold">用戶資料</h3>
              <table class="table ">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th>姓名</th>
                    <td>{{tempOrder.user.name}}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{tempOrder.user.email}}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{tempOrder.user.tel}}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{tempOrder.user.address}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3 class="fw-bold">訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th>訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ tempOrder.paid_date }}
                      </span>
                      <span v-else>時間不確定</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">
                        已付款
                      </strong>
                      <span v-else class="text-danger">未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ tempOrder.total }}</td>
                  </tr>
                </tbody>
              </table>
              <hr>
              <h3 class="fw-bold">選購商品</h3>
              <table class="table">
                <thead>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th class="fs-5">{{ item.product.title }}</th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td>{{ item.final_total }}</td>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                    v-model="tempOrder.is_paid" />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="tempOrder.is_paid" class="fw-bold">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-paid', tempOrder)">
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 載入Modal的方法
import modalMixin from '../../mixins/modalMixin.js'

export default {
  props: ['order'],
  mixins: [modalMixin],
  data () {
    return {
      tempOrder: {}
    }
  },
  watch: {
    order () {
      this.tempOrder = this.order
    }
  },
  methods: {}
}
</script>../../mixins/modalMixin.js./OrderModal.vue/index.js
