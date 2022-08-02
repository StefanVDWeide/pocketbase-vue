<script setup lang="ts">
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

</script>

<template>
  <div>
    <h1 class="mb-12 text-2xl">Login page</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <LoginComponent />
      </div>
      <div>
        <RegisterComponent />
      </div>
    </div>
  </div>
</template>
