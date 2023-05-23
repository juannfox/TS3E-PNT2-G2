import { defineStore} from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
        isLogin: false,
        usuario: null
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
              const usuario_backend = response.data.filter(usr => usr.email === usuario.email);
              if (usuario.password === usuario_backend[0].password){
                  this.isLogin = true
                  this.usuario = usuario.email
                  console.log("Bienvenido.")
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