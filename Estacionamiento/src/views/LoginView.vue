<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-content>
        <!--Espacio en blanco para que el Header se ubique debajo de la barra de menú-->
      </ion-content>
      <ion-toolbar>
        <ion-title class="ion-text-center">Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <form v-if="!loggedIn">
        <ion-item style="margin-top:100px">
          <ion-text postion="floating">Email: </ion-text>
          <ion-input type="email" v-model="usuarioInput.email" style="margin-left:10px;" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-text postion="floating">Contraseña: </ion-text>
          <ion-input type="password" v-model="usuarioInput.password" style="margin-left:10px;" required></ion-input>
        </ion-item>
        <ion-button v-on:click="loguear(usuarioInput)">Login</ion-button>
      </form>
      <div v-if="loggedIn">
        <ion-text>
          <h1>Usted ya se encuentra loggueado: {{ loggedUser.email }}.</h1>
        </ion-text>
        <ion-button v-on:click="desloguear">Cerrar sesión</ion-button>
        <ion-button v-on:click="this.$router.push('/')">Volver a Inicio</ion-button>
      </div>
    </ion-content>

  </ion-page>
</template>

<script setup lang="js">
import {
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonInput,
  IonTitle,
  IonToolbar,
  IonItem,
  IonText,
} from '@ionic/vue';
import { obtenerUsuario } from '@/services/usuariosService.js';
import { storeToRefs } from 'pinia';
import {useLoginStore} from '@/state/loginStore.js';
import { useRouter } from 'vue-router';
const router = useRouter()

//Instanciar store con su funcion instructiva
const loginStore = useLoginStore();
//Extraer atributos de forma reactiva
//Dentro de <script setup> utilizar 'this' para accederlos
//Fuera (template) no hace falta.
let { loggedIn, loggedUser } = storeToRefs(loginStore);
//Extraer metodos de forma destructurativa
const { login, logout, guardarUsuario } = loginStore;

//Placeholder
const usuarioInput = {
  email: "",
  password: ""
};

async function loginUsuario(solicitante){
    try{
      //Query al backend
      let usuario = await obtenerUsuario(solicitante.email)
      if (usuario != undefined){
        //Validacion de credenciales
        if (usuario.password === solicitante.password){
          login()
          guardarUsuario(usuario)
          return true
        }else{
          alert("Login rechazado.")
        }
      }else{
        alert("Usuario no encontrado.")
      }
    } catch (e){
      alert("Error al iniciar sesión.")
      console.log(`ERROR '${e.name}': ${e.message}\n${e.stack}`)
      console.trace()
    }
}

//Iniciar sesion
async function loguear(usuario){
  await loginUsuario(usuario)
  if (this.loggedIn){
    router.push('/')
  }
}

//Cerrar sesion y ofrecer iniciar sesion
function desloguear(){
  logout()
  router.push('/login')
}

</script>

