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
        <div class="ButtonProduktSuchen">
          <q-btn
            class="searchButton"
            rounded
            color="green"
            icon="search"
            to="/produktsuchen"
            size="lg"
          >
            Produkt suchen</q-btn
          >
        </div>

        <div class="ButtonProduktHinzufügen">
          <q-btn
            class="addButton"
            rounded
            color="green"
            icon="save"
            to="/produkterstellen"
            size="lg"
          >
            Produkt einspeichern</q-btn
          >
        </div>
      </q-page>
    </q-page-container>
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
.ButtonProduktSuchen {
  margin-top: 4em;
  text-align: center;
}

.ButtonProduktHinzufügen {
  margin-top: 2em;
  text-align: center;
}
</style>
