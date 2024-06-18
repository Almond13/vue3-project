<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  itemData : Object
})
const emit = defineEmits([
  'update',
])

const commentName = ref()
const commentContent = ref()

const handleUpdate = () => {
  // axios.patch(`https://theme.sunflower.kr/wp-json/wp/v2/comments`,{
  //   id: props.itemData.id,
  //   content: 'commentContent.value!!!!!!!'
  // })
  emit('update')
}

const nameValue = computed({
  get() {
    return props.itemData.author_name
  },
  set(value) {
    commentName.value = value
  }
})

const contentValue = computed({
  get() {
    return props.itemData.content.rendered.replace(/<\/?p>/g, '')
  },
  set(value) {
    commentContent.value = value
  }
})


onMounted( () => {

  })

</script>

<template>
  <div>
    <h3> 댓글 수정 </h3>
    <div>
<!--      <h4>이름</h4>-->
<!--      <input v-model="nameValue" style="margin: 10px; border: 1px solid black;" readonly />-->
      <h4>내용</h4>
      <input v-model="contentValue" style="margin: 10px; border: 1px solid black;" />
    </div>
    <button @click="handleUpdate" style="margin: 10px; border: 1px solid black;">Update</button>
  </div>
</template>
