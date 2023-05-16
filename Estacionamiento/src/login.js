import { defineStore} from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => {
    return { 
        isLogin: false,
        usuario: null
    }
  },
  actions: {
    toggleLogin(usuario){
        if (this.isLogin){
            this.isLogin = false
        }else{
            console.log(usuario.email)
            if (usuario.email === "test" && usuario.password === "test"){
                this.isLogin = true
                this.usuario = usuario.email
            }else{
                console.log("Esto no es Chatgpt, aca hay seguridad.")
            }
        }
    }
  }
})