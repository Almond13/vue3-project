<script setup>
import {onMounted} from "vue";
import {useDetailStore} from "@/stores/detail";

const detailStore = useDetailStore()

const props = defineProps({
  listName: String,
  detailName: String
})

const pageGroup = () => {
  const startPage = Math.floor((detailStore.currentPage - 1) / 5) * 5 + 1
  const endPage = Math.min(startPage + 4, detailStore.totalPage)
  return { startPage, endPage }
}

onMounted(()=>{
})

</script>

<template>
  <div>
    <div v-for="item in detailStore['aboutList']">
      <router-link :to="{name: props.detailName, params: {id: item.id}}">{{item.id}} / {{ item.title.rendered }}</router-link>
    </div>
    <div class="d-flex align-center flex-row spacing-playground pa-2">
      <router-link :to="{
         name: props.listName,
        params:{
          page: 1
        }
      }">first</router-link>
      <router-link :to="{
         name: props.listName,
        params:{
          page: detailStore.currentPage > 1 ? detailStore.currentPage -1 : 1
        }
      }"> <</router-link>
      <div class="d-flex align-center flex-row">
        <div v-for="key in 5" :key="key">
          <router-link
            v-if="pageGroup().startPage + key -1 <= detailStore.totalPage"
            :to="{
            name: props.listName,
            params:{
              page: pageGroup().startPage + key -1
            }
          }"
          >{{pageGroup().startPage + key -1}}</router-link>
        </div>
      </div>
      <router-link :to="{
        name: props.listName,
        params:{
          page: detailStore.currentPage < detailStore.totalPage ? detailStore.currentPage + 1 : detailStore.totalPage
        }
      }">> </router-link>
      <router-link :to="{
         name: props.listName,
        params:{
          page: detailStore.totalPage
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

