<template>
  <ion-page>
    <ion-header></ion-header>



    <h2>Mi estacionamiento</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!4v1684594554458!6m8!1m7!1svj9n1Sh9UijdfwBU2aMroQ!2m2!1d-34.61623106310098!2d-58.43499492323316!3f155.27803!4f0!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <ion-text>Nombre del estacionamiento: </ion-text>
    <ion-text> Dirección: </ion-text>

    <ion-button @click="volverAlHome">Volver al home</ion-button>
  </ion-page>
</template>

<script>
import { IonPage, IonButton, } from "@ionic/vue";
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