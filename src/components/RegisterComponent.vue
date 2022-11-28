<script setup lang="ts">
import { inject, ref } from 'vue';
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

// Init the store
const userStore = useUserStore();

// Router composable
const router = useRouter();

// Reactive variables
const email = ref("");
const username = ref("");
const password = ref("");
const passwordConfirm = ref("");

// Function to create a new user
const createUser = async () => {
    try {
        if (validateInput()) {
            // Create new user
            const user = await $pb?.collection('users').create({
                username: username.value,
                email: email.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value,
            });
            if (user) {
                // Authenticate the user in order to set the username
                await authUser();

                // Set the username
                // await $pb?.Records.update("profiles", user.profile!.id, { username: username.value })

                // After succesfull user registration, redirect to dashboard
                router.push({ path: "/dashboard" });
            } else {
                console.log("Error");
            }
        } else {
            alert("Password doesn't match")
        }
    } catch (error) {
        console.log(error)
    }
};

// Function to authenticate the user based on email and password
const authUser = async () => {
    try {
        const userData = await $pb?.collection('users').authViaEmail(email.value, password.value);
        // TODO: Better error handling
        if (userData) {
            userStore.userID = userData.user.id;
            userStore.username = userData.user.profile?.username;
            userStore.userProfileID = userData.user.profile?.id!;
        } else {
            console.log("error");
        }
    } catch (error) {
        console.log(error)
    }
};

// Simple utility function to validate input. Easiliy extendable with additional checks if needed
const validateInput = () => {
    if (password.value !== passwordConfirm.value) {
        return false;
    } else {
        return true;
    }
};

</script>

<template>
    <h2 class="text-2xl font-bold">Register</h2>
    <form @submit.prevent="createUser">
        <div class="grid grid-cols-1 gap-6">
            <label class="block">
                <span>Username</span>
                <input type="text" class="mt-1 block w-full" v-model="username">
            </label>
            <label class="block">
                <span>Email</span>
                <input type="email" class="mt-1 block w-full" v-model="email">
            </label>
            <label class="block">
                <span>Password</span>
                <input type="password" class="mt-1 block w-full" v-model="password">
            </label>
            <label class="block">
                <span>Repeat Password</span>
                <input type="password" class="mt-1 block w-full" v-model="passwordConfirm">
            </label>
        </div>
        <button type="submit"
            class="mt-4 text-white desktop-xl:text-2xl bg-black px-4 py-2 border-2 rounded border-black hover:bg-white dark:hover:bg-main-dark-bg hover:text-black">Sign
            Up</button>
    </form>
</template>
