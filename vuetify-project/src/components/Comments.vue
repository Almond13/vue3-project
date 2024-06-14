<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import Comments from "@/components/Comments.vue";
import UpdateComment from "@/components/UpdateComment.vue";

const props = defineProps({
  data: Array,
  parentId: {
    default: 0,
    type: Number
  }
})

const emit = defineEmits([
  'update'
])

const showEdit = (selectedId) => {
  // isEdit[selectedId] = !isEdit[selectedId]

  Object.keys(isEdit).forEach(id => {
    isEdit[id] = (parseInt(id) === selectedId ? !isEdit[id] : false)
  })

}

const commentId = ref()

// TODO : isEdit store 등록
const isEdit = reactive({})

const commentData = ref([])


watch(
  () => props.data,
  (data) => {
    commentData.value = data
    commentData.value.forEach(item => {
      isEdit[item.id] = false
    })
  }
)

onMounted( ()=>{
  commentData.value = props.data

  commentData.value.forEach(item => {
    isEdit[item.id] = false
  })
})

const date = (item) => {
  const date = item.date
  const [yy, mm, dd] = [date.slice(0,4),date.slice(5,7),date.slice(8,10)]
  return `${yy}년 ${mm}월 ${dd}일`
}

const handleUpdate = (e) => {
  emit('update')
  isEdit.value = false
}

</script>

<template>
  <div>
    <div v-for="item in commentData.filter(v => v.parent === props.parentId)" :key="item.id" style="margin: 10px; border: 1px solid red;">
      {{ item.id }} {{ item.author_name }}
      {{ date(item) }}
      <div v-html="item.content.rendered"></div>
      부모 : {{ item.parent }}
      <button @click=" () => showEdit(item.id)" style="margin: 10px; border: 1px solid black;">Edit</button>
      <div v-if="isEdit[item.id]">
<!--      <UpdateComment @update="handleUpdate(item.id)" v-model:nameValue="item.author_name" @update:nameValue="newValue => item.author_name = newValue"/>-->
      <UpdateComment @update="handleUpdate(item.id)" :name-value="item.author_name" :content-value="item.content.rendered" :item-data="item" />
      </div>
      <comments :data="commentData.filter(v => v.parent !== 0)" :parent-id="item.id" ></comments>
    </div>
  </div>
</template>
