<template>
  <v-app>
    <header>
      <h1>test</h1>
      <nav>
        <RouterLink to="/about/1">about</RouterLink>
        <RouterLink to="/category/1" @click="store.category = null">category</RouterLink>
      </nav>
    </header>
    <v-main>
<!--      <HelloWorld />-->

      <div style="border: 1px solid gray;">
      <RouterView></RouterView>
      </div>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import {useDetailStore} from "@/stores/detail";

  const store = useDetailStore()
</script>

<style>
button, input {
  margin: 10px;
  border: 1px solid black;
}
</style>
