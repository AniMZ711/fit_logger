<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div class="row">
    <div class="Eingabebereich" style="padding-bottom: 50px">
      <form v-if="!editMode" @submit.prevent="addProduct">
        <q-input filled label="Name" color="green" type="text" id="name" v-model="newProduct.name" required />

        <q-input filled color="green" label="Kalorien" type="number" id="calories" v-model.number="newProduct.calories"
          min="0" max="5000" required />

        <q-input filled color="green" label="Kohlenhydrate" type="number" id="carbs" v-model.number="newProduct.carbs"
          min="0" max="5000" required />

        <q-input filled color="green" label="Proteine" type="number" id="protein" v-model.number="newProduct.protein"
          min="0" max="5000" required />

        <q-input filled color="green" label="Fett" type="number" id="fat" v-model.number="newProduct.fat" min="0"
          max="5000" required />

        <div class="SpeicherButton">
          <q-btn round color="green" icon="save" type="submit"></q-btn>
        </div>
      </form>

      <form v-if="editMode" @submit.prevent="updateProduct">
        <q-input filled label="Name" color="green" type="text" id="name" v-model="newProduct.name" required />

        <q-input filled label="Kalorien" color="green" type="number" id="calories" v-model.number="newProduct.calories"
          min="0" max="5000" required />

        <q-input filled label="Kohlenhydrate" color="green" type="number" id="carbs" v-model.number="newProduct.carbs"
          min="0" max="5000" required />

        <q-input filled label="Proteine" color="green" type="number" id="protein" v-model.number="newProduct.protein"
          min="0" max="5000" required />

        <q-input filled label="Fett" color="green" type="number" id="fat" v-model.number="newProduct.fat" min="0"
          max="5000" required />
        <q-btn round color="green" icon="update" type="submit"></q-btn>
        <q-btn round color="green" icon="cancel" @click="cancelEdit"></q-btn>
      </form>
    </div>
  </div>

  <div class="Ausgabebereich">
    <q-scroll-area style="height: 240px; max-width: 90%">
      <div class="ScrollContainer">
        <ul>
          <li v-for="item in items" :key="item.id">
            {{ item.name }} - {{ item.calories }} Kalorien
            <q-btn round color="green" icon="edit" @click="editProduct(item)">
            </q-btn>
            <q-btn round color="green" icon="delete" @click="deleteProduct(item)"></q-btn>
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
      // is localStorage needed here?
      items: JSON.parse(localStorage.getItem("products")) || [],
      newProduct: {
        id: null,
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      editMode: false,
      editProductIndex: null,
      pageName: "Produkt einspeichern", //bei Veränderung wird der Seitentitel automatisch angepasst
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
    addProduct() {
      this.items.push({
        id: Date.now(),
        name: this.newProduct.name,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat,
      });
      this.saveProducts();
    },
    updateProduct() {
      this.items.splice(this.editProductIndex, 1, this.newProduct);
      this.saveProducts();
      this.editMode = false;
      this.editProductIndex = null;
      this.resetForm();
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
        name: "",
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

.Eingabebereich {
  position: fixed;
  width: 90%;
  top: 18em;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.SpeicherButton {
  margin-top: 2em;
  text-align: center;
}

.Ausgabebereich {
  margin-top: 26em;
  text-align: center;
}
</style>
