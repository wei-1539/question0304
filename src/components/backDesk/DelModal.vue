<template>
    <div id="delProductModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    是否刪除
                    <!--取出外層傳入資料 需要使用【props所定義的名稱來提取需要的資料】 -->
                    <strong class="text-danger">{{ outItem.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="$emit('remove-data')">
                        確認刪除
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
  props: ['outItem'],
  mixins: [modalMixin]
}
</script>../../mixins/modalMixin.js./DelModal.vue/index.js
