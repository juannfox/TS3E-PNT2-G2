<template>
  <ion-page>
    <ion-content>
      <h2 class="titulo">Lista Cocheras</h2>
      <div v-if="cocheras.length > 0">
        <ion-grid class="grid">
          <ion-row>
            <ion-col>Piso</ion-col>
            <ion-col>Numero</ion-col>
            <ion-col>Estado</ion-col>
            <ion-col>Botones</ion-col>
          </ion-row>
          <ion-row v-bind:key="cochera" v-for="cochera in cocheras">
            <ion-col>{{ cochera.piso }}</ion-col>
            <ion-col>{{ cochera.numero }}</ion-col>
            <ion-col
              ><ion-chip class="no-hover" v-if="cochera.ocupada" color="danger"
                >Ocupada</ion-chip
              >
              <ion-chip class="no-hover" v-if="!cochera.ocupada" color="success"
                >Libre</ion-chip
              ></ion-col
            >
            <ion-col>
              <ion-grid>
                <ion-row class="botonesRow">
                  <ion-button
                    :disabled="cochera.ocupada"
                    @click="OcuparCochera(cochera)"
                    >Ocupar</ion-button
                  >
                  <ion-button
                    :disabled="!cochera.ocupada"
                    @click="liberarCochera(cochera)"
                    >Liberar</ion-button
                  >
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div v-if="!(cocheras.length > 0)">
        error
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonPage,
  IonContent,
  IonList,
  IonInput,
  IonToast,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonChip
} from "@ionic/vue";
import {
  obtenerCocheras,
  cambiarEstadoCochera,
} from "@/services/cocherasService";

export default {
  components: {
    IonPage,
    IonButton,
    IonContent,
    IonList,
    IonInput,
    IonToast,
    IonLabel,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonChip
  },
  methods: {
    async cargarCocheras() {
      try {
        const respuesta = await obtenerCocheras();
        this.cocheras = respuesta;
      } catch (e) {
        alert(e);
      }
    },
    async liberarCochera(cochera) {
      try {
        cambiarEstadoCochera(false, cochera).then(() =>  this.cargarCocheras());
      } catch (e) {
        alert(e);
      }
    },
    async OcuparCochera(cochera) {
      try {
        cambiarEstadoCochera(true, cochera).then(() =>  this.cargarCocheras());
      } catch (e) {
        alert(e);
      }
    },
  },
  data() {
    return {
      cocheras: [],
    };
  },
  mounted(){
    this.cargarCocheras()
  }
};
</script>

<style>
.no-hover {
  pointer-events: none;
  /* Additional styles if desired */
}
.grid {
  padding: 3rem;
}
.botonesRow {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
ion-col {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: solid 1px #fff;
  color: #fff;
}
.titulo{
  margin-left: 1rem;
}

</style>
