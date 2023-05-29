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
    meta: { RequireAuth: true }
  },
  {
    path: '/usuarios/perfil',
    component: () => import('@/views/DetallesUsuarioView.vue'),
    meta: { RequireAuth: true }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const store = useLoginStore();
  if (to.matched.some(r => r.meta.RequireAuth) && !store.loggedIn) {
    next('/login')  // ir a una ruta que indique error 401
  } else {
    next()
  }
})


export default router
