<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>



    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-tabs align="justify" :breakpoint="0">
        <q-route-tab icon="home" to="/dashboard" label="Home" />
        <q-route-tab icon="menu_book" to="/logbuch" label="Logbuch" />
        <q-page-sticky position="bottom" :offset="[18, 18]" class="fabbutton">
          <q-btn round color="green" icon="add_circle" size="28px" padding="5px" to="/addproduct" />
        </q-page-sticky>
        <q-route-tab icon="storage" to="/produkteinpflegen" label="Produkte" />
        <q-route-tab icon="account_circle" to="/profil" label="Profil" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
// export default defineComponent({

// }
// )
</script>

<style>
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

/* For desktop: */
.col-1 {
  width: 8.33%;
}

.col-2 {
  width: 16.66%;
}

.col-3 {
  width: 25%;
}

.col-4 {
  width: 33.33%;
}

.col-5 {
  width: 41.66%;
}

.col-6 {
  width: 50%;
}

.col-7 {
  width: 58.33%;
}

.col-8 {
  width: 66.66%;
}

.col-9 {
  width: 75%;
}

.col-10 {
  width: 83.33%;
}

.col-11 {
  width: 91.66%;
}

.col-12 {
  width: 100%;
}

@media only screen and (max-width: 768px) {

  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }
}
</style>
