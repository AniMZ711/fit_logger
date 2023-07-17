<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center">{{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

 <!--   Eingabebreich-Leiste für den Namen des zu komponierenden Produkts: -->
    <div class="NameEingeben">
      <q-input
        color="green"
        label="Name der neuen Mahlzeit... "
        type="text"
        id="mealNameInput"
        v-model="mealName"
      />
    </div>

    <!-- Eingabeleiste für den Namen des Produkts, das man zur Komponierung hinzufügen möchte: -->
    <div class="Produktsuche">
      <q-input
        color="green"
        filled
        v-model="searchQuery"
        label="Suche die Produkte, die du komponieren möchtest ... "
        type="text"
      >
      
      <!-- Button, der die Suche ausführt und anzeigt: -->
        <template v-slot:after>
          <q-btn
            rounded
            size="lg"
            color="green"
            icon="search"
            @click="
              showSearch1 = true;
              searchProducts();"
          ></q-btn>
        </template>

      </q-input>
    </div>

    <!-- Pop-Up Page für die Auswahl der gesuchten Produkte (mit Detailansicht) in Form einer Liste, in der man die Produkte die man zur Komposition hinzufügen möchte auswählen kann: -->
    <q-dialog v-model="showSearch1">
      <q-card class="q-pa-md">
        <q-btn
          class="absolute"
          style="top: 2px; right: 2px"
          flat
          icon="close"
          color="primary"
          v-close-popup
        />

          <div>
            <ul>
              <li v-for="product in filteredProducts" :key="product.id">
                <details>
                  <summary>
                    <label>
                      <q-checkbox
                        color="green"
                        size="lg"
                        v-model="selectedProducts[product.id]"
                      />
                    </label>
                    <span class="word"> {{ product.name }}</span>
                    <span class="badge"> {{ product.calories }} kcal </span>
                  </summary>
                  Kalorien: {{ product.calories }} | Kohlenhydrate:
                  {{ product.carbs }}g | Proteine: {{ product.protein }}g |
                  Fett: {{ product.fat }}g
                </details>
              </li>
            </ul>
          </div>
      </q-card>
    </q-dialog>

   <!--  Bereich für die Auswahl der Menge die man von den ausgewählten Produkten hinzufügen möchte -->
      <div class="Mengenauswahl">
        <h6>Wähle die Menge:</h6>
        <ul>
          <li v-for="product in selectedProductsList" :key="product.id">
            {{ product.name }}: {{ calculateTotal(product, "quantity") }} Gramm
            &nbsp;

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
      </div>


      <!-- Ausgabe/Übersicht des neuen Produkts mit Detailansicht: -->
      <div class="row">
        <div class="col col-1"></div>
        <div class="col col-10 text-center items-center">
          <h6>neue Mahlzeit:</h6>

          <details>
            <summary>
              <span class="word"> {{ mealName }}</span>
              <span class="badge">
                {{ calculateMealTotal("calories") }} kcal
              </span>
            </summary>
            Gewicht: {{ calculateMealTotal("quantity") }}g | Kalorien:
            {{ calculateMealTotal("calories") }}
            | Kohlenhydrate:
            {{ calculateMealTotal("carbs") }}g | Proteine:
            {{ calculateMealTotal("protein") }}g | Fett:
            {{ calculateMealTotal("fat") }}g
          </details>

          <div class="col col-1"></div>
        </div>
      </div>

      <!-- Button zum speichern der komponierten Mahlzeit: -->
      <div class="save-button">
        <q-btn
          @click="saveMeal"
          :disabled="!isMealValid"
          icon="save"
          rounded
          color="green"
          size="lg"
          >Speichern</q-btn
        >
      </div>
 
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      showSearch1: ref(false),
      mealName: "",
      searchQuery: "",
      products: [],
      filteredProducts: [],
      selectedProducts: [],
      productFactor: {},
      pageName: "Mahlzeit komponieren",
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
      const filteredProducts = this.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
      this.filteredProducts = filteredProducts;
    },
    // Verschiende Portionsgrößen bereitstellen
    formatFactor(factor) {
      if (factor === "1/4") {
        return "1/4";
      } else if (factor === "1/2") {
        return "1/2";
      } else {
        return factor;
      }
    },
    // Berechnungsfunktion der Gesamtmenge eines Produktes
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
    // Berechnungsfunktion der Gesamtmenge der gesamten Mahlzeit
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
      const existingProducts = JSON.parse(
        window.localStorage.getItem("products")
      );

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

      this.mealName = "";
      this.searchQuery = "",
      this.products = [],
      this.filteredProducts = [],
      this.selectedProducts = [];
      this.productFactor = {};
      meal = {};
      existingProducts = [];
      existingProductIndex = 0;
    },
  },
});
</script>

<style>
/* Positionierung der Eingabeleiste für den Namen des neuen Produkts: */
.NameEingeben {
  margin-top: 2em;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

/* Positionierung des Suchbereichs: */
.Produktsuche {
  margin-top: 2em;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

/* Positionierung der Mengen-Auswahl: */
.Mengenauswahl {
  text-align: center;
}

/* Positionierung des Speicher-Buttons: */
.save-button {
  text-align: center;
  margin-top: 2em;
  margin-bottom: 5em;
}

</style>
