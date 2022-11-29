<script setup lang="ts">
import NewpostComponent from "@/components/NewPostComponent.vue"
import IndividualPostComponent from '@/components/IndividualPostComponent.vue';
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol } from '@/symbols/injectionSymbols';
import { inject, onMounted, ref } from 'vue';

// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

// Init the store
const userStore = useUserStore();

// Local reactive variables
const posts = ref<any[]>([]);

// Get all the user's posts
const getOwnedPostList = async () => {
    try {
        const list = await $pb?.collection("posts").getFullList(200, {
            filter: `user = '${userStore.userID}'`,
            expand: "user"
        });
        if (list) {
            posts.value = list
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getOwnedPostList();
})

</script>

<template>
    <div>
        <h1 class="mb-3 text-2xl">Dashboard</h1>
        <div v-if="posts" class="grid grid-cols-2 gap-8">
            <div>
                <div v-for="post in posts">
                    <IndividualPostComponent :post-data="post" />
                </div>
            </div>
            <div>
                <NewpostComponent @new-post-created="getOwnedPostList" />
            </div>
        </div>
    </div>
</template>
