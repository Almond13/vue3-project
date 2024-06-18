<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import Comments from "@/components/Comments.vue";
import UpdateComment from "@/components/UpdateComment.vue";
import {useCommentStore} from "@/stores/comment";
import ReplyComment from "@/components/ReplyComment.vue";

const props = defineProps({
  data: Array,
  parentId: {
    default: 0,
    type: Number
  }
})

const emit = defineEmits([
  'update',
  'reply',
  'delete'
])

const store = useCommentStore()

const commentData = ref([])

watch(
  () => props.data,
  (data) => {
    commentData.value = data
    commentData.value.forEach(item => {
      if(store.edit[item.id] === undefined || store.reply[item.id] === undefined){
        store.edit[item.id] = false
        store.reply[item.id] = false
      }
    })
  },
  {immediate: true}
)

onMounted( ()=> {
  commentData.value = props.data

  commentData.value.forEach(item => {
    if(store.edit[item.id] === undefined || store.reply[item.id] === undefined){
      store.edit[item.id] = false
      store.reply[item.id] = false
    }
  })
})

const date = (item) => {
  const date = item.date
  const [yy, mm, dd] = [date.slice(0,4),date.slice(5,7),date.slice(8,10)]
  return `${yy}년 ${mm}월 ${dd}일`
}

const showEdit = (selectedId) => {
  store.editToggle(selectedId)
  store.replyResetAll()
  console.log(store.edit)
}

const showReply = (selectedId) => {
  store.replyToggle(selectedId)
  store.editResetAll()
  console.log(store.reply)
}

const handleUpdate = () => {
  emit('update')
  store.editResetAll()
}

const handleReply = () => {
  emit('reply')
  store.replyResetAll()
}

const handleDelete = (id) => {
  // axios.delete(`https://theme.sunflower.kr/wp-json/wp/v2/comments/${id}`)
  emit('delete')
}
</script>

<template>
  <div>
    <div v-for="item in commentData.filter(v => v.parent === props.parentId)" :key="item.id" style="margin: 10px; border: 1px solid red;">
      {{ item.id }} {{ item.author_name }}
      {{ date(item) }}
      부모 : {{ item.parent }}
      <button @click="() => showEdit(item.id)" style="margin: 10px; border: 1px solid black;">Edit</button>
      <button @click="() => handleDelete(item.id)" style="margin: 10px; border: 1px solid black;">Delete</button>
      <div v-if="store.edit[item.id]">
        <UpdateComment @update="handleUpdate()" :item-data="item" />
      </div>
      <div v-if="!store.edit[item.id]">
        <div v-html="item.content.rendered"></div>
      </div>
      <button @click="() => showReply(item.id)" style="margin: 10px; border: 1px solid black;">Reply</button>
      <div v-if="store.reply[item.id]">
        <ReplyComment @reply="handleReply()" :item-data="item" />
      </div>
      <comments :data="commentData.filter(v => v.parent !== 0)" :parent-id="item.id" :key="item.id"></comments>
    </div>
  </div>
</template>
