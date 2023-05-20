
<template>

  <ion-page>
    <ion-header></ion-header>
      <h2>Mapa de estacionamientos</h2>
      <ion-button @click="volverAlHome">Volver al home</ion-button>
  </ion-page>
</template>

<script>
import { IonButton, IonPage, IonContent } from "@ionic/vue";
export default {
  components: {
    IonButton,
    IonPage,
    IonContent,
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

