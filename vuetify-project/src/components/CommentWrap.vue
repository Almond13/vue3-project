<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import Comments from "@/components/Comments.vue";
import AddComment from "@/components/AddComment.vue";
import {useDetailStore} from "@/stores/detail";
import {useCommentStore} from "@/stores/comment";
import UpdateComment from "@/components/UpdateComment.vue";

const detailStore = useDetailStore()
const detailId = detailStore.detailId

const commentStore = useCommentStore()

const comment = ref([])
// const total = ref()
const props = defineProps({
  postTitle : Object
})

onMounted( ()=>{
  commentStore.getComment(detailId)
})

watch(
  () => commentStore.commentList,
  (data) => {
    comment.value = data
  }
)
</script>

<template>
 <div>
   <h3> 게시글 "{{props.postTitle.rendered}}" 댓글 수 : {{ comment.length }} </h3>
   <Comments />
   <div v-if="commentStore.typeIndex > 0">
    <UpdateComment />
   </div>
 </div>
</template>
