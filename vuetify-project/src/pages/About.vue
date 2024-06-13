<script setup>
import {onMounted, ref} from "vue";

import axios from "axios";
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()

const list = ref([])


onMounted(async () => {
  const {headers, data} = await axios.get('https://theme.sunflower.kr/wp-json/wp/v2/posts',{
    params:{
      per_page: 5
    }
  })
  list.value = data
})
</script>

<template>
  <div>
<!--    <h2>about</h2>-->
    <router-view></router-view>
  </div>
</template>

