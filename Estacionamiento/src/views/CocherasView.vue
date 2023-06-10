<template>
  <ion-page>
    <ion-content>
      <h2 class="titulo" v-if="loggedUser.rol === 'administrador'">Agregar Cochera</h2>
      <ion-grid v-if="loggedUser.rol === 'administrador'" class="gridNuevaCochera">
          <ion-row>
            <ion-col >Piso</ion-col>
            <ion-col >Numero</ion-col>
            <ion-col></ion-col>

          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input  placeholder="Numero de piso" v-model="cocheraNueva.piso" @input="cocheraNueva.piso = Number($event.target.value)"></ion-input>
            </ion-col>
            <ion-col>
              <ion-input  placeholder="Numero de cochera" v-model="cocheraNueva.numero" @input="cocheraNueva.numero = $event.target.value.toUpperCase()"></ion-input>
            </ion-col>
            <ion-col>
              <ion-button

                    @click="AgregarCochera(cocheraNueva)"
                    v-if="loggedUser.rol === 'administrador'"
                    >Agregar</ion-button
                  >
            </ion-col>
          </ion-row>
      </ion-grid>


      <h2 class="titulo">Lista Cocheras</h2>
      <div v-if="cocheras.length > 0">
        <ion-grid class="grid">
          <ion-row>
            <ion-col>Piso</ion-col>
            <ion-col>Numero</ion-col>
            <ion-col>Estado</ion-col>
            <ion-col v-if="loggedUser.rol === 'administrador'">Botones</ion-col>
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
            <ion-col v-if="loggedUser.rol === 'administrador'">
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
                  <ion-button
                    @click="handlerElminarCochera(cochera)"
                    >Eliminar</ion-button
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
  IonChip,
} from "@ionic/vue";
import {
  obtenerCocheras,
  cambiarEstadoCochera,
  BorrarCochera,
  crearCochera
} from "@/services/cocherasService";
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/state/loginStore.js';
import Swal from 'sweetalert2'

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
    IonChip,
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
    async handlerElminarCochera(cochera){

          Swal.fire({
              title: `Estas seguro que deseas borrar cochera piso : ${cochera.piso} numero : ${cochera.numero} ?`,
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: 'Borrar',
              denyButtonText: `Cancelar`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                if(BorrarCochera(cochera)){
                  Swal.fire('Se borro con exito!', '', 'success').then(() => {this.cargarCocheras()})

                }else{
                  Swal.fire('Hubo un problema', '', 'info')
                }
              }
            })
    },
    async AgregarCochera(cochera){

      if(cochera.piso == '' || cochera.numero == ''){
         Swal.fire('No se ingresaron datos', '', 'info')
      }
      else if(this.cocheras.find((cocheraAux) => cocheraAux.piso === cochera.piso && cocheraAux.numero === cochera.numero)){
        Swal.fire('Hubo un problema, ya hay una cochera con esos datos', '', 'info')
      }
      else{
        Swal.fire({
                title: `Estas seguro que deseas agregar una cochera con piso : ${cochera.piso} y numero : ${cochera.numero} ?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Agregar',
                denyButtonText: `Cancelar`,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  if( await crearCochera(cochera) ){
                    await this.cargarCocheras().then(() => {
                      Swal.fire('Se agrego con exito!', '', 'success').then(() => {
                      this.cocheraNueva = {id: "", piso: "", numero:"",ocupada:false};})})


                  }else{
                    Swal.fire('Hubo un problema', '', 'info')
                  }
                }
              })
      }

    }
  },
  data() {
    return {
      cocheras: [],
    };
  },
  mounted(){
    this.cargarCocheras()
  },
  setup() {
    const cocheraNueva = {id: "", piso:"", numero:"",ocupada:false};
    //Instanciar store con su funcion instructiva
    const loginStore = useLoginStore();
    //Extraer atributos de forma reactiva
    const { loggedUser } = storeToRefs(loginStore);
    return { loggedUser, cocheraNueva }
  }
};
</script>

<style>
.swal2-container.swal2-center.swal2-backdrop-show{
  height: 100vh;
}
.no-hover {
  pointer-events: none;
  /* Additional styles if desired */
}
.grid {
  padding: 3rem;
}
.gridNuevaCochera{
  width: 30%;
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
