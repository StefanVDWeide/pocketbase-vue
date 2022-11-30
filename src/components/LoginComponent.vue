<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { pocketBaseSymbol } from '@/symbols/injectionSymbols';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

// Init the store
const userStore = useUserStore();

// Router composable
const router = useRouter();

// Local reactive variables
const email = ref("");
const password = ref("");

// Function to authenticate the user based on email and password
const authUser = async () => {
    try {
        // Authenticate the user via email and password
        const userData = await $pb?.collection("users").authWithPassword(email.value, password.value);

        if (userData) {
            userStore.userID = userData.record.id;
            userStore.username = userData.record.profile?.username;
            userStore.userProfileID = userData.record.profile?.id!;
            router.push({ path: "/dashboard" })
        }
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <h2 class="text-2xl font-bold">
        Login
    </h2>
    <form @submit.prevent="authUser">
        <div class="grid grid-cols-1 gap-6">
            <label class="block">
                <span>Email</span>
                <input type="email" class="mt-1 block w-full" v-model="email">
            </label>
            <label class="block">
                <span>Password</span>
                <input type="password" class="mt-1 block w-full" v-model="password">
            </label>
        </div>
        <button type="submit"
            class="mt-4 text-white desktop-xl:text-2xl bg-black px-4 py-2 border-2 rounded border-black hover:bg-white dark:hover:bg-main-dark-bg hover:text-black">Login</button>
    </form>
</template>
