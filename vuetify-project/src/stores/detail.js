import {defineStore} from "pinia";
import axios from "axios";

const defaultState = {
  detailId : String,
  aboutList : [],
  totalItem : 0,
  totalPage : 0,
  currentPage : 1,
  prevPost: 1,
  nextPost: 1
}

export const useDetailStore = defineStore('detailPage',{
  state: () => ({
    ...defaultState,
    defaultState: defaultState
  }),
  getters: {
  },
  actions: {
    async getListAll(){
      if (this.totalItem === 0) return

      const {data} = await axios.get( `${import.meta.env.VITE_BLOG_API}/posts`,{
        params:{
          per_page: this.totalItem,
        }
      })

      if(this.detailId !== String){
        const currentIndex = data.findIndex(item => item.id === this.detailId)
        this.prevPost = data[currentIndex <= 0 ? currentIndex : currentIndex - 1].id
        this.nextPost = data[currentIndex >= data.length - 1 ? currentIndex : currentIndex + 1].id
      }
    }
  },
})
