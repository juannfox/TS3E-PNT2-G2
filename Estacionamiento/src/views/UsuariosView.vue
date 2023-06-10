
<template>

  <ion-page v-if="loggedUser.rol === 'administrador'">
      <div class="columna">
        <h2>Usuarios</h2>
        <!-- <div style="background-color: #454545; border-radius:5px; padding:1rem">
          <div class="contenedorBuscar">
            <ion-input placeholder="Ingrese email" v-model="email" style="flex:1"></ion-input>
            <ion-button @click="cargarUsuario(email)" style="flex:1; height:auto">Buscar</ion-button>
          </div>
        </div> -->
        <ion-button @click="mostrar()">Mostrar todos</ion-button>
        <div>
          <ion-toast>{{ usuario.nombre }}</ion-toast>
        </div>
        <ion-grid v-if="mostrarItems" class="grid">
          <ion-row>
              <ion-col>Email</ion-col>
              <ion-col>Rol</ion-col>
          </ion-row>
          <ion-row v-bind:key="usuario" v-for="usuario in usuarios">
              <ion-col>{{ usuario.email }}</ion-col>
              <ion-col>{{ usuario.rol }}</ion-col>
          </ion-row>
        </ion-grid>
      </div>
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
  IonRow,
  IonCol,
  IonGrid
} from "@ionic/vue";
import { obtenerUsuario, obtenerUsuarios } from "@/services/usuariosService";

import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/state/loginStore.js';



export default {
  components: { IonPage, IonButton, IonContent, IonList, IonInput, IonToast, IonLabel, IonItem, IonRow, IonCol, IonGrid },
  methods: {
    mostrar(){
      this.cargarUsuarios();
      this.mostrarItems  = !this.mostrarItems;
      console.log(this.mostrarItems)
    },
    async agregaraLista() {
      // Falta control de ingreso de datos
      try {
        const elemento = { ...this.elemento }
        await usuariosService.agregar(elemento)
        await this.cargarLista()
        this.elemento = {}
      } catch (e) {
        alert(e)
      }
    },
    async cargarUsuario(email) {
      this.usuario = await obtenerUsuario(email)
    },
    async cargarUsuarios() {
      try {
        const respuesta = await obtenerUsuarios()
        console.log({respuesta})
        this.usuarios = respuesta
      } catch (e) {
        alert(e)
      }
    },
    async eliminar(id) {
      try {
        await eliminar(id)
        await this.cargarLista()
      } catch (e) {
        alert('Se produjo un error')
      }
    },
    async modificar(id) {
      try {
        const elemento = { ...this.elemento }
        await modificar(id, elemento)
        await this.cargarLista()
        this.elemento = {}
      } catch (e) {
        alert('Se produjo un error')
      }
    }
  },
  data() {
    return {
      email: '',
      usuario: null,
      usuarios: [],
      elemento: {},
      ocultar: true,
      mostrarItems: false
    }
  },
  setup() {
    //Instanciar store con su funcion instructiva
    const loginStore = useLoginStore();
    //Extraer atributos de forma reactiva
    const { loggedUser } = storeToRefs(loginStore);
    return { loggedUser }
  }
}
</script>

<style>
.grid {
  padding: 3rem;
  width:70%
}
ion-col {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: solid 1px #fff;
  color: #fff;
  flex:1
}

.contenedorBuscar{
  display:flex;
  flex-direction: row;
  gap: 2rem;
}
.columna{
  display:flex;
  flex-direction: column;
  align-items: center;
  gap:2rem
}
</style>

