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

// FIXME: update api 권한(?) 이슈, 추후 수정
const handleEditUpdate = () => {
  // axios.patch( `${import.meta.env.VITE_BLOG_API}/comments`, {
  //   id: props.itemData.id,
  //   content: 'commentContent.value!!!!!!!'
  // })
  emit('edit')
  commentStore.editResetAll()
}

const nameValue = computed({
  get() {
    if(props.itemData !== undefined){
      return props.itemData.author_name
    } else {
      return ''
    }
  },
  set(value) {
    if(props.itemData !== undefined){
      return commentStore.currentComment.name = `${value}`
    } else {
      return commentStore.postComment.name = `${value}`
    }
  }
})

const contentValue = computed({
  get() {
    if(props.itemData !== undefined){
      return props.itemData.content.rendered.replace(/<\/?p>/g, '')
    } else {
      return ''
    }
  },
  set(value) {
    if(props.itemData !== undefined){
      return commentStore.currentComment.content = `${value}`
    } else {
      return commentStore.postComment.content = `${value}`
    }
  }
})

const emailValue = computed({
  get() {
    if(props.itemData !== undefined){
      return props.itemData.author_email
    } else {
      return ''
    }
  },
  set(value) {
    if(props.itemData !== undefined){
      return commentStore.currentComment.email = `${value}`
    } else {
      return commentStore.postComment.email = `${value}`
    }
  }
})


onMounted( () => {
  // console.log(Object.keys(commentStore.currentComment).length === 0)
  const check = Object.values(commentStore.edit).includes(true)
  })

const isAdd = commentStore.typeIndex > 0
const isEdit = commentStore.typeIndex < 0 && Object.values(commentStore.edit).includes(true)

</script>

<template>
  <div>
    <h3> 댓글 수정 </h3>
    <div>
      <h4>이름</h4>
      <textarea v-model="nameValue" style="margin: 10px; border: 1px solid black;" />
      <h4>이메일</h4>
      <input v-model="emailValue" style="margin: 10px; border: 1px solid black;" />
      <h4>내용</h4>
      <input v-model="contentValue" style="margin: 10px; border: 1px solid black;" />
    </div>
    <div v-if="isAdd">
      <button @click="commentStore.handleAdd()" style="margin: 10px; border: 1px solid black;">Submit</button>
    </div>
    <div v-else-if="isEdit">
      <button @click="handleEditUpdate" style="margin: 10px; border: 1px solid black;">Update</button>
    </div>
    <div v-else>
      <button @click="" style="margin: 10px; border: 1px solid black;">Reply Update</button>
    </div>
  </div>
</template>
