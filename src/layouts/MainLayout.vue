
<template>
  <q-layout view="hHh lpR fFf">



    <q-page-container>



      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar class="toolbar">


        <q-tabs align="left">
          <q-route-tab icon="home" to="/dashboard" label="Home" />
          <q-route-tab icon="menu_book" to="/logbuch" label="Logbuch" />
          <!-- <q-route-tab icon="add_circle" to="/addproduct" label="Hinzufügen" /> -->

          <q-page-sticky position="bottom" :offset="[18, 18]" class="fabbutton ">
            <q-btn round color="green" icon="add_circle" size="28px" padding="5px" to="/addproduct" />
          </q-page-sticky>
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

q-page {
  overflow: hidden;
}

.fabbutton {

  position: fixed;

  bottom: -45px;

  margin-left: auto;
  margin-right: auto;

  z-index: 3000;





}

.toolbar {

  margin-left: auto;
  margin-right: auto;
}
</style>
