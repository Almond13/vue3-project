<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import CommentWrap from "@/components/CommentWrap.vue";
import {useDetailStore} from "@/stores/detail";

const store = useDetailStore()
const route = useRoute()
const post = ref({})
const fixedDate = ref('')
const detailId = ref(route.params.id)

onMounted(async ()=>{
  const {data, headers}  = await axios.get(`https://theme.sunflower.kr/wp-json/wp/v2/posts/${detailId.value}`)

  post.value = data

  const date = post.value.date
  const dateObj = new Date(date)
  const options = {year: 'numeric', month: 'long', day: '2-digit'}

  fixedDate.value =  dateObj.toLocaleDateString('en-US', options)

  store.detailId = route.params.id

  console.log(data)
})

</script>

<template>
  <div v-if="post.id !== undefined">
    {{fixedDate}}
    <h1>{{post.title.rendered}}</h1>
    <div v-html="post.content.rendered"></div>
    <h2>Comments</h2>
    <CommentWrap :post-title="post.title" />
  </div>
  <div v-else></div>
</template>
