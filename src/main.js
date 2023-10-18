import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js' 

window.__VUE_DEVTOOLS_HOST__ = 'http://localhost'
window.__VUE_DEVTOOLS_PORT__ = '3000'

createApp(App)
  .use(router)
  .use(store)  
  .mount('#app')