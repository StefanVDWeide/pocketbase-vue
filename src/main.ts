import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/index.css'

// Import the PocketBase JS library
import client from '@/pocketbase';

// Import custom pocketBase type
import { pocketBaseSymbol } from "@/symbols/injectionSymbols"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide(pocketBaseSymbol, client)

app.mount('#app')
