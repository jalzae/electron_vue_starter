import { createApp } from 'vue'
import './style.css';
import App from './App.vue'
import { createPinia } from 'pinia';
import axios from './plugins/axios';
import router from './router'

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(axios, {
  baseUrl: 'https://cataas.com/',
})
app.mount('#app');
