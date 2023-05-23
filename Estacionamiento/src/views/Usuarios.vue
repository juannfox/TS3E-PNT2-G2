
<template>

  <ion-page>
      <ion-content>
        <h2>Usuarios</h2>
        <ion-button @click="volverAlHome">Volver al home</ion-button>
        <ion-button @click="cargarUsuarios">Mostrar lista</ion-button>
        <div v-if="true">
          <ion-list v-bind:key="usr" v-for="usr in usuarios">
            <ion-item>
              <ion-label>{{ usr.email  }}</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonPage, IonContent, IonList } from "@ionic/vue";
import usuariosService from "@/services/usuariosService";

export default {
  components: {IonPage, IonButton, IonContent, IonList},
  methods: {
    iraHome() {
      this.$router.push("/")
    },
    async agregaraLista() {
      // Falta control de ingreso de datos
      try {
        const elemento = {...this.elemento}
        await usuariosService.agregar(elemento)
        await this.cargarLista()
        this.elemento = {}
      } catch(e) {
        alert(e)
      }
    },
    ordenarLista() {
      this.lista.sort( (a,b) => a.id - b.id  )
    },
    async cargarUsuarios() {
      try {
        const respuesta = await usuariosService.obtenerUsuarios()
        this.usuarios = respuesta
      } catch(e) {
        alert(e)
      }
    },
    async eliminar(id) {
      try {
        await usuariosService.eliminar(id)
        await this.cargarLista()
      } catch( e) {
        alert('Se produjo un error')
      }
    },
    async modificar(id) {
      try {
        const elemento = {...this.elemento}
        await usuariosService.modificar(id,elemento)
        await this.cargarLista()
        this.elemento = {}
      } catch( e) {
        alert('Se produjo un error')
      }
    }
  },
  data() {
    return {
      usuarios: [],
      elemento: {},
      ocultar: true
    }
  }
}
</script>


<style>
</style>

