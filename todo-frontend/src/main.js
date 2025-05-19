// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use()
app.use(PrimeVue)
app.mount('#app')

