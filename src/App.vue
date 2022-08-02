<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import navbarComponent from '@/components/navbarComponent.vue';
</script>

<template>
  <div class="container mx-auto p-4">
    <navbarComponent />
    <RouterView />
  </div>
</template>
