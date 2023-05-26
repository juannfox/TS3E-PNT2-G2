import { createRouter, createWebHistory } from '@ionic/vue-router';

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
    component: () => import('@/views/MapaView.vue')
  },
  {
    path: '/miestacionamiento',
    component: () => import('@/views/DetallesEstacionamiento.vue')
  },
  {
    path: '/usuarios',
    component: () => import('@/views/UsuariosView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
