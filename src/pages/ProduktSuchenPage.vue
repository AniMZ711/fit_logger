<template>
  <q-header>
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>
    </q-toolbar>
  </q-header>

  <div class="searchbar" style="max-width: 300px">

      <q-input 
      color="green" 
      filled 
      v-model="searchQuery" 
      label="Produkt suchen" 
      type="text"
      >     
        </q-input>
        <q-btn rounded color="green" icon="search" @click="searchProduct"></q-btn>
        
    <ul>
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }}: - {{ product.calories }} Gramm Kalorien,
        {{ product.carbs }} Gramm Kohlenhydrate, {{ product.protein }} Gramm
        Protein, {{ product.fat }} Gramm Fett
      </li>
    </ul>
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
      name: "Produkt suchen",
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
  position: absolute;
  width: 100%;
  max-width: 40rem;
  left: 40px;

  top: 200px;
}
</style>
