import axios from 'axios';

/*Plugin de Vue para adaptar Axios y utilizarlo
en el main (importado) como un objeto global.
Basicamente instruye a Vue sobre como inicializar
Axios y le pasa un objeto de configuracion personalizado.
https://vuejs.org/guide/reusability/plugins.html
*/
export const axiosPlugin= {
    //Todo plugin necesita un metodo install para instruir a Vue
    install(app, options) {
      app.config.globalProperties.$axios = axios.create({
        baseURL: options.baseUrl,
        headers: options.headers,
        timeout: options.timeout
    })
    }
}