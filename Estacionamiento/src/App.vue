<template>
  <ion-app>
    <ion-menu type="overlay" content-id="main-content" style="justify-content: flex-start">
      <ion-header>
        <ion-menu-toggle>
          <ion-button fill="outline">Contraer</ion-button>
        </ion-menu-toggle>
      </ion-header>
      <ion-content>
        <div style="display:flex; flex-direction:column; gap:1rem; align-items:start; justify-content:flex-start; padding-left:1rem">
          <ion-text v-if="loggedIn" color="secondary">
            <h1>{{ loggedUser.name }}</h1>
          </ion-text>

          <ion-button
            v-if="!loggedIn"
            v-on:click="this.$router.push('/login')">
            Login
          </ion-button>

          <ion-button
            fill="clear"
            v-if="loggedIn"
            @click="this.$router.push('/perfil')"
            >Mi perfil</ion-button
          >

          <ion-button
            fill="clear"
            v-if="loggedIn && loggedUser.rol == 'administrador'"
            @click="this.$router.push('/usuarios')"
            >Listado de usuarios</ion-button
          >
          <ion-button
            fill="clear"
            v-if="loggedIn"
            @click="this.$router.push('/cocheras')"
            >Lista Cocheras</ion-button
          >

          <ion-button
            fill="clear"
            color="danger"
            v-if="loggedIn"
            v-on:click="desloguear"
            >Logout</ion-button
          >
        </div>
      </ion-content>
    </ion-menu>

    <ion-header>
      <ion-toolbar>
        <ion-menu-toggle>
          <ion-button>Menú</ion-button>
        </ion-menu-toggle>
        <ion-button  v-on:click="this.$router.push('/')">
          <ion-icon :icon="homeOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <!--
      El contenido de la pagina es la salida (o outlet) del Router.
      Este debe estar envuelto en un componente ion-content para
      poder ocupar inteligentemente el espacio entre el header
      y el footer (no overlapear).
    -->
    <ion-content>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button
        fill="clear"
        v-on:click="this.$router.push('/sobreNosotros')"
        >Sobre Nosotros</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>

<script setup lang="js">
/*
El import defineComponent de Vue es necesario
para importar componentes de Vue
https://ionicframework.com/docs/vue/troubleshooting#failed-to-resolve-component
*/
import { defineComponent } from 'vue';
import {
  IonHeader,
  IonToolbar,
  IonFooter,
  IonApp,
  IonContent,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonRouterOutlet,
  IonText,
  IonIcon,
} from '@ionic/vue';
import {
  homeOutline
} from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import {useLoginStore} from '@/state/loginStore.js';
import { useRouter } from 'vue-router';
const router = useRouter()

//Instanciar store con su funcion instructiva
const loginStore = useLoginStore();
//Extraer atributos de forma reactiva
const { loggedIn, loggedUser } = storeToRefs(loginStore);
//Extraer metodos de forma destructurativa
const { logout } = loginStore;

//Cerrar sesion y ofrecer iniciar sesion
function desloguear(){
  logout()
  router.push('/login')
}

</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}


ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

ion-menu-toggle{
  margin-left: 1rem;
}

</style>
