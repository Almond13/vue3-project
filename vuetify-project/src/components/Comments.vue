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

// const showEdit = (selectedId) => {
//   // isEdit[selectedId] = !isEdit[selectedId]
//   // Object.keys(isEdit).forEach(id => {
//   //   isEdit[id] = (parseInt(id) === selectedId ? store.show() : store.hide())
//   // })
//   Object.keys(isEdit).forEach(id => {
//     if(parseInt(id) === selectedId ){
//       isEdit[id] = !isEdit[id]
//       if (isEdit[id]){
//         store.show()
//       } else {
//         store.hide()
//       }
//     } else {
//       store.hide()
//       isEdit[id] = store.edit
//     }
//   })
// }

const showEdit = (selectedId) => {
  Object.keys(isEdit).forEach(id => {
    if(parseInt(id) === selectedId) {
      isEdit[id] = !isEdit[id]
    } else {
      isEdit[id] = false
    }
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
  },
  {immediate: true}
)

onMounted( ()=>{
  commentData.value = props.data

  commentData.value.forEach(item => {
    isEdit[item.id] = false
    console.log(isEdit[148])

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
      <UpdateComment @update="handleUpdate(item.id)" :name-value="item.author_name" :content-value="item.content.rendered" :item-data="item" />
      </div>
      <comments :data="commentData.filter(v => v.parent !== 0)" :parent-id="item.id" :key="item.id"></comments>
    </div>
  </div>
</template>
