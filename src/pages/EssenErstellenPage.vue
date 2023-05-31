<template>
  <q-header>
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>
    </q-toolbar>
  </q-header>


  <div>
    <h2>Essen erstellen</h2>

    <form v-if="!editMode" @submit.prevent="addProduct">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="newProduct.name" required>
      <label for="calories">Kalorien:</label>
      <input type="number" id="calories" v-model.number="newProduct.calories" min="0" max="5000" required>
      <label for="carbs">Kohlenhydrate:</label>
      <input type="number" id="carbs" v-model.number="newProduct.carbs" min="0" max="5000" required>
      <label for="protein">Protein:</label>
      <input type="number" id="protein" v-model.number="newProduct.protein" min="0" max="5000" required>
      <label for="fat">Fett:</label>
      <input type="number" id="fat" v-model.number="newProduct.fat" min="0" max="5000" required>
      <q-btn rounded color="green" icon="add" type="submit"></q-btn>
    </form>

    <form v-else @submit.prevent="updateProduct">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="newProduct.name" required>
      <label for="calories">Kalorien:</label>
      <input type="number" id="calories" v-model.number="newProduct.calories" min="0" max="5000" required>
      <label for="carbs">Kohlenhydrate:</label>
      <input type="number" id="carbs" v-model.number="newProduct.carbs" min="0" max="5000" required>
      <label for="protein">Protein:</label>
      <input type="number" id="protein" v-model.number="newProduct.protein" min="0" max="5000" required>
      <label for="fat">Fett:</label>
      <input type="number" id="fat" v-model.number="newProduct.fat" min="0" max="5000" required>
      <q-btn rounded color="green" icon="update" type="submit"></q-btn>
      <q-btn rounded color="green" icon="cancel" @click="cancelEdit"></q-btn>
    </form>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.calories }} Kalorien
        <q-btn rounded color="green" icon="edit" @click="editProduct(item)"></q-btn>
        <q-btn rounded color="green" icon="delete" @click="deleteProduct(item)"></q-btn>
      </li>
    </ul>
  </div>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({


  data() {
    return {
      items: [],
      newProduct: {
        id: null,
        name: '',
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0
      },
      editMode: false,
      editProductIndex: null,
      name: "Essen erstellen"
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const savedProducts = window.localStorage.getItem('products');
      if (savedProducts) {
        this.items = JSON.parse(savedProducts);
      }
    },
    saveProducts() {
      window.localStorage.setItem('products', JSON.stringify(this.items));
    },
    addProduct() {
      const product = {
        id: Date.now(),
        name: this.newProduct.name,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat
      };
      this.items.push(product);
      this.saveProducts();
      this.resetForm();
    },
    updateProduct() {
      const updatedProduct = {
        id: this.newProduct.id,
        name: this.newProduct.name,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat
      };
      this.items.splice(this.editProductIndex, 1, updatedProduct);
      this.saveProducts();
      this.cancelEdit();
    },
    deleteProduct(product) {
      const index = this.items.indexOf(product);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveProducts();
      }
    },
    editProduct(product) {
      this.editMode = true;
      this.editProductIndex = this.items.indexOf(product);
      this.newProduct = { ...product };
    },
    cancelEdit() {
      this.editMode = false;
      this.editProductIndex = null;
      this.resetForm();
    },
    resetForm() {
      this.newProduct = {
        id: null,
        name: '',
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0
      };
    }
  }
});
</script>