<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>



    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-tabs align="justify" :breakpoint="xs"> <!-- Tabs wachsen und schrumpfen automatisch mit-->
        <q-route-tab icon="home" to="/dashboard" label="Home" />
        <q-route-tab icon="menu_book" to="/logbuch" label="Logbuch" />
        <q-page-sticky position="bottom" :offset="[18, 18]" id="middleAddButton">
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
#middleAddButton {
  position: fixed;

  bottom: -45px;

  margin-left: auto;
  margin-right: auto;

  z-index: 3000;
}


/* media querries erstmal nur für 3 verschiedene Größen, später kommen evtl noch mehr dazu */


@media (max-width: 359px) {

  .q-layout {
    display: none;
  }
}

@media (max-width: 576px) {
  /* für kleine Bildschirme (Handys,..) */

  body {

    font-size: 14px;
  }
}

@media (min-width: 768px) {

  body {

    font-size: 16px;
  }

  /* mittlere Bildschirme */
}

@media (min-width: 992px) {

  body {

    font-size: 18px;
  }

  /* große Bilschirme */
}
</style>
