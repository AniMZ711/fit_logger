<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/essenkomponieren" icon="arrow_back" />
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center">{{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div>
    <div class="NameEingeben">
      <q-input color="green" label="Name der neuen Mahlzeit" type="text" id="mealNameInput" v-model="mealName" />
    </div>

    <div class="Suchleiste">
      <q-input color="green" filled v-model="searchQuery" label="Suche die Produkte, die du kopomnieren möchtest ... "
        type="text">
        <template v-slot:after>
          <q-btn rounded size="lg" color="green" icon="search" @click="searchProducts">Test</q-btn>
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
                {{ product.name }} - {{ product.quantity }} Menge
              </label>
            </li>
          </ul>
        </q-scroll-area>
      </div>
    </div>

    <div>
      <h5>Summe:</h5>
      <ul>
        <li v-for="product in selectedProductsList" :key="product.id">
          {{ formatFactor(productFactor[product.id]) }} - {{ product.name }} -
          {{ calculateTotal(product, "quantity") }} Gesamt Menge,
          {{ calculateTotal(product, "calories") }} Gesamt Kalorien,
          {{ calculateTotal(product, "carbs") }} Gesamt Kohlenhydrate,
          {{ calculateTotal(product, "protein") }} Gesamt Protein,
          {{ calculateTotal(product, "fat") }} Gesamt Fett
          <select v-model="productFactor[product.id]">
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
      <p>
        Gesamtsumme:
        {{ calculateMealTotal("quantity") }} Gesamt Menge,
        {{ calculateMealTotal("calories") }} Gesamt Kalorien,
        {{ calculateMealTotal("carbs") }} Gesamt Kohlenhydrate,
        {{ calculateMealTotal("protein") }} Gesamt Protein,
        {{ calculateMealTotal("fat") }} Gesamt Fett
      </p>
      <div class="save-button">
        <q-btn @click="saveMeal" :disabled="!isMealValid" icon="save" rounded color="green" size="lg"></q-btn>
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
      productFactor: {},
      pageName: "Essen komponieren",
    };
  },
  computed: {
    selectedProductsList() {
      return this.products.filter(
        (product) => this.selectedProducts[product.id]
      );
    },
    isMealValid() {
      return (
        this.mealName.trim() !== "" && this.selectedProductsList.length > 0
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
        this.$set(this.productFactor, product.id, "1");
      });
    },
    searchProducts() {
      this.searchResults = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    formatFactor(factor) {
      if (factor === "1/4") {
        return "1/4";
      } else if (factor === "1/2") {
        return "1/2";
      } else {
        return factor;
      }
    },
    calculateTotal(product, type) {
      const factor = this.productFactor[product.id];
      if (factor === "1/4") {
        return product[type] * 0.25;
      } else if (factor === "1/2") {
        return product[type] * 0.5;
      } else {
        return product[type] * parseFloat(factor);
      }
    },
    calculateMealTotal(type) {
      let total = 0;
      this.selectedProductsList.forEach((product) => {
        const factor = this.productFactor[product.id];
        total += product[type] * parseFloat(factor);
      });
      return total;
    },
  
    saveMeal() {
      const meal = {
        name: this.mealName,
        id: Date.now(),
        quantity: this.calculateMealTotal("quantity"),
        calories: this.calculateMealTotal("calories"),
        carbs: this.calculateMealTotal("carbs"),
        protein: this.calculateMealTotal("protein"),
        fat: this.calculateMealTotal("fat"),
      };
      console.log(meal);
      const existingProducts = JSON.parse(window.localStorage.getItem("products"));
      
      // Überprüfen, ob die Mahlzeit bereits im products-Array gespeichert wurde
      const existingProductIndex = existingProducts.indexOf(meal);
      if (existingProductIndex === null) {
        // Mahlzeit aktualisieren
        products.splice(existingProductIndex, 1, meal);
      } else {
        // Neue Mahlzeit hinzufügen
        existingProducts.push(meal);
      }

      window.localStorage.setItem("products", JSON.stringify(existingProducts));
      
      this.mealName= "";
      this.searchTerm= "";
      this.searchResults= [];
      this.selectedProducts= [];
      this.productFactor= {};
      meal = {};
      existingProducts = [];
      existingProductIndex = 0;
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
