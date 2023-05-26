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

    <ion-content :fullscreen="true" v-if="!loggedIn">
      <form>
        <ion-item style="margin-top:100px">
          <ion-text postion="floating">Email: </ion-text>
          <ion-input type="email" v-model="usuario.email" style="margin-left:10px;" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-text postion="floating">Contraseña: </ion-text>
          <ion-input type="password" v-model="usuario.password" style="margin-left:10px;" required></ion-input>
        </ion-item>
        <ion-button v-on:click="loguear(usuario)">Login</ion-button>
      </form>
    </ion-content>
    <ion-content :fullscreen="true" v-if="loggedIn">
      <ion-text color="primary">
        <h1>Usted ya se encuentra loggueado: {{ loggedUser.email }}.</h1>
      </ion-text>
      <ion-button v-on:click="desloguear">Cerrar sesión</ion-button>
      <ion-button v-on:click="this.$router.push('/')">Volver a Inicio</ion-button>
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
import usuariosService from '@/services/usuariosService.js'
import { storeToRefs } from 'pinia';
import {useLoginStore} from '@/state/loginStore.js';
import { useRouter } from 'vue-router';
const router = useRouter()

//Instanciar store con su funcion instructiva
const loginStore = useLoginStore();
//Extraer atributos de forma reactiva
const { loggedIn, loggedUser } = storeToRefs(loginStore);
//Extraer metodos de forma destructurativa
const { login, logout } = loginStore;

//Placeholder
const usuario = {
  email: "",
  password: ""
};

//Iniciar sesion
function loguear(usuario){
  login(usuario)
  if (loggedIn){
    router.push('/')
  }
}

//Cerrar sesion y ofrecer iniciar sesion
function desloguear(){
  logout()
  router.push('/login')
}

</script>
