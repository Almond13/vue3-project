<script setup>
import {useDetailStore} from "@/stores/detail";
import {onMounted, onUnmounted, ref, watch} from "vue";
import axios from "axios";
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useDetailStore()

const getPostList = () => {
  store.currentPage = Number(route.params.page) || 1
  store.category = null
  store.getPost()
}

onMounted(()=>{
  getPostList()
})

watch(
  () => route.params.page,
  () => {
    getPostList()
  }
)
</script>


<template>
  <div>
<!--    <h2>about</h2>-->
    <router-view list-name="aboutList" detail-name="aboutDetail"></router-view>
  </div>
</template>

