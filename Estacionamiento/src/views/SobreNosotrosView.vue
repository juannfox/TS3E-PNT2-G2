<template>
    <ion-page>
        <ion-content>
            <div class="centered">
                <div>
                    <h1 style="font-size: 50px;">Sobre Nosotros</h1>
                </div>
                <div style="font-size: 25px;">
                    <p> Francisco Janza - Juan Fox - Diego Sperber - Tomas Balduzzi</p>
                </div>
            </div>
            <ion-img class="bgimage" src="src/img/shopping.jpg" alt="Parkinglot.app"></ion-img>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="js">
import { IonContent, IonPage, IonImg } from "@ionic/vue";
import { useRouter } from "vue-router";
const router = useRouter()

</script>
  
<style scoped>
ion-content {
    --ion-text-color: #FFFFFF;
    position: relative;
}

.centered {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>
  