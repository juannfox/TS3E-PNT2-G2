
<template>
  <ion-content :fullscreen="false">
    <div class="centered">
      <h1>Error</h1>
      <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_UxVUy6KZG1.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .centered h1{
    font-size: 75px;
  }
  .centered h3{
    font-size: 50px;
  }
</style>
