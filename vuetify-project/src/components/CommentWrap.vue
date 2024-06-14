<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import Comments from "@/components/Comments.vue";
import AddComment from "@/components/AddComment.vue";

const route = useRoute()
const comment = ref([])
const props = defineProps({
  detailId : String,
  postTitle : Object
})

const getCommentData = async () => {
  const {data} = await axios.get(`https://theme.sunflower.kr/wp-json/wp/v2/comments`,{
    params: {
      post: props.detailId,
      per_page: 10
    }
  })

  comment.value = data
}

onMounted( ()=>{
  getCommentData()
})

</script>

<template>
 <div>
   <h3> 게시글 "{{props.postTitle.rendered}}" 댓글 수 : {{ comment.length }} </h3>
   <Comments @update='getCommentData' :data="comment"/>
   <AddComment @submit="getCommentData" :detail-id="props.detailId"/>
 </div>
</template>
