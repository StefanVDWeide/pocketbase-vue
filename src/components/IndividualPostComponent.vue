<script setup lang="ts">
const props = defineProps({
    postData: Object
});

</script>

<template>
    <div class="mb-8 p-4 bg-blue-50 rounded">
        <h2 class="text-2xl font-bold">{{ props.postData?.title }}</h2>
        <span class="text-gray-400">{{ props.postData?.expand.user.username }}</span>
        <p>{{ props.postData?.content }}</p>
    </div>
</template>
