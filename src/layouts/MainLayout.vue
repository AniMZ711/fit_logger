
<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="menu_book" />


          </q-avatar>
          FitLogger
        </q-toolbar-title>
      </q-toolbar>


    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>


        <q-tabs align="left">
          <q-route-tab icon="home" to="/dashboard" label="Home" />
          <q-route-tab icon="menu_book" to="/logbuch" label="Logbuch" />
          <q-route-tab icon="add_circle" to="/addproduct" label="Hinzufügen" />
          <q-route-tab icon=storage to="/produkteinpflegen" label="Produkte" />
          <q-route-tab icon="account_circle" to="/profil" label="Profil" />
        </q-tabs>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>


<script>
import { defineComponent, ref } from 'vue'
import VueBottomNavigation from "bottom-navigation-vue";





// export default defineComponent({



// }
// )


</script>

<style>
Q-header {
  color: green
}
</style>
