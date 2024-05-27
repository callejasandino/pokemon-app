<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar/Navbar.vue'
</script>

<template>
   <div>
      <Navbar class="mb-10" />
      <RouterView class="p-10" />
   </div>
</template>

<style scoped></style>
