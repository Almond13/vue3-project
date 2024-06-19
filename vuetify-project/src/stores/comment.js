import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";

const defaultState = {
  edit: {},
  reply: {},
  postId: 0,
  commentList: [],
  typeIndex:-1,
  currentComment: {}
}

export const useCommentStore = defineStore('isEdit',{
  state: () => ({
    ...defaultState,
    defaultState: defaultState
  }),
  getters: {
    a: () => {
      return 'aaa'
    }
  },
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
    },
    async getComment(id) {
      // console.log('store', id)
      this.postId = id
      const {data} = await axios.get( `${import.meta.env.VITE_BLOG_API}/comments`,{
        params: {
          post: id,
          order: 'asc',
          orderby: 'date',
          per_page: 100
        }
      })

      this.commentList = data
    },
    // add() {},
    // replay() {},
    // edit() {}
  },
})
