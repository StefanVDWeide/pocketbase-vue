import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  // State variable
  // Using the useLocalStorage composable provided by VueUse in order to persist state during page reloads
  const userID = ref(useLocalStorage("userID", ""));
  const username = ref(useLocalStorage("username", ""));
  const userProfileID = ref(useLocalStorage("userProfileID", ""));

  // Actions
  function clear() {
    userID.value = "";
    username.value = "";
    userProfileID.value = "";
  }

  return { userID, username, userProfileID, clear }
})
