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
            <div class="col col-8">
              <div class="display-add-product">
                <p>Produkt hinzufügen</p>
              </div>
            </div>
            <div class="col col-1">
              <div class="decorator-add-button">
                <q-btn
                  class="deco"
                  round
                  color="green"
                  icon="add_circle"
                  size="24px"
                  padding="10px"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-12">
              <div class="search-bar">
                <q-input
                  outline
                  v-model="searchQuery"
                  label="Nahrungsmittel suchen"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn
                  rounded
                  color="green"
                  icon="search"
                  @click="searchProduct"
                ></q-btn>

                <ul>
                  <li v-for="product in filteredProducts" :key="product.id">
                    {{ product.name }}: - {{ product.calories }} Gramm Kalorien,
                    {{ product.carbs }} Gramm Kohlenhydrate,
                    {{ product.protein }} Gramm Protein, {{ product.fat }} Gramm
                    Fett
                    <q-btn
                      rounded
                      color="green"
                      icon="add"
                      @click="addMeal(product)"
                    >
                    </q-btn>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="buttons-container">
        <div class="lower-container">
          <div class="row" style="height: 4em">
            <div class="col col-2"></div>
            <div class="col col-8">
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
        </div>

        <div class="lower-container-2">
          <div class="row" style="height: 4em">
            <div class="col col-2"></div>
            <div class="col col-8">
              <div class="manuell-add">
                <q-btn rounded color="green" icon="edit">
                  Manuell eingeben
                </q-btn>
              </div>
            </div>
            <div class="col col-2"></div>
          </div>
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
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default defineComponent({
  components: { StreamBarcodeReader },
  data() {
    return {
      searchQuery: "",
      showScanner: false,
      pageName: "Produkt hinzufügen", // bei Veränderung ändert sich der Seitentitel automatisch
      dailyConsumption: JSON.parse(
        localStorage.getItem("dailyConsumption")
      ) || {
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      meals: JSON.parse(localStorage.getItem("meals")) || [],
      products: JSON.parse(localStorage.getItem("products")) || {},
      filteredProducts: {},
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
    addMeal(product) {
      //meal
      const today = new Date();
      const meal = { ...product };
      //const product = ""; nicht relevant
      meal.date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      //aktuelles Zieltracking
      this.setDailyConsumption(meal);
      this.meals.push({ meal });
      window.localStorage.setItem("meals", JSON.stringify(this.meals));
    },
    setDailyConsumption(meal) {
      const newMeal = { ...meal };
      this.dailyConsumption = {
        calories: this.dailyConsumption.calories + newMeal.calories,
        carbs: this.dailyConsumption.carbs + newMeal.carbs,
        protein: this.dailyConsumption.protein + newMeal.protein,
        fat: this.dailyConsumption.fat + newMeal.fat,
      };
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/inter");

.scan-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lower-container {
  position: relative;
  top: 5em;
}

.lower-container-2 {
  position: relative;
  top: 5.1em;
}

.manuell-add {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.buttons-container {
  position: sticky;
  top: 60vh;
}

.upper-container {
  position: relative;

  margin-top: 4em;
}

.col {
  padding: 10px 15px;

  /* border: 1px solid red; */
}

.display-add-product {
  font-size: clamp(2.25rem, 1.9091rem + 1.4545vw, 3rem);
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  text-align: right;
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
