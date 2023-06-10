<template>
  <ion-page>
    <ion-content>
      <div class="contenedor">

        <ion-card class="carta">
          <h1 >
          Login
          </h1>
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
        </ion-card>

        <ion-card class="carta">
          <h1 >
          Registrar
          </h1>
          <form v-if="!loggedIn" style="display:flex ; flex-direction:column; gap:1rem; align-item:center">
            <ion-item >
              <ion-text postion="floating">Nombre: </ion-text>
              <ion-input type="text" v-model="registroInput.nombre" style="margin-left:10px;" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-text postion="floating">Email: </ion-text>
              <ion-input type="email" v-model="registroInput.email" style="margin-left:10px;" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-text postion="floating">Contraseña: </ion-text>
              <ion-input type="password" v-model="registroInput.password" style="margin-left:10px;" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-text postion="floating">Confirmar contraseña: </ion-text>
              <ion-input type="password" v-model="registroInput.confirmPassword" style="margin-left:10px;" required></ion-input>
            </ion-item>
            <ion-button v-on:click="registrar(registroInput)">Registrar</ion-button>
          </form>
        </ion-card>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="js">
import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonText,
  IonCard,
  IonPage
} from '@ionic/vue';
import { obtenerUsuario, crearUsuario } from '@/services/usuariosService.js';
import { storeToRefs } from 'pinia';
import {useLoginStore} from '@/state/loginStore.js';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
const router = useRouter()

//Instanciar store con su funcion instructiva
const loginStore = useLoginStore();
//Extraer atributos de forma reactiva
//Dentro de <script setup> utilizar 'this' para accederlos
//Fuera (template) no hace falta.
const { loggedIn, loggedUser } = storeToRefs(loginStore);
//Extraer metodos de forma destructurativa
const { login, guardarUsuario } = loginStore;

//Placeholder
const usuarioInput = {email: "", password: ""};
const registroInput = {nombre: "", email: "", password: "", confirmPassword: ""};

async function registrar(usuarioRegistrar){
    try{
      //Query al backend
      if (usuarioRegistrar.password === usuarioRegistrar.confirmPassword){
        let {confirmPassword: _, ...usuario} = usuarioRegistrar;
        usuario.rol = "cliente"
        if (await crearUsuario(usuario)){
          usuarioRegistrar = null
          Swal.fire("Usuario registrado", "", "success")
        }else{
          Swal.fire("Error al registrar", "", "error")
        }
      }else{
        Swal.fire("Contraseñas no coinciden", "", "warning")
      }
    } catch (e){
      Swal.fire("Error al registrar.", "", "warning")
      console.log(`ERROR '${e.name}': ${e.message}\n${e.stack}`)
      console.trace()
    }
}

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
}
.logo{
  scale: 2;
}

.swal2-container.swal2-center.swal2-backdrop-show{
  height: 100vh;
}
</style>

