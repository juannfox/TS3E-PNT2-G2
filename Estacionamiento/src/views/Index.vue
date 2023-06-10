<template>
  <ion-page>
    <div class="background">
      <h2 class="title">Garage Responsive</h2>
      <ion-img class="bgimage" src="src/img/exterior.jpg" alt="Parkinglot.app"></ion-img>
    </div>
  </ion-page>
</template>

<script setup lang="js">
  import '@/css/index.css';
  import { IonPage, IonImg } from '@ionic/vue';

  const path = window.location.pathname.split('folder/')[1];
  if (path !== undefined) {
    selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
  }
</script>
