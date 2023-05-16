<template>
  <ion-page>
    <h2 style="margin-top:100px;">Garage Responsive</h2>
  </ion-page>
</template>

<script setup lang="js">
import {
  IonButton,
  IonPage,
  IonInput
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
