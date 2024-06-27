<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
import axios from "axios";
import { useRoute } from 'vue-router'
import {useDetailStore} from "@/stores/detail";
const route = useRoute()
const store = useDetailStore()

const category = () => {
  if(route.name === 'unclassifiedList'){
    return store.category = 1
  }else if(route.name === 'testList'){
    return store.category = 15
  }else{
    return store.category = null
  }
}

const getPostList = () => {
  store.currentPage = Number(route.params.page) || 1
  category()
  store.getPost()
}

onMounted(()=>{
  getPostList()
  console.log('마운트')
})

watch(
  [() => route.params.page, () => route.name], () => {
    getPostList()
    console.log('와치')
  },
)

</script>

<template>
  <div>
    <router-link :to="{
      name: 'unclassifiedList',
      params:{ page: 1
      }}" @click="store.category = 1"
    >미분류</router-link>
    <router-link :to="{
      name: 'testList',
      params:{ page: 1
      }}" @click="store.category = 15"
    >TEST</router-link>
    <router-view list-name="categoryList" detail-name="categoryDetail"></router-view>
  </div>
</template>

