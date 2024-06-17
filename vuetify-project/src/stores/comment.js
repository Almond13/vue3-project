import {defineStore} from "pinia";

export const useCommentStore = defineStore('isEdit',{
  state: () => ({
    edit: false,
    origin: false
  }),
  // getters: {
  //   // getEdit: state => state.isEdit,
  // },
  // // 상태값을 바꾸고 싶을 떄!
  // // 여기서 this 쓰는거 유의하기!
  actions: {
    show() {
      this.edit = true
      this.origin = false
    },
    hide(){
      this.edit = false
      this.origin = true
    }
  },
})
