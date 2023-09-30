import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

window.__VUE_DEVTOOLS_HOST__ = 'http://localhost'
window.__VUE_DEVTOOLS_PORT__ = '3000'

createApp(App).use(router).mount('#app')