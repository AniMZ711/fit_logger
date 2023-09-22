<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <!-- Positionierung des Eingabebereichs über Zeilen & Spalten, damit sich die UI der Display-Größe anpasst: -->
  <div class="row text-center item-center">
    <div class="col col-1"></div>
    <div class="col col-10">
      <br />

      <form v-if="!editMode" @submit.prevent="addProduct">
        <!--  Eingabefeld für den Produktnamen: -->
        <q-input filled label="Produktname" color="green" type="text" id="name" v-model="newProduct.name" required />

        <!--  Eingabefeld für die Produkmenge: -->
        <q-input filled color="green" label="Menge (g)" type="number" id="quantity" v-model.number="newProduct.quantity"
          min="0" max="5000" required />

        <!--  Eingabefeld für die Kalorien: -->
        <q-input filled color="green" label="Kalorien (kcal)" type="number" id="calories"
          v-model.number="newProduct.calories" min="0" max="5000" required />

        <!--  Eingabefeld für die Kohlenhydrate: -->
        <q-input filled color="green" label="Kohlenhydrate (g)" type="number" id="carbs" v-model.number="newProduct.carbs"
          min="0" max="5000" required />

        <!--  Eingabefeld für den Eiweißgehalt: -->
        <q-input filled color="green" label="Proteine (g)" type="number" id="protein" v-model.number="newProduct.protein"
          min="0" max="5000" required />

        <!--  Eingabefeld für den Fettgehalt: -->
        <q-input filled color="green" label="Fett (g)" type="number" id="fat" v-model.number="newProduct.fat" min="0"
          max="5000" required />

        <!-- Button, der das Produkt erstellt, abspeichert und das Pop-Up aufruft -->
        <div class="ErstellenButton">
          <q-btn color="green" icon="edit" type="submit" size="lg" rounded @click="showBestätigung = true">Produkt
            erstellen</q-btn>
        </div>
      </form>

    </div>
    <div class="col col-1"></div>
  </div>

  <!-- Pop-Up, welches angezeigt wird, nachdem man ein Produkt erstellt hat: -->
  <q-dialog v-model="showBestätigung">
    <q-card class="q-pa-md">
      <q-btn class="absolute" style="top: 2px; right: 2px" flat icon="close" color="primary" to="/produkteinpflegen" />
      <div class="row text-center q-px-lg q-ma-sm">
        Produkt erstellt!
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      // is localStorage needed here?
      showProducts: ref(false),
      showBestätigung: ref(false),
      items: JSON.parse(localStorage.getItem("products")) || [],
      newProduct: {
        id: null,
        name: "",
        quantity: 0,
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      editMode: false,
      editProductIndex: null,
      pageName: "Produkt erstellen", //bei Veränderung wird der Seitentitel automatisch angepasst
      shhowProducts: ref(false),
      products: [],
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    // Pop-Up das Produkt erstellt worden ist
    BestätigungAnzeigen() {
      showBestätigung = "true";
    },
    // Produkt laden
    loadProducts() {
      const savedProducts = window.localStorage.getItem("products");
      if (savedProducts) {
        this.items = JSON.parse(savedProducts);
      }
    },
    // Produkt speichern
    saveProducts() {
      window.localStorage.setItem("products", JSON.stringify(this.items));
      this.resetForm();
    },
    // Produkt hinzufügen
    addProduct() {
      this.items.push({
        id: Date.now(),
        name: this.newProduct.name,
        quantity: this.newProduct.quantity,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat,
      });
      this.saveProducts();
    },
    // Zurücksetz-Funktion
    resetForm() {
      this.newProduct = {
        id: null,
        name: "",
        quantity: 0,
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      };
    },
  },
});
</script>

<style>
* {
  overflow: y;
}

/* Positionierung des Buttons für die Abspeicherung des Produkts: */
.ErstellenButton {
  margin-top: 2em;
  text-align: center;
}
</style>
