<template>
  <ion-page>
    <div class="contenedor">
      <ion-card class="carta">
        <h1 >
        Login
        </h1>
        <ion-img class="logo" src="public/favicon.png" alt="Parkinglot.app" ></ion-img>
        <form v-if="!loggedIn" style="display:flex ; flex-direction:column; gap:1rem; align-item:center">
          <ion-item style="margin-top:100px">
            <ion-text postion="floating">Email: </ion-text>
            <ion-input type="email" v-model="usuarioInput.email" style="margin-left:10px;" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-text postion="floating">Contraseña: </ion-text>
            <ion-input type="password" v-model="usuarioInput.password" style="margin-left:10px;" required></ion-input>
          </ion-item>
          <ion-button v-on:click="loguear(usuarioInput)">Login</ion-button>
        </form>
        <div v-if="loggedIn">
          <ion-text>
            <h2>H1: Sesión iniciada: {{ loggedUser.email }}.</h2>
          </ion-text>
          <ion-button v-on:click="desloguear">Cerrar sesión</ion-button>
        </div>
      </ion-card>
    </div>

  </ion-page>
</template>

<script setup lang="js">
import {
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonInput,
  IonTitle,
  IonToolbar,
  IonItem,
  IonText,
  IonAlert,
  IonCard,
  IonImg
} from '@ionic/vue';
import { obtenerUsuario } from '@/services/usuariosService.js';
import { storeToRefs } from 'pinia';
import {useLoginStore} from '@/state/loginStore.js';
import { useRouter } from 'vue-router';
const router = useRouter()

//Instanciar store con su funcion instructiva
const loginStore = useLoginStore();
//Extraer atributos de forma reactiva
//Dentro de <script setup> utilizar 'this' para accederlos
//Fuera (template) no hace falta.
const { loggedIn, loggedUser } = storeToRefs(loginStore);
//Extraer metodos de forma destructurativa
const { login, logout, guardarUsuario } = loginStore;

//Placeholder
const usuarioInput = {email: "", password: ""};

async function loginUsuario(solicitante){
    try{
      //Query al backend
      let usuario = await obtenerUsuario(solicitante.email)
      if (usuario != undefined){
        //Validacion de credenciales
        if (usuario.password === solicitante.password){
          login()
          guardarUsuario(usuario)
          return true
        }else{
          alert("Login rechazado.")
        }
      }else{
        alert("Usuario no encontrado.")
      }
    } catch (e){
      alert("Error al iniciar sesión.")
      console.log(`ERROR '${e.name}': ${e.message}\n${e.stack}`)
      console.trace()
    }
}

//Iniciar sesion
async function loguear(usuario){
  await loginUsuario(usuario)
  if (this.loggedIn){
    router.push('/')
  }
}

//Cerrar sesion y ofrecer iniciar sesion
function desloguear(){
  logout()
  router.push('/login')
}

</script>

<style >
.carta{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap:1rem;
  padding: 2rem;
}
.contenedor{
  display: flex;
  width: 1;
  justify-content: center;  
  margin-top: 150px;
}
.logo{
  scale: 2;
}
</style>

