<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title
        >
        <!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="zielButton">
          <q-btn
            size="lg"
            class="zielButton"
            rounded
            color="green"
            icon="build"
            to="/ziele"
          >
            Tagesziel bearbeiten
          </q-btn>
        </div>
    
    <!-- Buttons für die Statistik-Page auskommentiert, da die Seite nicht funktioniert: -->
        <!--   <div class="statistikButton">
          <q-btn
            size="lg"
            class="statistikButton"
            rounded
            color="green"
            icon="auto_graph"
            to="/statistik"
          >
            Ziele nachverfolgen
          </q-btn>
        </div> -->

        <br />
      </q-page>
    </q-page-container>
  
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      pageName: "Ziel",
    };
  },
});
</script>

<style>
/* Positionierung der Buttons: */

.zielButton {
  margin-top: 2em;
  text-align: center;
}

/* .statistikButton {
  margin-top: 1em;
  text-align: center;
} */
</style>
