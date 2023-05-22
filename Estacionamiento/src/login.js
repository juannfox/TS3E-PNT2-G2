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
            const response = await axios.get(`${url_base}`);
            if (response.status == 200){
              const usuario_backend = response.data.filter(usr => usr.email === usuario.email);
              console.log(usuario_backend);
              if (usuario.password === usuario_backend[0].password){
                  this.isLogin = true
                  this.usuario = usuario.email
                  console.log("Bienvenido.")
              }else{
                  console.log("ERROR: Login rechazado por la NASA.")
              }
            }else{
              console.log("ERROR: No se pudo iniciar sesion por errores de BE.")
            }
        }
    }
  }
})