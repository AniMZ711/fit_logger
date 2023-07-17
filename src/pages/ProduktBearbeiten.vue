<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>


  <!-- Pop-Up mit Produktauswahl, das sich automatisch beim öffnen der Seite öffnet  -->
  <q-dialog v-model="showProducts">
    <q-card style="width: 350px; height:550px">
      <q-btn
        class="absolute"
        style="right: -1em"
        flat
        icon="close"
        color="primary"
        v-close-popup
        to ="/produkteinpflegen"
      />

      <div class="q-px-lg q-ma-sm">
          <ul>
            <li v-for="item in items" :key="item.id">
              <details>
                <summary>
                  <span class="word"> {{ item.name }}</span>
                  <q-btn
                    round
                    color="green"
                    icon="edit"
                    @click="editProduct(item)"
                    v-close-popup
                  >
                  </q-btn>
                </summary>
                 Kalorien: {{ item.calories }} | Kohlenhydrate: {{ item.carbs }}g
                | Proteine: {{ item.protein }}g | Fett: {{ item.fat }}g &nbsp;
                <q-btn
                    round
                    color="green"
                    icon="edit"
                    @click="editProduct(item)"
                    v-close-popup
                  >
                  </q-btn>
              </details>
            </li>
          </ul>
        </div>
      
    </q-card>
  </q-dialog>
  
  <!-- Positionierung des Eingabebereichs über Zeilen & Spalten, damit sich die UI der Display-Größe anpasst: -->
  <div class="row text-center item-center">
    <div class="col col-1"></div>
    <div class="col col-10">
      <br />
      
      <form v-if="editMode">
        <q-input
          filled
          label="Name"
          color="green"
          type="text"
          id="name"
          v-model="newProduct.name"
          required
        />

        <q-input
          filled
          color="green"
          label="Menge (g)"
          type="number"
          id="quantity"
          v-model.number="newProduct.quantity"
          min="0"
          max="5000"
          required
        />

        <q-input
          filled
          label="Kalorien (kcal)"
          color="green"
          type="number"
          id="calories"
          v-model.number="newProduct.calories"
          min="0"
          max="5000"
          required
        />

        <q-input
          filled
          label="Kohlenhydrate (g)"
          color="green"
          type="number"
          id="carbs"
          v-model.number="newProduct.carbs"
          min="0"
          max="5000"
          required
        />

        <q-input
          filled
          label="Proteine (g)"
          color="green"
          type="number"
          id="protein"
          v-model.number="newProduct.protein"
          min="0"
          max="5000"
          required
        />

        <q-input
          filled
          label="Fett (g)"
          color="green"
          type="number"
          id="fat"
          v-model.number="newProduct.fat"
          min="0"
          max="5000"
          required
        />

        <!-- Buttons zum speichern oder bzw. abrrechen: -->
        <div class="AktualisierenAbbrechenButtons">
          <q-btn
            rounded
            padding="10px"
            color="green"
            icon="save"
           @click="updateProduct"
            size="lg"
            to="/produkteinpflegen"
            >Speichern</q-btn
          >

          <q-btn
            rounded
            padding="10px"
            color="green"
            icon="cancel"
            @click="cancelEdit"
            size="lg"
            to="/produkteinpflegen"
            >Abbrechen</q-btn
          >
        </div>

      </form>
    </div>
    <div class="col col-1"></div>
  </div>

</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      // is localStorage needed here?
      showProducts: ref(true),
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
      pageName: "Produkt bearbeiten", //bei Veränderung wird der Seitentitel automatisch angepasst
      shhowProducts: ref(false),
      products: [],
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const savedProducts = window.localStorage.getItem("products");
      if (savedProducts) {
        this.items = JSON.parse(savedProducts);
      }
    },
    saveProducts() {
      window.localStorage.setItem("products", JSON.stringify(this.items));
      this.resetForm();
    },
    // Produkt aktualisieren 
    updateProduct() {
      console.log("updateProduct");
      console.log(this.newProduct);
      this.items[this.editProductIndex] =this.newProduct; 
      this.saveProducts();
      this.editMode = false;
      this.editProductIndex = -1;
      this.resetForm();
    },
    // Produkt bearbeiten
    editProduct(product) {
      this.editMode = true;
      this.editProductIndex = this.items.indexOf(product);
      console.log(this.editProductIndex);
      this.newProduct = { ...product };
      console.log("editProduct");
      console.log(this.newProduct);
    },
    // Abbruch-Funktion
    cancelEdit() {
      this.editMode = false;
      this.editProductIndex = null;
      this.resetForm();
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

.AktualisierenAbbrechenButtons {
  margin-top: 2em;
  text-align: center;
}

</style>
