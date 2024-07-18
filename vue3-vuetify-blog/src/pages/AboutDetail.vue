<script setup>
import {onMounted, ref, onUnmounted, watch} from "vue";
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

const props = defineProps({
  listName: String,
  detailName: String
})

const getDetail = async () => {
  const {data}  = await axios.get(`${import.meta.env.VITE_BLOG_API}/posts/${detailId.value}`)

  post.value = data

  const date = post.value.date
  const dateObj = new Date(date)
  const options = {year: 'numeric', month: 'long', day: '2-digit'}

  fixedDate.value =  dateObj.toLocaleDateString('en-US', options)

  store.detailId = Number(route.params.id)

  if(route.name === 'aboutDetail'){
    store.category = null
  }
  await store.getListAll()
}

const resetList = () => {
    store.aboutList = store.defaultState.aboutList
}

onMounted(async ()=>{
  await getDetail()
  resetList()
})

watch(
  () => route.params.id,
  (id) => {
    detailId.value = id
    getDetail()
    commentStore.getComment(id)
  }
)

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
    <div>
      <router-link :to="{name: props.detailName, params: {id: store.prevPost}}">이전 글</router-link>
      <router-link :to="{name: props.detailName, params: {id: store.nextPost}}">다음글</router-link>
    </div>
    <h2>Comments</h2>
    <CommentWrap :post-title="post.title" />
  </div>
  <div v-else></div>
</template>
