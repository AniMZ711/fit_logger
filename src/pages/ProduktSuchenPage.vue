<template>
    <div>
      <h2>Produkte suchen</h2>
      <input type="text" v-model="searchQuery" placeholder="Produktname eingeben">
      <button @click="searchProduct">Suchen</button>
  
      <ul>
        <li v-for="product in filteredProducts" :key="product.id">
          {{ product.name }}: - {{ product.calories }} Gramm Kalorien, {{ product.carbs }} Gramm Kohlenhydrate, {{ product.protein }} Gramm Protein, {{ product.fat }} Gramm Fett,   
        </li>
      </ul>
    </div>
  </template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'EssenErstellenPage',
    data() {
      return {
        searchQuery: '',
        products: [],
        filteredProducts: []
      };
    },
    created() {
      this.loadProducts();
    },
    methods: {
      loadProducts() {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
          this.products = JSON.parse(savedProducts);
        }
      },
      searchProduct() {
        const filteredProducts = this.products.filter(product => {
          return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
        this.filteredProducts = filteredProducts;
      }
    }
  });
</script>