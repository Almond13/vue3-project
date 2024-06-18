<script setup>
import {onMounted} from "vue";
import axios from "axios";
import {useDetailStore} from "@/stores/detail";

const detailStore = useDetailStore()
const detailId = detailStore.detailId

const props = defineProps({
  itemData : Object
})
const emit = defineEmits([
  'reply'
])

const commentName = defineModel('commentName')
const commentEmail = defineModel('commentEmail')
const commentContent = defineModel('commentContent')

// TODO : async, pagination, total comment, post,
// const handlePost = async () => {
//   try{
//     await axios.post( `${import.meta.env.VITE_BLOG_API}/comments`, {
//         post: detailId,
//         parent: props.itemData.id,
//         author_name: commentName.value,
//         author_email: commentEmail.value,
//         content: commentContent.value,
//       }
//     )
//     emit('reply')
//   } catch (error) {
//     console.log(error)
//   }
// }

const handlePost = () => {
  emit('reply')
}

onMounted( () => {
})

</script>

<template>
  <div>
    <h3> 대댓글 남기기 </h3>
    <div>
      <h4>이름</h4>
      <textarea v-model="commentName" style="margin: 10px; border: 1px solid black;" />
      <h4>이메일</h4>
      <textarea v-model="commentEmail" style="margin: 10px; border: 1px solid black;" />
      <h4>내용</h4>
      <textarea v-model="commentContent" style="margin: 10px; border: 1px solid black;" />
    </div>
    <button type="submit" @click="() => handlePost()" style="margin: 10px; border: 1px solid black;">Submit</button>
  </div>
</template>
