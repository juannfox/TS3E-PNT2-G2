<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <ion-card color="light">
          <img alt="Usuario" src="@/img/usuario.png" style="height: 128px"/>
          <ion-card-header class="card-header">
            <ion-card-title>{{ loggedUser.name }}</ion-card-title>
            <ion-card-subtitle>{{ loggedUser.rol }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content v-show="! editarEmailButton">
            <ion-item>
              <ion-label>Email: {{ loggedUser.email }}</ion-label>
              <ion-button v-on:click="toggleEditarEmailButton()">
                <ion-icon :icon="create"></ion-icon>
              </ion-button>
              </ion-item>
          </ion-card-content>
          <ion-card-content v-show="editarEmailButton">
            <ion-item>
              <ion-label>Email: {{ loggedUser.email }}</ion-label>
              <ion-input type="text" v-model="email" required label="Email"
              label-placement="start" :placeholder="loggedUser.email"></ion-input>
              <ion-button v-on:click="editarEmail(email)">
                <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-card-content>
        </ion-card>
    </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="js">
import {
  IonPage, IonButton, IonContent, IonCard,
  IonCardContent, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonItem, IonLabel, IonIcon,
  IonInput, IonText, IonHeader
} from "@ionic/vue";
import { defineComponent, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/state/loginStore.js";
import { create, checkmarkCircleOutline } from 'ionicons/icons';
import { obtenerUsuario, actualizarUsuario } from '@/services/usuariosService.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const router = useRouter()

const loginStore = useLoginStore();
const { loggedUser } = storeToRefs(loginStore);


const email = ref(null)
const editarEmailButton = ref(false)

function toggleEditarEmailButton(){
  editarEmailButton.value = ! editarEmailButton.value
}

function validarEmail(email){
  return /^[a-zA-Z][a-zA-Z0-9_.+-=:]*@[a-zA-Z][a-zA-Z0-9_.]+$/.test(email)
}

async function editarEmail(emailNuevo){
  try{
    if (! validarEmail(emailNuevo)){
      throw new Error("Email invalido.")
    }
    const usuario = await obtenerUsuario(this.loggedUser.email)
    usuario.email = emailNuevo
    if (await actualizarUsuario(this.loggedUser.email, usuario)){
      toggleEditarEmailButton()
      this.router.push("/perfil")
    }
  } catch (error){
    console.log(error)
    Swal.fire(`${error}`, '', 'error')
  }
  toggleEditarEmailButton()
}

</script>

<style>
ion-card{
  width: 35%;
  height: 50%;
  text-align: center;
}

ion-card-title{
  padding-bottom: 3px;
}

ion-card-subtitle{
  padding-bottom: 5px;
}

ion-card-content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

ion-item{
  width: 60%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.swal2-container.swal2-center.swal2-backdrop-show {
  height: 100vh;
}
</style>