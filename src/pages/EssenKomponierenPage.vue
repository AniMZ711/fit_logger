<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/essenkomponieren" icon="arrow_back" />
      <q-toolbar-title class="absolute-center">{{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div>
    <div class="NameEingeben">
      <q-input
        color="green"
        label="Name der neuen Mahlzeit"
        type="text"
        id="mealNameInput"
        v-model="mealName"
      />
    </div>

    <div class="Suchleiste">
      <q-input
        color="green"
        filled
        v-model="searchQuery"
        label="Suche die Produkte, die du kopomnieren möchtest ... "
        type="text"
      >
        <template v-slot:after>
          <q-btn
            rounded
            size="lg"
            color="green"
            icon="search"
            @click="searchProducts"
          ></q-btn>
        </template>
      </q-input>
    </div>

    <div v-if="searchResults.length > 0">
      <div class="Ausgabebereich2">
        <h6>Ergebnisse:</h6>
        <q-scroll-area style="height: 250px; max-width: 90%">
          <ul>
            <li v-for="product in searchResults" :key="product.id">
              <label>
                <input type="checkbox" v-model="selectedProducts[product.id]" />
                {{ product.name }} - {{ product.calories }} Kalorien,
                {{ product.carbs }} Kohlenhydrate,
                {{ product.protein }} Protein, {{ product.fat }} Fett
              </label>
              <select v-model="productQuantities[product.id]">
                <option value="1/4">1/4</option>
                <option value="1/2">1/2</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </li>
          </ul>
        </q-scroll-area>
      </div>
    </div>

    <div>
      <h5>Summe:</h5>
      <ul>
        <li v-for="product in selectedProductsList" :key="product.id">
          {{ product.name }} -
          {{ formatQuantity(productQuantities[product.id]) }} -
          {{ calculateTotal(product) }} Gesamt Kalorien,
          {{ calculateTotal(product, "carbs") }} Gesamt Kohlenhydrate,
          {{ calculateTotal(product, "protein") }} Gesamt Protein,
          {{ calculateTotal(product, "fat") }} Gesamt Fett
        </li>
      </ul>
      <p>
        Gesamtsumme: {{ calculateMealTotal() }} Gesamt Kalorien,
        {{ calculateMealTotal("carbs") }} Gesamt Kohlenhydrate,
        {{ calculateMealTotal("protein") }} Gesamt Protein,
        {{ calculateMealTotal("fat") }} Gesamt Fett
      </p>
      <div class="save-button">
        <q-btn
          @click="saveMeal"
          icon="save"
          rounded
          color="green"
          size="lg"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      mealName: "",
      searchTerm: "",
      products: [],
      searchResults: [],
      selectedProducts: [],
      productQuantities: {},
      pageName: "Essen komponieren",
    };
  },
  computed: {
    selectedProductsList() {
      return this.products.filter(
        (product) => this.selectedProducts[product.id]
      );
    },
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
      this.selectedProducts.forEach((product) => {
        this.$set(this.productQuantities, product.id, "1");
      });
    },
    searchProducts() {
      this.searchResults = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    formatQuantity(quantity) {
      if (quantity === "1/4") {
        return "1/4";
      } else if (quantity === "1/2") {
        return "1/2";
      } else {
        return quantity;
      }
    },
    calculateTotal(product, type) {
      const quantity = this.productQuantities[product.id];
      if (quantity === "1/4") {
        return product[type] * 0.25;
      } else if (quantity === "1/2") {
        return product[type] * 0.5;
      } else {
        return product[type] * parseFloat(quantity);
      }
    },
    calculateMealTotal(type) {
      let total = 0;
      this.selectedProductsList.forEach((product) => {
        const quantity = this.productQuantities[product.id];
        if (type === undefined) {
          total += product.calories * parseFloat(quantity);
        } else {
          total += product[type] * parseFloat(quantity);
        }
      });
      return total;
    },
    saveMeal() {
      const existingProducts = window.localStorage.getItem("products");
      const products = existingProducts ? JSON.parse(existingProducts) : [];

      const meal = {
        name: this.mealName,
        products: this.selectedProductsList,
        quantities: this.productQuantities,
        isMeal: true, // Spezielles Flag für Mahlzeiten
      };

      products.push(meal);

      window.localStorage.setItem("products", JSON.stringify(products));

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
.NameEingeben {
  margin-top: 2em;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
.Suchleiste {
  margin-top: 2em;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
.save-button {
  text-align: center;
  margin-bottom: 5em;
}
.Ausgabebereich2 {
  text-align: center;
}
</style>
