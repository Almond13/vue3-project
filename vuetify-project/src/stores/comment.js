import {defineStore} from "pinia";

export const useCommentStore = defineStore('isEdit',{
  state: () => ({
    edit: {},
    reply: {}
  }),
  actions: {
    editToggle(selectedId) {
      Object.keys(this.edit).forEach(id => {
        this.edit[id] = id === selectedId.toString() ? !this.edit[id] : false
      })
    },
    editResetAll() {
      Object.keys(this.edit).forEach(id => {
        this.edit[id] = false
      })
    },
    replyToggle(selectedId) {
      Object.keys(this.reply).forEach(id => {
        this.reply[id] = id === selectedId.toString() ? !this.reply[id] : false
      })
    },
    replyResetAll() {
      Object.keys(this.reply).forEach(id => {
        this.reply[id] = false
      })
    }
  },
})
