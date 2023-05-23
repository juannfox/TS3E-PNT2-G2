import { defineStore} from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
        isLogin: false,
        usuarioLogueado: null
    }
  },
  actions: {
    async toggleLogin(usuario){
        const url_base='https://646be9b97b42c06c3b2a916c.mockapi.io/api/v1/usuarios'
        if (this.isLogin){
            this.isLogin = false
        }else{
            try{
              const response = await axios.get(`${url_base}`);
              const usuario_backend = response.data.find(usr => usr.email === usuario.email);
              if (usuario.password === usuario_backend.password){
                  this.isLogin = true
                  this.usuarioLogueado = usuario_backend.name
              }else{
                console.log("ERROR: Login rechazado por la NASA.")
              }
            } catch (e){
              alert(`ERROR: ${e}`);
            }
        }
    }
  }
})