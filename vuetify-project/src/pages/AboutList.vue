<script setup>
import {onMounted, ref, watch} from "vue";

import axios from "axios";
import { useRoute } from 'vue-router'
const route = useRoute()

const list = ref([])
const total = ref(0)
const currentPage = ref(Number(route.params.page) || 1)
// const currentPage = ref(Math.ceil(Number(route.params.page) || 1  / 5) * 5)

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

</script>

<template>
  <div>
    <div v-for="item in list">
      <router-link :to="{name: 'aboutDetail', params: {id: item.id}}">{{item.id}} / {{ item.title.rendered }}</router-link>
    </div>
    <router-link :to="{
       name: 'aboutList',
      params:{
        page: currentPage > 1 ? currentPage -1 : 1
      }
    }">prev</router-link>
      <div v-for="key in total" :style="{display: 'inline-block', padding: '5px'}" :key="key">
        <router-link :to="{
          name: 'aboutList',
          params:{
            page: key
          }
        }">{{key}}</router-link>
      </div>
    <router-link v-show="currentPage < total" :to="{
      name: 'aboutList',
      params:{
        page: currentPage + 1
      }
    }">next</router-link>
  </div>
</template>

