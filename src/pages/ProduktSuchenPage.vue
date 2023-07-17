<template>
  <q-header clas="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center">
        {{ "Produktsuche" }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <q-page-container class="editmeals">
    <!-- Positionierung der Suchleiste und des Buttons über Zeilen & Spalten, damit sich die UI der Display-Größe anpasst: -->
    <div class="row item-center">
      <div class="col col-1"></div>
      <div class="col col-10 text-center items-center">
       
        <!-- Inputfiled für die Eingabe des Namen des gesuchten Produkts + Button der beim Klick die Methode zum Produkt suchen öffnet, welche sucht und das Ergebnis ausgibt:  -->
        <q-input color="green" filled v-model="searchQuery" label="Produktnamen eingeben..." type="text">
          <template v-slot:after>
            <q-btn rounded size="lg" color="green" icon="search" @click="searchProduct"></q-btn>
          </template>
        </q-input>
      
      </div>
    </div>

     <!-- Positionierung des Ausgabebereichs über Zeilen & Spalten, damit sich die UI der Display-Größe anpasst: -->
    <div class="row">
      <div class="col col-1"></div>
      <div class="col col-10 text-center items-center">
       
        <!-- Ausgabe in Form einer Liste, bei der man von jedem Objekt Details öffnen kann: -->
        <ul>
          <li v-for="product in filteredProducts" :key="product.id">
            <details>
              <summary>
                <span class="word"> {{ product.name }}</span>
                <span class="badge"> {{ product.calories }} kcal </span>
              </summary>
              Menge: {{ product.quantity }}g | Kalorien: {{ product.calories }} | Kohlenhydrate:
              {{ product.carbs }}g | Proteine: {{ product.protein }}g | Fett:
              {{ product.fat }}g
            </details>
          </li>
        </ul>

      </div>
      <div class="col col-1"></div>
    </div>
    
  </q-page-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      searchQuery: "",
      products: [],
      filteredProducts: [],
      pageName: "Produkt suchen", // bei Veränderung ändert sich der Seitentitel automatisch
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) {
        this.products = JSON.parse(savedProducts);
      }
    },
    searchProduct() {
      const filteredProducts = this.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
      this.filteredProducts = filteredProducts;
    },
  },
});
</script>

