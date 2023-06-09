import { defineStore } from 'pinia';

//Atributos
const stateObject = {
  loggedIn: false,
  loggedUser:  null
}

//Metodos
const actionsObject = {
  logout(){
    this.loggedIn = false
  },

  login(){
    this.loggedIn = true
  },

  guardarUsuario(usuario){
    let {password: _, ...usuarioRecortado} = usuario
    this.loggedUser = usuarioRecortado
    console.log(this.loggedUser)
  }
}
/*Opciones de Pinia
State son atributos, actions son metodos, this es el store
https://pinia.vuejs.org/core-concepts
*/
const piniaOptions = {
  state: () => {return stateObject},
  actions: actionsObject,
  persist: {
    storage: sessionStorage
  },
}

//Store
export const useLoginStore = defineStore('login', piniaOptions)
