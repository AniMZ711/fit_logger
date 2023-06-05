<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="actionButtons">
          <q-btn
            class="searchButton"
            rounded
            color="green"
            icon="search"
            to="/produktsuchen"
          >
            Produkt suchen</q-btn
          >

          <q-btn
            class="addButton"
            rounded
            color="green"
            icon="edit"
            to="/produkterstellen"
          >
            Produkt/Essen hinzufügen</q-btn
          >
        </div>
      </q-page>
    </q-page-container>
    ...
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      pageName: "Produkte", // bei Veränderung ändert sich der Seitentitel automatisch
    };
  },
});
</script>

<style>
.actionButtons {
  position: absolute;
  top: 100px;
  left: 50%;

  transform: translate(-50%, -50%);
}

.searchButton {
  margin-top: 10px;
  margin-bottom: 10px;
}

.addButton {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
