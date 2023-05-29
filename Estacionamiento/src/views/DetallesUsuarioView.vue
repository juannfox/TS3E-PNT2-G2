<template>
  <ion-page>
    <ion-header></ion-header>

    <h1>{{ loggedUser.name }}</h1>

    <ion-button @click="volverAlHome">Volver al home</ion-button>
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonHeader } from "@ionic/vue";

import { storeToRefs } from "pinia";
import { useLoginStore } from "@/state/loginStore.js";

export default {
  components: {
    IonButton,
    IonPage,
    IonHeader,
  },
  methods: {
    volverAlHome() {
      this.$router.push("/");
    },
  },

  setup() {
    const loginStore = useLoginStore();
    const { loggedUser } = storeToRefs(loginStore);

    return { loggedUser };
  },
};
</script>

<style>
</style>