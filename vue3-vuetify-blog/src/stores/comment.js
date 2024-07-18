import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";

const defaultState = {
  edit: {},
  reply: {},
  postId: 0,
  commentList: [],
  typeIndex: 1,
  currentComment: {},
  postComment: {},
}

export const useCommentStore = defineStore('commentStore',{
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
    async handleAdd() {
      await axios.post( `${import.meta.env.VITE_BLOG_API}/comments`, {
          post: this.postId,
          parent: 0,
          author_name: this.postComment.name,
          content: this.postComment.content,
          author_email: this.postComment.email
        }
      )
      await this.getComment(this.postId)
      this.postComment = this.defaultState.postComment
    },
    // FIXME: update api 권한(?) 이슈, 추후 수정, 비밀번호로 가능한지 확인
    async handleEditUpdate(){
      // await axios.patch( `${import.meta.env.VITE_BLOG_API}/comments`, {
      //   id: this.currentComment.id,
      //   content: this.postComment.content === undefined ? this.currentComment.content : this.postComment.content
      // })
      await this.editResetAll()
      await this.getComment(this.postId)
      this.postComment = this.defaultState.postComment
      this.typeIndex = 1
    },
    async handleReply(){
      await axios.post( `${import.meta.env.VITE_BLOG_API}/comments`, {
        post: this.postId,
        parent: this.postComment.id,
        author_name: this.postComment.name,
        author_email: this.postComment.email,
        content: this.postComment.content,
      })
      await this.replyResetAll()
      await this.getComment(this.postId)
      this.postComment = this.defaultState.postComment
      this.typeIndex = 1
    },
    // FIXME: delete api 권한 이슈, delete password로 가능할지 확인
    async handleDelete(id){
      await axios.delete(`${import.meta.env.VITE_BLOG_API}/comments/${id}`)
    }
  },
})
