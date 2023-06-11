<template>
  <ion-page>

    <ion-content class="background">
      <div class="container">
        <ion-img class="bgimage" src="src/img/futurista3.jpg" alt="Parkinglot.app"></ion-img>
        <ion-card color="light" class="carta">
          <img alt="Usuario" src="@/img/usuario.png" style="height: 128px" />
          <ion-card-header class="card-header">
            <ion-card-title>{{ loggedUser.name }}</ion-card-title>
            <ion-card-subtitle>{{ loggedUser.rol }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content v-show="!editarEmailButton">
            <ion-item>
              <ion-label>Email: {{ loggedUser.email }}</ion-label>
              <ion-button v-on:click="toggleEditarEmailButton()">
                <ion-icon :icon="create"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-card-content>
          <ion-card-content v-show="editarEmailButton">
            <ion-item>
              <ion-input type="text" v-model="email" required label="Email:" label-placement="start"
                :placeholder="loggedUser.email"></ion-input>
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
  IonInput, IonText, IonHeader, IonImg
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
const { guardarUsuario } = loginStore;


const email = ref(null)
const editarEmailButton = ref(false)

function toggleEditarEmailButton() {
  if (editarEmailButton.value === true) {
    editarEmailButton.value = false
  } else {
    editarEmailButton.value = true
  }
}

function validarEmail(email) {
  let esUnEmail = /^[a-zA-Z][a-zA-Z0-9_.+-=:]*@[a-zA-Z][a-zA-Z0-9_.]+$/.test(email)
  let esDistintoMail = email !== loggedUser.value.email
  return esUnEmail && esDistintoMail
}

async function editarEmail(emailNuevo) {
  try {
    if (!validarEmail(emailNuevo)) {
      throw new Error("Email invalido.")
    }
    const usuario = await obtenerUsuario(this.loggedUser.email)
    usuario.email = emailNuevo
    if (await actualizarUsuario(this.loggedUser.email, usuario)) {
      guardarUsuario(usuario)
      toggleEditarEmailButton()
      Swal.fire('Email actualizado', '', 'success')
      this.router.push("/perfil")
    }
  } catch (error) {
    toggleEditarEmailButton()
    console.log(error)
    Swal.fire("Error al actualizar email", '', 'error')
  }
}

</script>

<style scoped>
ion-card {
  width: 35%;
  height: 50%;
  text-align: center;
  padding: 2rem;
}

ion-card-title {
  padding-bottom: 3px;
}

ion-card-subtitle {
  padding-bottom: 5px;
}

ion-card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

ion-item {
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