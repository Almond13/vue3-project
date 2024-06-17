import {defineStore} from "pinia";
import {tr} from "vuetify/locale";

export const useCommentStore = defineStore('isEdit',{
  state: () => ({
    edit: {}
  }),
  actions: {
    toggle(selectedId) {
      Object.keys(this.edit).forEach(id => {
        this.edit[id] = id === selectedId.toString() ? !this.edit[id] : false
      })
    },
    resetAll() {
      Object.keys(this.edit).forEach(id => {
        this.edit[id] = false
      })
    }
  },
})
