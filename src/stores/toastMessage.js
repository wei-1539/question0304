// 建立 store 需使用到 Pinia 中 defineStore() 方法
import { defineStore } from 'pinia'

// 第一個參數為字串，是這個 store 的 id
export const useToastMessageStore = defineStore('toastMessage', {
  // 存放資料
  state: () => {
    return {
      messages: []
    }
  },
  // 寫方法
  actions: {
    // 顯示玩過一段時間移除陣列的第一個資料
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 5000)
    },
    clearToast (index) {
      // 刪除『 1 』筆 ,在 messages資料及內的第Ｘ筆資料
      this.messages.splice(index, 1)
    },
    // 輸入資料到toast的內容
    pushMessage (message) {
      // 將取到的變數『解構』出來
      const { style = 'success', title, content } = message
      // 並將解構出來的內容以『物件』的形式 存入 messages的陣列裡
      this.messages.push({ style, title, content })
      // 並將它顯示出來 過5秒在移除
      this.toastShow()
    }
  }
})
