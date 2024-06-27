<script setup>
import {useDetailStore} from "@/stores/detail";
import {onMounted, onUnmounted, ref, watch} from "vue";
import axios from "axios";
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useDetailStore()

const getPost = async () => {
  store.currentPage = Number(route.params.page) || 1

  const {headers, data} = await axios.get( `${import.meta.env.VITE_BLOG_API}/posts`,{
    params:{
      per_page: 5,
      page: store.currentPage
    }
  })
  store.totalPage = Number(headers['x-wp-totalpages'])
  store.totalItem = Number(headers['x-wp-total'])
  store.aboutList = data
}

onMounted(()=>{
  getPost()
})

watch(
  () => route.params.page,
  () => {
    getPost()
  }
)
</script>


<template>
  <div>
<!--    <h2>about</h2>-->
    <router-view list-name="aboutList" detail-name="aboutDetail"></router-view>
  </div>
</template>

