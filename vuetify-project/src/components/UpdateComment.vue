<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  detailId : String,
  buttonText: String,
  updateValue: Boolean
})
const emit = defineEmits([
  'submit',
  'update'
])

const buttonText = ref('Submit' || props.buttonText)

const commentName = defineModel('commentName')
const commentEmail = defineModel('commentEmail')
const commentContent = defineModel('commentContent')

const handlePost = () => {
  axios.post(`https://theme.sunflower.kr/wp-json/wp/v2/comments`, {
      post: props.detailId,
      parent: 0,
      author_name: commentName.value,
      author_email: commentEmail.value,
      content: commentContent.value,
    }
  )
    .then(function (response) {
      emit('submit')
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  emit('submit')
  emit('update')
}

const handleUpdate = () => {
  axios.patch(`https://theme.sunflower.kr/wp-json/wp/v2/comments`,{
    post: 32,
    id: 148,
    content: '업데이트데스트',
  })
}


watch(
  ()  => props.buttonText,
  (text) => {
    buttonText.value = text
    console.log(text)
  }
)

onMounted( ()=>{
})

</script>

<template>
  <div v-if="updateValue">
    <h3> 댓글 남기기 </h3>
    <div>
      <h4>이름</h4>
      <textarea v-model="commentName" style="margin: 10px; border: 1px solid black;" />
      <h4>이메일</h4>
      <textarea v-model="commentEmail" style="margin: 10px; border: 1px solid black;" />
      <h4>내용</h4>
      <textarea v-model="commentContent" style="margin: 10px; border: 1px solid black;" />
    </div>
    <button type="submit" @click="handlePost" style="margin: 10px; border: 1px solid black;">{{buttonText}}</button>
    <button @click="handleUpdate">업뎃</button>
  </div>
</template>
