<template>
  <v-app>
    <header>
      <h1>test</h1>
      <nav>
        <RouterLink to="/about/1">about</RouterLink>
      </nav>
    </header>
    <v-main>
<!--      <HelloWorld />-->

      <div style="border: 1px solid red;">
      <RouterView></RouterView>
      </div>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  //
  import { RouterLink } from 'vue-router'
</script>
