<script setup>
import {onMounted, ref, onUnmounted} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import CommentWrap from "@/components/CommentWrap.vue";
import {useDetailStore} from "@/stores/detail";
import {useCommentStore} from "@/stores/comment";

const store = useDetailStore()
const route = useRoute()
const post = ref({})
const fixedDate = ref('')
const detailId = ref(route.params.id)

const commentStore = useCommentStore()

onMounted(async ()=>{
  const {data, headers}  = await axios.get(`${import.meta.env.VITE_BLOG_API}/posts/${detailId.value}`)

  post.value = data

  const date = post.value.date
  const dateObj = new Date(date)
  const options = {year: 'numeric', month: 'long', day: '2-digit'}

  fixedDate.value =  dateObj.toLocaleDateString('en-US', options)

  store.detailId = route.params.id
})

// TODO : store 초기화 공부
onUnmounted(() => {
  commentStore.$state = {
    ...commentStore.defaultState,
    defaultState: commentStore.defaultState
  }
})

</script>

<template>
  <div v-if="post.id !== undefined">
    {{fixedDate}}
    <h1>{{post.title.rendered}}</h1>
    <div v-html="post.content.rendered"></div>
    <h2>Comments</h2>
    <CommentWrap :post-title="post.title" />
    <router-link to=""></router-link>
  </div>
  <div v-else></div>
</template>
