import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/homescreen',
  },


  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/homescreen'
      },
      {
        path: 'homescreen',
        component: () => import('@/views/HomescreenPage.vue')
      },
      {
        path: 'logbuch',
        component: () => import('@/views/LogbuchPage.vue')
      },
      
      {
        path: 'essen-erstellen',
        component: () => import('@/views/Essenerstellen.vue')
      },

      {
        path: 'produkt-erstellen',
        component: () => import('@/views/Produkterstellen.vue')
      },

      {
        path: 'greetings-page',
        component: () => import('@/views/GreetingsPage.vue')
      },

      {
        path: 'plus_hinzufuegen',
        component: () => import('@/views/AddPage.vue')
      },
      {
        path: 'produkt_einpflegen',
        component: () => import('@/views/ProduktEinpflegenPage.vue')
      },

      {
        path: 'profil',
        component: () => import ('@/views/ProfilPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
