
<template>

  <ion-page>
      <ion-content>
        <h2>Usuarios</h2>
        <div v-if="! usuarios.length > 0">
          <ion-input placeholder="Ingrese email" v-model="email"></ion-input>
          <ion-button @click="cargarUsuario(email)">Buscar</ion-button>
        </div>
        <ion-button @click="cargarUsuarios">Mostrar todos</ion-button>
        <div>
          <ion-toast>{{ usuario.nombre }}</ion-toast>
        </div>
        <div v-if="usuarios.length > 0">
          <ion-list v-bind:key="usuario" v-for="usuario in usuarios">
            <ion-item>
              <ion-label>{{ usuario.email }}</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>
  </ion-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { IonButton,
  IonPage,
  IonContent,
  IonList,
  IonInput,
  IonToast,
  IonLabel,
  IonItem
} from "@ionic/vue";
import { obtenerUsuario, obtenerUsuarios } from "@/services/usuariosService";

export default {
  components: {IonPage, IonButton, IonContent, IonList, IonInput, IonToast, IonLabel, IonItem},
  methods: {
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
    async cargarUsuario(email) {
      this.usuario = await obtenerUsuario(email)
    },
    async cargarUsuarios() {
      try {
        const respuesta = await obtenerUsuarios()
        this.usuarios = respuesta
      } catch(e) {
        alert(e)
      }
    },
    async eliminar(id) {
      try {
        await eliminar(id)
        await this.cargarLista()
      } catch( e) {
        alert('Se produjo un error')
      }
    },
    async modificar(id) {
      try {
        const elemento = {...this.elemento}
        await modificar(id,elemento)
        await this.cargarLista()
        this.elemento = {}
      } catch( e) {
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
      ocultar: true
    }
  }
}
</script>


<style>
</style>

