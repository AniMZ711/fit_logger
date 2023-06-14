<template>
  <q-header clas="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center">
        {{ "Datenbank" }}</q-toolbar-title
      >
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div class="searchbar">
    <!--style="max-width: 300px" in class tag-->
    <q-input
      color="green"
      filled
      v-model="searchQuery"
      label="Produkt suchen"
      type="text"
    >
      <template v-slot:after>
        <q-btn
          rounded
          size="lg"
          color="green"
          icon="search"
          @click="searchProduct"
        ></q-btn>
      </template>
    </q-input>
  </div>

  <div class="Ausgabebereich1">
    <q-scroll-area style="height: 400px; max-width: 90%">
      <div class="ScrollContainer">
        <ul>
          <li v-for="product in filteredProducts" :key="product.id">
            {{ product.name }}: - {{ product.calories }} Gramm Kalorien,
            {{ product.carbs }} Gramm Kohlenhydrate, {{ product.protein }} Gramm
            Protein, {{ product.fat }} Gramm Fett
          </li>
        </ul>
      </div>
    </q-scroll-area>
  </div>
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

<style>
.searchbar {
  position: fixed;
  width: 90%;
  top: 8em;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.button {
  margin-top: 8em;
  text-align: center;
}
.Ausgabebereich1 {
  margin-top: 8em;
  text-align: center;
}
</style>
