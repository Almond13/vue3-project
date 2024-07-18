/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import {router} from '@/router/index'
import {createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Composables
import { createApp } from 'vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app
  .use(router)
app
  .use(pinia)

registerPlugins(app)

app
  .mount('#app')
