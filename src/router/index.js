import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: '/registro',
        component: () => import('@/views/RegistroView.vue'),
      },
      {
        path: '/recuperar-contrasena',
        component: () => import('@/views/RecuperarContraseña.vue'),
      },
      {
        path: '/home',
        component: () => import('@/views/HomeView.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/accerca-de-la-app',
        component: () => import('@/views/AcercaDeLaApp.vue'),
        meta: { requiresAuth: true, showMenu: true , hideHeader: true},
      },
      {
        path: '/agregar-producto',
        component: () => import('@/views/AgregarProducto.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/mis-publicaciones',
        component: () => import('@/views/MisPublicaciones.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/Notification',
        component: () => import('@/views/NotificationView.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/ofertas-realizadas',
        component: () => import('@/views/OfertasRealizadas.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/terminos-condiciones',
        component: () => import('@/views/TerminosCondiciones.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: 'producto/:id',
        name: 'DetalleProducto',
        component: () => import('@/views/DetalleProducto.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/mi-cuenta',
        component: () => import('@/views/MiCuentaView.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/categorias',
        component: () => import('@/views/CategoriaView.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: 'categoria/:id',
        name: 'Categoria',
        component: () => import('@/views/ProductosCategoriasView.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
      {
        path: '/mis-compras',
        component: () => import('@/views/MisCompras.vue'),
        meta: { requiresAuth: true, showMenu: true },
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
