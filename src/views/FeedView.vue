<script setup lang="ts">
import { pocketBaseSymbol } from '@/symbols/injectionSymbols';
import { inject, onMounted, onUnmounted, ref } from 'vue';
import IndividualPostComponent from '../components/IndividualPostComponent.vue';

// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

// Local reactive variables
const posts = ref({});

// Get all the user's posts
const getPostList = async () => {
    try {
        const list = await $pb?.Records.getFullList("posts", 200, {
            expand: "userdata"
        });
        if (list) {
            posts.value = list
        }
    } catch (error) {
        console.log(error);
    }
}

const subscribeToAllPosts = async () => {
    await $pb?.Realtime.subscribe("posts", async function (e) {
        await getPostList();
    })
}

const unsubscribeToAllPosts = async () => {
    await $pb?.Realtime.unsubscribe("posts");
}

onMounted(async () => {
    await getPostList();
    await subscribeToAllPosts();
})

onUnmounted(async () => {
    await unsubscribeToAllPosts();
})

</script>

<template>
    <div>
        <h1 class="mb-3 text-2xl">Feed</h1>
        <div class="grid grid-cols-3">
            <div v-for="post in posts" class="col-start-2 col-span-1">
                <IndividualPostComponent :post-data="post" />
            </div>
        </div>
    </div>
</template>
