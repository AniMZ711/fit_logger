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

       <!-- Button, um auf die Produkt-Suchen Seite zu gelangen: -->
        <div class="ButtonProduktSuchen">
          <q-btn
            class="searchButton"
            rounded 
            color="green"
            icon="search"
            to="/produktsuchen"
            size="lg"
          >
            Produktsuche</q-btn
          >
        </div>

 <!-- Button, um auf die Produkt-Erstellen Seite zu gelangen: -->
        <div class="ButtonProduktErstellen">
          <q-btn
            class="addButton"
            rounded
            color="green"
            icon="edit"
            to="/produkterstellen"
            size="lg"
          >
            Produkt erstellen</q-btn
          >
        </div>

<!-- Button, um auf die Produkt-Bearbeiten Seite zu gelangen: -->
        <div class="ButtonProduktBearbeiten">
          <q-btn
            class="addButton"
            rounded
            color="green"
            icon="build"
            to="/ProduktBearbeiten"
            size="lg"
          >
            Produkt bearbeiten</q-btn
          >
        </div>

<!-- Button, um auf die Produkt-Löschen Seite zu gelangen: -->
        <div class="ButtonProduktLöschen">
          <q-btn
            class="addButton"
            rounded
            color="green"
            icon="delete" 
            to="/ProduktLöschen"
            size="lg"
          >
            Produkt löschen</q-btn
          >
        </div>

<!-- Button, um auf die Mahlzeit-Komponieren Seite zu gelangen: -->
        <div class="ButtonMahlzeitKomponieren">
          <q-btn
            class="addButton"
            rounded 
            color="green"
            icon="add"
            to="/essenkomponieren"
            size="lg"
          >
            Mahlzeit Komponieren</q-btn
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
/* Positionierung der einzelnen Buttons über ihren Class-Name: */

.ButtonProduktSuchen {
  margin-top: 4em;
  text-align: center;
}

.ButtonProduktErstellen {
  margin-top: 2em;
  text-align: center;
}

.ButtonProduktBearbeiten {
  margin-top: 2em;
  text-align: center;
}

.ButtonProduktLöschen {
  margin-top: 2em;
  text-align: center;
}

.ButtonMahlzeitKomponieren {
  margin-top: 2em;
  text-align: center;
}
</style>
