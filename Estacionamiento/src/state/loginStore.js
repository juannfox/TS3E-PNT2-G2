import usuariosService from '@/services/usuariosService.js';
import { defineStore} from 'pinia';

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

  async login(solicitante){
    try{
      //Query al backend
      let usuario = usuariosService.obtenerUsuario(solicitante.email)
      //Validacion de credenciales
      if ((usuario != null) && usuario.password === solicitante.password){
          this.loggedIn = true
          //Remueve la password del objeto usuario
          const {password: _, ...usuario} = usuario
          this.loggedUser = usuario
      }else{
        console.log()
        alert("ERROR: Login rechazado.");
      }
    } catch (e){
      alert(`ERROR: ${e}`);
    }
  }
}

/*Opciones de Pinia
State son atributos, actions son metodos, this es el store
https://pinia.vuejs.org/core-concepts
*/
const piniaOptions = {
  state: () => (stateObject),
  actions: actionsObject
}

//Store
export const useLoginStore = defineStore('login', piniaOptions)
