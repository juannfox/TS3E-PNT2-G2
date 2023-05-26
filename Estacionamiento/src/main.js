import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router';
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { IonicVue } from '@ionic/vue';
import {axiosPlugin} from '@/plugins/axiosPlugin.js'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
/* Theme variables */
import './theme/variables.css';

//Configuracion de Axios API client (global)
const axiosOptions = {
  baseURL: 'https://646be9b97b42c06c3b2a916c.mockapi.io/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 1000
}

//Pinia state store (persistencia entre vistas)
//Los stores se configuran luego, esto es solo el plugin
const pinia = createPinia()
//Plugin para opcionalmente persistir pinia a disco
//https://github.com/prazdevs/pinia-plugin-persistedstate
pinia.use(piniaPluginPersistedState)

/*Objeto app global de VUE (disponible como 'this' en
todos los componentes). Los objetos enviados con el
metodo .use() son plugins que luego se pueden utilizar
globalmente como this.$plugin.
*/
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(axiosPlugin, axiosOptions);

/*Inicio diferido y montaje del objeto con ID 'app'
del DOM de HTML (ver index.html).
*/
router.isReady().then(() => {
  app.mount('#app');
});