<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import Comments from "@/components/Comments.vue";
import UpdateComment from "@/components/UpdateComment.vue";
import {useCommentStore} from "@/stores/comment";

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

const store = useCommentStore()

const showEdit = (selectedId) => {
  store.toggle(selectedId)
  console.log(store.edit)
}

const commentId = ref()

const commentData = ref([])


watch(
  () => props.data,
  (data) => {
    commentData.value = data
    commentData.value.forEach(item => {
      if(store.edit[item.id] === undefined){
        store.edit[item.id] = false
      }
    })
  },
  {immediate: true}
)

onMounted( ()=>{
  commentData.value = props.data

  commentData.value.forEach(item => {
    if(store.edit[item.id] === undefined){
      store.edit[item.id] = false
    }
  })
})

const date = (item) => {
  const date = item.date
  const [yy, mm, dd] = [date.slice(0,4),date.slice(5,7),date.slice(8,10)]
  return `${yy}년 ${mm}월 ${dd}일`
}

const handleUpdate = (e) => {
  emit('update')
  store.resetAll()
}

</script>

<template>
  <div>
    <div v-for="item in commentData.filter(v => v.parent === props.parentId)" :key="item.id" style="margin: 10px; border: 1px solid red;">
      {{ item.id }} {{ item.author_name }}
      {{ date(item) }}
      부모 : {{ item.parent }}
      <button @click=" () => showEdit(item.id)" style="margin: 10px; border: 1px solid black;">Edit</button>
      <div v-if="store.edit[item.id]">
        <UpdateComment @update="handleUpdate(item.id)" :name-value="item.author_name" :content-value="item.content.rendered" :item-data="item" />
      </div>
      <div v-if="!store.edit[item.id]">
        <div v-html="item.content.rendered"></div>
      </div>
      <comments :data="commentData.filter(v => v.parent !== 0)" :parent-id="item.id" :key="item.id"></comments>
    </div>
  </div>
</template>
