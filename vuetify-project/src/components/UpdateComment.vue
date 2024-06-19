<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useCommentStore} from "@/stores/comment";
import axios from "axios";

const commentStore = useCommentStore()

const props = defineProps({
  itemData : Object
})
const emit = defineEmits([
  'update',
])

const commentName = ref()
const commentContent = ref()

// FIXME: update api 권한(?) 이슈, 추후 수정
const handleUpdate = () => {
  // axios.patch( `${import.meta.env.VITE_BLOG_API}/comments`, {
  //   id: props.itemData.id,
  //   content: 'commentContent.value!!!!!!!'
  // })
  emit('update')
}

const nameValue = computed({
  get() {
    if(props.itemData !== undefined){
      return commentName.value = props.itemData.author_name
    } else {
      return commentName.value = ''
    }
  },
  set() {
  }
})

const contentValue = computed({
  get() {
    if(props.itemData !== undefined){
      return commentContent.value = props.itemData.content.rendered.replace(/<\/?p>/g, '')
    } else {
      return commentContent.value = ''
    }
  },
  set() {
  }
})

onMounted( () => {

  console.log(commentStore.currentComment.id)
  })

</script>

<template>
  <div>
    <h3> 댓글 수정 </h3>
    <div>
      <h4>이름</h4>
      <textarea v-model="nameValue" style="margin: 10px; border: 1px solid black;" />
      <h4>내용</h4>
      <input v-model="contentValue" style="margin: 10px; border: 1px solid black;" />
    </div>
    <button @click="handleUpdate" style="margin: 10px; border: 1px solid black;">Update</button>
  </div>
</template>
