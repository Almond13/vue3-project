import {defineStore} from "pinia";
import axios from "axios";

const defaultState = {
  detailId : String,
  aboutList : [],
  totalItem : 0,
  totalPage : 0,
  currentPage : 1,
  prevPost: 1,
  nextPost: 1,
  category: 1,
}

export const useDetailStore = defineStore('detailPage',{
  state: () => ({
    ...defaultState,
    defaultState: defaultState
  }),
  getters: {
  },
  persist: true,
  actions: {
    async getPost() {
      const {headers, data} = await axios.get( `${import.meta.env.VITE_BLOG_API}/posts`,{
        params:{
          per_page: 5,
          page: this.currentPage,
          categories: this.category
        }
      })
      this.totalPage = Number(headers['x-wp-totalpages'])
      this.totalItem = Number(headers['x-wp-total'])
      this.aboutList = data
      },
    async getListAll(){
      if (this.totalItem === 0) return

      const {data} = await axios.get( `${import.meta.env.VITE_BLOG_API}/posts`,{
        params:{
          per_page: this.totalItem,
          categories: this.category
        }
      })

      if(this.detailId !== String){
        const currentIndex = data.findIndex(item => item.id === this.detailId)
        this.prevPost = data[currentIndex <= 0 ? currentIndex : currentIndex - 1].id
        this.nextPost = data[currentIndex >= data.length - 1 ? currentIndex : currentIndex + 1].id
      }
    },
    resetList (){
      this.aboutList = this.defaultState.aboutList
    }
  },
})
