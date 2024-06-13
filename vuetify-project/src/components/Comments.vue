<script setup>
import { onMounted, ref, watch} from "vue";
import Comments from "@/components/Comments.vue";
import AddComment from "@/components/AddComment.vue";

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
const buttonText= ref('')

const handleButtonText = (e) => {
  buttonText.value = 'update'
  updateValue.value = true
}

const updateValue = ref(false)

const commentData = ref([])


watch(
  () => props.data,
  (data) => {
    commentData.value = data
  }
)

onMounted( ()=>{
  commentData.value = props.data
})

const date = (item) => {
  const date = item.date
  const [yy, mm, dd] = [date.slice(0,4),date.slice(5,7),date.slice(8,10)]
  return `${yy}년 ${mm}월 ${dd}일`
}

const handleUpdate = (e) => {
  emit('update')
  updateValue.value = false
}

</script>

<template>
  <div>
    <div v-for="item in props.data.filter(v => v.parent === props.parentId)" :key="item.id" style="margin: 10px; border: 1px solid red;">
      {{ item.id }} {{ item.author_name }}
      {{ date(item) }}
      <div v-html="item.content.rendered"></div>
      부모 : {{ item.parent }}
      <button @click="handleButtonText(item.id)" style="margin: 10px; border: 1px solid black;">Edit</button>
      <AddComment @update="handleUpdate(item.id)" :update-value="updateValue" :button-text="buttonText"/>
      <comments :data="props.data.filter(v => v.parent !== 0)" :parent-id="item.id" ></comments>
    </div>
  </div>
</template>
