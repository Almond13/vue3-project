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

const commentStore = useCommentStore()

const commentData = ref([])

watch(
  () => commentStore.commentList,
  (data) => {
    commentData.value = data
    commentData.value.forEach(item => {
      if(commentStore.edit[item.id] === undefined || commentStore.reply[item.id] === undefined){
        commentStore.edit[item.id] = false
        commentStore.reply[item.id] = false
      }
    })
  },
  {immediate: true}
)

onMounted( ()=> {
  commentData.value = commentStore.commentList

  commentData.value.forEach(item => {
    if(commentStore.edit[item.id] === undefined || commentStore.reply[item.id] === undefined){
      commentStore.edit[item.id] = false
      commentStore.reply[item.id] = false
    }
  })
})

const date = (item) => {
  const date = item.date
  const [yy, mm, dd] = [date.slice(0,4),date.slice(5,7),date.slice(8,10)]
  return `${yy}년 ${mm}월 ${dd}일`
}

const showEdit = (selectedId) => {
  commentStore.editToggle(selectedId)
  commentStore.replyResetAll()
  !commentStore.edit[selectedId] ? commentStore.typeIndex = 1 : commentStore.typeIndex = -1

  const contentValue = commentData.value.find(item => item.id === selectedId)
  commentStore.currentComment = {
    id: selectedId,
    name: contentValue.author_name,
    content: contentValue.content.rendered.replace(/<\/?p>/g, '')
  }
}

const showReply = (selectedId) => {
  commentStore.replyToggle(selectedId)
  commentStore.editResetAll()
  !commentStore.reply[selectedId] ? commentStore.typeIndex = 1 : commentStore.typeIndex = -1
}

// FIXME: delete api 권한 이슈, delete password로 가능할지 확인
const handleDelete = (id) => {
  // axios.delete(`${import.meta.env.VITE_BLOG_API}/comments/${id}`)
}

</script>

<template>
  <div>
    <div v-for="item in commentData.filter(v => v.parent === props.parentId)" :key="item.id" style="margin: 10px; border: 1px solid red;">
      {{ item.id }} {{ item.author_name }}
      {{ date(item) }}
      부모 : {{ item.parent }}
      <button v-show="!commentStore.reply[item.id]" @click="() => showEdit(item.id)" style="margin: 10px; border: 1px solid black;">
        {{ commentStore.edit[item.id] ? `Cancel` : `Edit` }}
      </button>
      <button v-show="!commentStore.edit[item.id] && !commentStore.reply[item.id]" @click="() => handleDelete(item.id)" style="margin: 10px; border: 1px solid black;">
        Delete
      </button>
      <div v-show="!commentStore.edit[item.id]">
        <div v-html="item.content.rendered"></div>
      </div>
      <button v-show="!commentStore.edit[item.id]" @click="() => showReply(item.id)" style="margin: 10px; border: 1px solid black;">
        {{ commentStore.reply[item.id] ? `Cancel` : `Reply` }}
      </button>
      <div v-if="commentStore.reply[item.id] || commentStore.edit[item.id]">
        <UpdateComment :item-data="item" />
      </div>
      <comments :data="commentData.filter(v => v.parent !== 0)" :parent-id="item.id" :key="item.id"></comments>
    </div>
  </div>
</template>
