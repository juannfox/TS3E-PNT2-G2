<template>
  <ion-page>
    <ion-header></ion-header>

    <h1>{{ loggedUser.name }}</h1>
    
    <ion-button @click="volverAlHome">Volver al home</ion-button>
  </ion-page>
</template>

<script>
import { IonPage, IonButton } from "@ionic/vue";

import { storeToRefs } from "pinia";
import { useLoginStore } from "@/state/loginStore.js";

const loginStore = useLoginStore();
const { loggedIn, loggedUser } = storeToRefs(loginStore);
const { logout } = loginStore;

export default {
  components: {
    IonButton,
    IonPage,
  },
  methods: {
    volverAlHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>