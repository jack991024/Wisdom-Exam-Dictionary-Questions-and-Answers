// main.js
import App from './App'
import uviewPlus from 'uview-plus'
import Store from './store'


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
    const app = createSSRApp(App)
    app.use(uviewPlus)
    app.use(Store)
    return {
        app
    }
}
// #endif