
<template>

  <ion-page>
      <div class="columna">
        <h2>Usuarios</h2>
        <div style="background-color: #454545; border-radius:5px; padding:1rem">
          <div class="contenedorBuscar">
            <ion-input placeholder="Ingrese email" v-model="email" style="flex:1"></ion-input>
            <ion-button @click="cargarUsuario(email)" style="flex:1; height:auto">Buscar</ion-button>
          </div>
        </div>
        <ion-button @click="mostrar">Mostrar todos</ion-button>
        <div>
          <ion-toast>{{ usuario.nombre }}</ion-toast>
        </div>
        <div v-if="mostrarItems">
          <ion-list v-bind:key="usuario" v-for="usuario in usuarios">
            <ion-item>
              <ion-label>{{ usuario.email }}</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>
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

    mostrar(){
      this.mostrarItems  = !this.mostrarItems
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
      ocultar: true,
      mostrarItems:false
    }
  },
  mounted(){
    this.cargarUsuarios()
  }
}
</script>


<style>


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

