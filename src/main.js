import { createApp } from 'vue'
import App from './App.vue'
import router from './router'// import Router from './router'
import './assets/styles.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

const app = createApp(App)
app.use(router)
createApp(App).mount('#app')
