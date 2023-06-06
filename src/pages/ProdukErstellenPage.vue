<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div class="Eingabebereich" style="padding-bottom: 50px, margin: 300px;">
    <form v-if="!editMode" @submit.prevent="addProduct">
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
        label="Kalorien"
        type="number"
        id="calories"
        v-model.number="newProduct.calories"
        min="0"
        max="5000"
        required
      />

      <q-input
        filled
        color="green"
        label="Kohlenhydrate"
        type="number"
        id="carbs"
        v-model.number="newProduct.carbs"
        min="0"
        max="5000"
        required
      />

      <q-input
        filled
        color="green"
        label="Proteine"
        type="number"
        id="protein"
        v-model.number="newProduct.protein"
        min="0"
        max="5000"
        required
      />

      <q-input
        filled
        color="green"
        label="Fett"
        type="number"
        id="fat"
        v-model.number="newProduct.fat"
        min="0"
        max="5000"
        required
      />

      <q-btn rounded color="green" icon="add" type="submit"></q-btn>
    </form>

    <form v-if="editMode" @submit.prevent="updateProduct">
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
        label="Kalorien"
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
        label="Kohlenhydrate"
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
        label="Proteine"
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
        label="Fett"
        color="green"
        type="number"
        id="fat"
        v-model.number="newProduct.fat"
        min="0"
        max="5000"
        required
      />

      <q-btn
        rounded
        color="green"
        icon="update"
        @click="updateProduct"
        type="submit"
      ></q-btn>
      <q-btn rounded color="green" icon="cancel" @click="cancelEdit"></q-btn>
    </form>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.calories }} Kalorien
        <q-btn rounded color="green" icon="edit" @click="editProduct(item)">
        </q-btn>
        <q-btn
          rounded
          color="green"
          icon="delete"
          @click="deleteProduct(item)"
        ></q-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      // is localStorage needed here?
      items: localStorage.products || [],
      dailyConsumption: JSON.parse(
        localStorage.getItem("dailyConsumption")
      ) || {
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },

      newProduct: {
        id: null,
        date: "",
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      editMode: false,
      editProductIndex: null,
      pageName: "Produkt / Essen hinzufügen", //bei Veränderung wird der Seitentitel automatisch angepasst
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const savedProducts = window.localStorage.getItem("products");
      const savedConsumption = window.localStorage.getItem("dailyConsumption");
      if (savedProducts) {
        this.items = JSON.parse(savedProducts);
      }
      if (savedConsumption) {
        this.dailyConsumption = JSON.parse(savedConsumption);
      }
    },
    saveProducts() {
      window.localStorage.setItem("products", JSON.stringify(this.items));
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
      this.resetForm();
    },
    addProduct() {
      const today = new Date();
      //const product = ""; nicht relevant

      //aktuelles Zieltracking
      this.setDailyConsumption(true);
      this.items.push({
        id: Date.now(),
        date:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate(),
        name: this.newProduct.name,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat,
      });
      this.saveProducts();
    },
    updateProduct() {
      /* const updatedProduct = {
        id: this.newProduct.id,
        date: this.newProduct.date,
        name: this.newProduct.name,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat,
      }; */
      this.items.splice(this.editProductIndex, 1, this.newProduct);
      this.setDailyConsumption(true);

      this.saveProducts();
      this.editMode = false;
      this.editProductIndex = null;
      this.resetForm();
    },
    deleteProduct(product) {
      this.setDailyConsumption(false);
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

      this.setDailyConsumption(false);
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
    },
    cancelEdit() {
      this.setDailyConsumption(true);
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
      this.editMode = false;
      this.editProductIndex = null;
      this.resetForm();
    },
    setDailyConsumption(operation) {
      if (operation) {
        this.dailyConsumption = {
          calories: this.dailyConsumption.calories + this.newProduct.calories,
          carbs: this.dailyConsumption.carbs + this.newProduct.carbs,
          protein: this.dailyConsumption.protein + this.newProduct.protein,
          fat: this.dailyConsumption.fat + this.newProduct.fat,
        };
      } else {
        this.dailyConsumption = {
          calories: this.dailyConsumption.calories - this.newProduct.calories,
          carbs: this.dailyConsumption.carbs - this.newProduct.carbs,
          protein: this.dailyConsumption.protein - this.newProduct.protein,
          fat: this.dailyConsumption.fat - this.newProduct.fat,
        };
      }
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
  top: 450px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
