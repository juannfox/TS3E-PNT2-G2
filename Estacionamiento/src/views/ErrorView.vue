
<template>
  <ion-content :fullscreen="false">
    <div class="centered">
      <h1>Error</h1>
      <h3>{{ router.currentRoute.value.query.mensaje }}</h3>
    </div>
  </ion-content>
</template>

<script setup lang="js">
import { IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
const router = useRouter()

</script>

<style scoped>
ion-content {
  --ion-text-color: #DC143C;
  position: relative;
}
.centered{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
