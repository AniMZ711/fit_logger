<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-btn flat to="/dashboard" icon="arrow_back" />
        <q-toolbar-title> {{ pageName }}</q-toolbar-title>
        <!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>

    <q-page>
      <div class="upper-container">
        <div class="q-pa-sm example-row-equal-width">
          <div class="row self-center items-center" style="height: auto">
            <div class="col col-1"></div>
            <div class="col col-10">
              <div class="display-add-product">
                <p>Produkt hinzufügen</p>
              </div>
            </div>
            <div class="col col-1">
              <!-- <div class="decorator-add-button">
                <q-btn class="deco" round color="green" icon="add_circle" size="24px" padding="10px" />
              </div> -->
            </div>
          </div>

          <div class="row">
            <div class="col col-12 q-px-lg q-mx-sm text-center">
              <div class="search-bar">
                <q-input
                  outline
                  v-model="searchQuery"
                  label="Nahrungsmittel suchen"
                  clearable
                >
                  <template v-slot:prepend>
                    <!--Platzhalter-->
                  </template>

                  <template v-slot:after>
                    <q-btn
                      rounded
                      color="green"
                      icon="search"
                      @click="searchProduct"
                    ></q-btn>
                  </template>
                </q-input>

                <div class="row justify-center">
                  <div class="col col-12 display-found-meals">
                    <q-scroll-area style="height: 40vh; width: 100%">
                      <div class="ScrollContainer">
                        <ul>
                          <li
                            v-for="product in filteredProducts"
                            :key="product.id"
                          >
                            {{ product.name }} ( {{ product.quantity }}g ):
                            {{ product.calories }} kcal, {{ product.carbs }}g
                            Kohlenhydrate, {{ product.protein }}g Proteine,
                            {{ product.fat }}g Fett
                            <q-btn
                              round
                              color="green"
                              icon="add"
                              @click="toggleMealAddPopup(product)"
                            >
                            </q-btn>
                          </li>
                        </ul>
                      </div>
                    </q-scroll-area>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="buttons-container">
        <div class="row">
          <div class="col col-2"></div>
          <div class="col col-8 text-center q-pa-sm">
            <div class="scan-button">
              <q-btn
                size="md"
                rounded
                color="green"
                icon="qr_code_scanner"
                @click="toggleScanner"
              >
                Produkt scannen
              </q-btn>
            </div>
          </div>
          <div class="col col-2"></div>
        </div>

        <div class="row">
          <div class="col col-2"></div>
          <div class="col col-8 text-center q-pa-sm">
            <div class="save-product">
              <q-btn rounded color="green" icon="save" to="/produkterstellen">
                Produkt einspeichern
              </q-btn>
            </div>
          </div>
          <div class="col col-2"></div>
        </div>
      </div>

      <teleport to="body">
        <div class="modal" v-if="showScanner">
          <div>
            <StreamBarcodeReader
              @decode="onDecode"
              @loaded="onLoaded"
            ></StreamBarcodeReader>
            <div style="padding-top: 10px">
              <q-btn
                rounded
                color="green"
                icon="qr_code_scanner"
                @click="toggleScanner"
              >
                Scan beenden
              </q-btn>
            </div>
          </div>
        </div>
      </teleport>

      <teleport to="body">
        <div class="modal" v-if="addToMeals">
          <div>
            <div>
              {{ selectedProduct.name }} - {{ selectedProduct.quantity }}g
              <br />

              {{ selectedProduct.calories }} kcal, {{ selectedProduct.carbs }}g
              Kohlenhydrate, {{ selectedProduct.protein }}g Protein,
              {{ selectedProduct.fat }}g Fett
            </div>

            <div>
              <q-input
                filled
                color="green"
                label="Menge eintragen (g)"
                id="Menge"
                v-model.number="quantity"
                type="number"
                min="0"
                required
              >
              </q-input>

              <div>
                <select v-model="selectedMealTime">
                  <option
                    v-for="option in options"
                    :value="option.value"
                    :key="option.text"
                  >
                    {{ option.text }}
                  </option>
                </select>
              </div>
            </div>

            <div style="padding-top: 10px">
              <q-btn
                rounded
                color="green"
                icon="add"
                @click="calculateIngredientValues(quantity)"
              >
                Essen hinzufügen
              </q-btn>
              <q-btn
                rounded
                color="green"
                icon="cancel"
                @click="toggleMealAddPopup()"
              >
              </q-btn>
            </div>
          </div>
        </div>
      </teleport>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default defineComponent({
  components: { StreamBarcodeReader },
  data() {
    return {
      searchQuery: "",
      showScanner: false,
      addToMeals: false,
      pageName: "Produkt hinzufügen", // bei Veränderung ändert sich der Seitentitel automatisch
      dailyConsumption: JSON.parse(localStorage.getItem("dailyConsumption")),
      goal: JSON.parse(localStorage.getItem("Goal")) || {
        calories: 1800,
        carbs: 250,
        protein: 80,
        fat: 50,
      },
      meals: JSON.parse(localStorage.getItem("meals")) || [],
      products: JSON.parse(localStorage.getItem("products")) || {},
      filteredProducts: {},
      quantity: 100,
      selectedProduct: {},
      options: ref([
        { text: "Frühstück", value: "Frühstück" },
        { text: "Mittagessen", value: "Mittagessen" },
        { text: "Abendessen", value: "Abendessen" },
        { text: "Snacks", value: "Snacks" },
      ]),
      single: ref(null),
      selectedMealTime: ref("Frühstück"),
      date: "",
    };
  },
  methods: {
    toggleScanner() {
      this.showScanner = !this.showScanner;
      //this.open = !this.open;
    },
    onLoaded() {
      console.log(`Scanning now`);
    },
    onDecode(text) {
      console.log(`Decode text from QR code is ${text}`);
    },
    searchProduct() {
      const filteredProducts = this.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
      this.filteredProducts = filteredProducts;
    },
    toggleMealAddPopup(product) {
      this.selectedProduct = { ...product };
      this.addToMeals = !this.addToMeals;
    },
    addMeal(food) {
      //meal
      const today = new Date();
      const todayString =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      this.dateCheck(todayString);

      const meal = { ...food };
      meal.id = Date.now();
      meal.time = this.selectedMealTime;
      meal.date = todayString;

      this.meals.push(meal);
      window.localStorage.setItem("meals", JSON.stringify(this.meals));

      this.dailyConsumption = {
        date: todayString,
        calories: this.dailyConsumption.calories + meal.calories,
        carbs: this.dailyConsumption.carbs + meal.carbs,
        protein: this.dailyConsumption.protein + meal.protein,
        fat: this.dailyConsumption.fat + meal.fat,
      };
      //aktuelles Zieltracking
      this.setDailyConsumption();

      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
      this.toggleMealAddPopup();
    },

    setDailyConsumption() {
      this.dailyConsumption.caloriesPercentage = this.calculateCaloriesValue(
        this.dailyConsumption.calories,
        this.goal.calories
      );
      this.dailyConsumption.carbsPercentage = this.calculateOtherValues(
        this.dailyConsumption.carbs,
        this.goal.carbs
      );
      this.dailyConsumption.proteinPercentage = this.calculateOtherValues(
        this.dailyConsumption.protein,
        this.goal.protein
      );
      this.dailyConsumption.fatPercentage = this.calculateOtherValues(
        this.dailyConsumption.fat,
        this.goal.fat
      );
    },
    calculateIngredientValues(quantity) {
      const factor = quantity / this.selectedProduct.quantity;
      const meal = {
        name: this.selectedProduct.name,
        quantity: quantity,
        calories: parseFloat(
          (this.selectedProduct.calories * factor).toFixed(2)
        ),
        carbs: parseFloat((this.selectedProduct.carbs * factor).toFixed(2)),
        protein: parseFloat((this.selectedProduct.protein * factor).toFixed(2)),
        fat: parseFloat((this.selectedProduct.fat * factor).toFixed(2)),
      };
      this.addMeal(meal);
    },
    calculateCaloriesValue(dailyConsumptionValue, goalValue) {
      return parseFloat(((dailyConsumptionValue / goalValue) * 100).toFixed(2));
    },
    calculateOtherValues(dailyConsumptionValue, goalValue) {
      return parseFloat(dailyConsumptionValue / goalValue);
    },
    dateCheck(dateString) {
      if (this.dailyConsumption.date != dateString) {
        window.localStorage.setItem(
          "dailyConsumption",
          JSON.stringify({
            date: dateString,
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            caloriesPercentage: 0,
            carbsPercentage: 0,
            proteinPercentage: 0,
            fatPercentage: 0,
          })
        );
        this.dailyConsumption = JSON.parse(
          window.localStorage.getItem("dailyConsumption")
        );
      }
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/inter");

.buttons-container {
  position: sticky;
  top: 60vh;
}

.upper-container {
  position: relative;

  margin-top: 4em;
}

.display-add-product {
  font-size: clamp(2.25rem, 1.9091rem + 1.4545vw, 3rem);
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  text-align: center;
  vertical-align: center;
  letter-spacing: -0.1em;

  color: #323232;
}

.root {
  position: relative;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
}
</style>
