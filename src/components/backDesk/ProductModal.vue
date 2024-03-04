<template>
  <div id="productModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <!-- 輸入圖片網址 -->
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入【主要】圖片網址</label>
                  <input type="text" class="form-control" placeholder="請輸入圖片連結"  v-model="tempProduct.imageUrl">
                </div>
                <!-- 上傳本機圖片 -->
                <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片</label>
                <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile" />
              </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <h5 class="mb-3">多圖新增</h5>
              <!-- 這裡判斷item.imagesUrl是否有微陣列 -->
              <!-- 若沒有的話只出現新增按鈕 【新增陣列】-->
              <div class="mb-3" v-if="Array.isArray(tempProduct.imagesUrl)">
              <div class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label :for="`imagesUrl${key}`" class="form-label">圖片網址</label>
                    <input :id="`imagesUrl${key}`" type="text" class="form-control" placeholder="請輸入圖片連結"
                      v-model="tempProduct.imagesUrl[key]">
                  </div>
                  <img class="img-fluid" :src="image" alt="">
                </div>
              <!--
                  這裡判斷 item.imagesUrl 的陣列裡面 『沒有』東西時出現新增按鈕
                  當『輸入圖片連結』的input 的欄位是『空』的時候就會出現刪除圖片
                -->
              <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </div>
              <!--
                若沒有任何多圖的話則出現的這個
                執行createImages 創建空陣列並push到data上的item.imagesUrl內
              -->
              <div v-else>
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model="tempProduct.price">
                </div>
              </div>
              <hr>
              <div class="mb-3 col-md-6">
                <label for="youtubeLink" class="form-label">預告片連結</label>
                <input id="youtubeLink" type="text" class="form-control" placeholder="請輸入youtube連結" v-model="tempProduct.youtubeLink">
              </div>
              <div class="mb-3 col-md-12" v-if="typeof(tempProduct.youtubeLink) === 'string'">
                <iframe width="100%" height="400" :src="`${tempProduct.youtubeLink}?rel=0`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" rows="5" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="content" type="text" class="form-control" rows="5" placeholder="請輸入說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3 d-flex">
                <!-- <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div> -->
                <div class="form-check form-switch">
                  <input class="form-check-input " type="checkbox" role="switch" id="is_enabled" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">啟用</label>
                </div>
                <div class="form-check form-switch ms-4">
                  <input class="form-check-input " type="checkbox" role="switch" id="is_love" :true-value="1" :false-value="0" v-model="tempProduct.is_love">
                  <label class="form-check-label" for="is_love">推薦</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product',tempProduct)">
            確認
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useToastMessageStore } from '../../stores/toastMessage.js'
// 產品新增 / 編輯 元件
import axios from 'axios'
// 載入Modal的方法
import modalMixin from '../../mixins/modalMixin.js'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['product', 'isNew'],
  mixins: [modalMixin],
  data () {
    return {
      tempProduct: {},
      status: {}
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    // // 新增多張圖片
    createImages () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },
    uploadFile () {
      // 取出上傳圖片在files的類陣列的資料
      const uploadedFile = this.$refs.fileInput.files[0]
      // 產生表單格式 『跟上傳API表單內容一致』
      const formData = new FormData()
      // 前者是上傳位置『需參考API文件內容格式』 ，後者是圖片檔案
      formData.append('file-to-upload', uploadedFile)
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/upload`
      axios.post(url, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl
          this.$refs.fileInput.value = ''
          this.pushMessage({
            style: 'success',
            title: '圖片上傳成功',
            content: res.data.message
          })
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '圖片上傳失敗',
            content: err.response.data.message
          })
        })
    }
  }
}
</script>../../stores/toastMessage.js../../mixins/modalMixin.js./ProductModal.vue/index.js
