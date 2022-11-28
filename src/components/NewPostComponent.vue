<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
import { pocketBaseSymbol } from '@/symbols/injectionSymbols';
import { useUserStore } from '@/stores/user';

// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

// Init the store
const userStore = useUserStore();

// Init emits
const emit = defineEmits(["newPostCreated"])

// State
const title = ref("");
const content = ref("");

// Methods
const createPost = async () => {
    try {
        const postPayload = {
            title: title.value,
            content: content.value,
            user: userStore.userID,
            userdata: userStore.userProfileID
        }
        const response = await $pb?.collection("posts").create(postPayload);
        if (response) {
            emit('newPostCreated');
            title.value = "";
            content.value = "";
        }
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <h2 class="text-2xl font-bold">Create new post</h2>
    <form @submit.prevent="createPost">
        <div class="grid grid-cols-1 gap-6">
            <label class="block">
                <span>Title</span>
                <input type="text" class="mt-1 block w-full" v-model="title">
            </label>
            <label class="block">
                <span>Content</span>
                <textarea class="mt-1 block w-full" v-model="content"></textarea>
            </label>
        </div>
        <button type="submit"
            class="mt-4 text-white desktop-xl:text-2xl bg-black px-4 py-2 border-2 rounded border-black hover:bg-white dark:hover:bg-main-dark-bg hover:text-black">
            Submit
        </button>
    </form>
</template>
