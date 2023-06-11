<template>
    <ion-page>
        <ion-content class="background">
            <div class="contenedor">
                <ion-img class="bgimage" src="src/img/shopping4.jpg" alt="Parkinglot.app"></ion-img>
                <ion-card color="light">
                    <ion-card-content>
                        <ion-title color="primary" style="padding-bottom:12px;font-size: 2.3rem;">Quiénes somos</ion-title>
                        <ion-title color="secondary" style="padding-bottom:10px;font-size: 1.2rem;font-style:italic;">Alumnos de PNT2 en ORT</ion-title>
                        <ion-list color="light" style="padding:0px">
                            <ion-item color="light" style="width: 100%;text-align: center;" v-for="integrante in integrantes">
                                <ion-icon :icon="person"></ion-icon>
                                <ion-label>{{ integrante }}</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="js">
import { person } from 'ionicons/icons';
import '@/css/index.css';
import {
    IonContent, IonPage, IonImg, IonList, 
    IonItem, IonTitle, IonLabel, IonCard, IonCardContent
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent, ref } from 'vue';
const router = useRouter()

const integrantes = ref(["Francisco Janza","Juan Fox","Diego Sperber","Tomas Balduzzi"])

</script>
  
<style scoped>
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.background {
    position: relative;
    text-align: center;
  }

.bgimage {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

</style>
  