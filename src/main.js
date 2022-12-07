import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import 'bootstrap'
import '@/styles/app.scss'
createApp(App).use(router).mount('#app')
