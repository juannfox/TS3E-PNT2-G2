import { createRouter, createWebHistory } from '@ionic/vue-router';
import { useLoginStore } from '@/state/loginStore.js';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Index.vue')
  },
  { path: '/home',
    redirect: '/'
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/mapa',
    component: () => import('@/views/MapaView.vue'),
    meta: { RequireAuth: true }
  },
  {
    path: '/miestacionamiento',
    component: () => import('@/views/DetallesEstacionamiento.vue'),
    meta: { RequireAuth: true }
  },
  {
    path: '/usuarios',
    component: () => import('@/views/UsuariosView.vue'),
    meta: {
      RequireAuth: true,
      AllowedRole: "administrador"
    }
  },
  {
    path: '/usuarios/perfil',
    component: () => import('@/views/DetallesUsuarioView.vue'),
    meta: { RequireAuth: true }
  },
  {
    name: 'error',
    path: '/error',
    component: () => import('@/views/ErrorView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const store = useLoginStore();
  if (to.matched.some(r => r.meta.RequireAuth) && !store.loggedIn){
    return '/login'
  }else{
    if (store.loggedIn) {
      if (to.matched.every(r => (r.meta.AllowedRole) && (r.meta.AllowedRole !== store.loggedUser.rol))){
      return {
        name: 'error',
        query: {
          mensaje: 'Acceso denegado'
        }
      }
    }
  }
}})


export default router
