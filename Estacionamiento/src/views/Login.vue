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
  </ion-page>
</template>

<!--
<template>
  <ion-page>
    <ion-input type="email" label="Email" v-model="usuario.email" style="margin-top:100px;"></ion-input>
    <ion-input type="password" label="Contraseña" v-model="usuario.password"></ion-input>
    <ion-button v-on:click="loguear(usuario)">Login</ion-button>
  </ion-page>
</template>
-->

<script setup lang="js">
import {
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonInput,
  IonTitle,
  IonToolbar,
  IonLabel
} from '@ionic/vue';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/login.js';
import { useRouter } from 'vue-router';
const router = useRouter()

const store = useLoginStore();
const { isLogin } = storeToRefs(store);
const { toggleLogin } = store;
const usuario = {
  email: "",
  password: ""
};

function loguear(usuario){
  toggleLogin(usuario)
  router.push('/')
}


const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>
