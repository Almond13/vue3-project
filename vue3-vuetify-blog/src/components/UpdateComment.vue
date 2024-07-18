<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useCommentStore} from "@/stores/comment";
import axios from "axios";
import {useDetailStore} from "@/stores/detail";

const commentStore = useCommentStore()
const detailStore =useDetailStore()

const props = defineProps({
  itemData : Object
})
const emit = defineEmits([
  'edit',
])

const isAdd = commentStore.typeIndex > 0
const isEdit = commentStore.typeIndex < 0 && Object.values(commentStore.edit).includes(true)
const title = () => {
  if(isAdd){
    return '댓글 달기'
  }else if(isEdit){
    return '댓글 수정'
  }else {
    return '대댓글 달기'
  }
}
const setRead = () => {
  if(isEdit){

  }
}

const nameValue = computed({
  get() {
    if(isEdit){
      return props.itemData.author_name
    } else {
      return ''
    }
  },
  set(value) {
      return commentStore.postComment ={
        ...commentStore.postComment,
        name : `${value}`
      }
  }
})

const contentValue = computed({
  get() {
    if(isEdit){
      return props.itemData.content.rendered.replace(/<\/?p>/g, '')
    } else {
      return ''
    }
  },
  set(value) {
      return commentStore.postComment = {
        ...commentStore.postComment,
        content: `${value}`
      }
  }
})

const emailValue = computed({
  get() {
    if(isEdit){
      return props.itemData.author_email
    } else {
      return ''
    }
  },
  set(value) {
      return commentStore.postComment = {
        ...commentStore.postComment,
        email: `${value}`
      }
  }
})

onMounted( () => {
  })



</script>

<template>
  <div>
    <h3>{{title()}}</h3>
    <div>
      <h4>이름</h4>
      <input v-model="nameValue"/>
      <div v-if="!isEdit">
        <h4>이메일</h4>
        <input v-model="emailValue"/>
      </div>
      <h4>내용</h4>
      <input v-model="contentValue"/>
    </div>
    <div v-if="isAdd">
      <button @click="commentStore.handleAdd()">Submit</button>
    </div>
    <div v-else-if="isEdit">
      <button @click="commentStore.handleEditUpdate()">Update</button>
    </div>
    <div v-else>
      <button @click="commentStore.handleReply()">Reply Update</button>
    </div>
  </div>
</template>
