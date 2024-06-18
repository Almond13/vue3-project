<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import Comments from "@/components/Comments.vue";
import AddComment from "@/components/AddComment.vue";
import {useDetailStore} from "@/stores/detail";

const detailStore = useDetailStore()
const detailId = detailStore.detailId

const comment = ref([])
// const total = ref()
const props = defineProps({
  postTitle : Object
})

const getCommentData = async () => {
  const {data} = await axios.get(`https://theme.sunflower.kr/wp-json/wp/v2/comments`,{
    params: {
      post: detailId,
      order: 'asc',
      orderby: 'date',
      per_page: 100
    }
  })
  comment.value = data

  // total.value = Number(headers['x-wp-total'])
}

onMounted( ()=>{
  getCommentData()
})

</script>

<template>
 <div v-if="comment.length > 0 ">
   <h3> 게시글 "{{props.postTitle.rendered}}" 댓글 수 : {{ comment.length }} </h3>
   <Comments @update='getCommentData' @reply='getCommentData' @delete='getCommentData' :data="comment"/>
   <div>
    <AddComment @submit="getCommentData" />
   </div>
 </div>
  <div v-else>댓글 로딩 중 . . .</div>
</template>
