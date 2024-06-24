<script setup>
import {onMounted, ref, watch} from "vue";

import axios from "axios";
import { useRoute } from 'vue-router'
const route = useRoute()

const list = ref([])
const total = ref(0)
const currentPage = ref(Number(route.params.page) || 1)

const getPost = async () => {
  const {headers, data} = await axios.get( `${import.meta.env.VITE_BLOG_API}/posts`,{
    params:{
      per_page: 5,
      page: currentPage.value
    }
  })

  list.value = data
  total.value = Number(headers['x-wp-totalpages'])
}

onMounted( () => {
  getPost()

})

watch(
  () => route.params.page,
  (page) => {
    currentPage.value = Number(page)
    getPost()
  }
)

const pageGroup= () => {
  const startPage = Math.floor((currentPage.value - 1) / 5) * 5 + 1
  const endPage = Math.min(startPage + 4, total.value)
  return { startPage, endPage }
}
// TODO : total comment,
</script>

<template>
  <div>
    <div v-for="item in list">
      <router-link :to="{name: 'aboutDetail', params: {id: item.id}}">{{item.id}} / {{ item.title.rendered }}</router-link>
    </div>
    <div class="d-flex align-center flex-row spacing-playground pa-2">
      <router-link :to="{
         name: 'aboutList',
        params:{
          page: 1
        }
      }">first</router-link>
      <router-link :to="{
         name: 'aboutList',
        params:{
          page: currentPage > 1 ? currentPage -1 : 1
        }
      }"> <</router-link>
      <div class="d-flex align-center flex-row">
        <div v-for="key in 5" :key="key">
          <router-link
            v-if="pageGroup().startPage + key -1 <= total"
            :to="{
            name: 'aboutList',
            params:{
              page: pageGroup().startPage + key -1
            }
          }"
          >{{pageGroup().startPage + key -1}}</router-link>
        </div>
      </div>
      <router-link :to="{
        name: 'aboutList',
        params:{
          page: currentPage < total ? currentPage + 1 : total
        }
      }">> </router-link>
      <router-link :to="{
         name: 'aboutList',
        params:{
          page: total
        }
      }">last</router-link>
    </div>
  </div>
</template>

<style>
a{
  padding: 3px;
}
</style>

