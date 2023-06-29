<template>
  <q-header clas="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center">
        {{ "Produktsuche" }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <q-page-container class="editmeals">
    <div class="row item-center">
      <div class="col col-1"></div>
      <div class="col col-10 text-center items-center">
        <!--style="max-width: 300px" in class tag-->
        <q-input color="green" filled v-model="searchQuery" label="Produktnamen eingeben..." type="text">
          <template v-slot:after>
            <q-btn rounded size="lg" color="green" icon="search" @click="searchProduct"></q-btn>
          </template>
        </q-input>
      </div>
    </div>

    <!--  <div class="Ausgabebereich1">
    <q-scroll-area style="height: 400px; max-width: 90%">
      <div class="ScrollContainer">
        <ul>
          <li v-for="product in filteredProducts" :key="product.id">
            {{ product.name }}: - {{ product.quantity }} Gramm,
            {{ product.calories }} Kalorien, {{ product.carbs }} Gramm
            Kohlenhydrate, {{ product.protein }} Gramm Protein,
            {{ product.fat }} Gramm Fett
          </li>
        </ul>
      </div>
    </q-scroll-area>
  </div>
</template> -->

    <div class="row">
      <div class="col col-1"></div>
      <div class="col col-10 text-center items-center">
        <ul>
          <li v-for="product in filteredProducts" :key="product.id">
            <details>
              <summary>
                <span class="word"> {{ product.name }}</span>
                <span class="badge"> {{ product.calories }} kcal </span>
              </summary>
              Kalorien: {{ product.calories }} | Kohlenhydrate:
              {{ product.carbs }}g | Proteine: {{ product.protein }}g | Fett:
              {{ product.fat }}g
            </details>
          </li>
        </ul>
      </div>
      <div class="col col-1"></div>
    </div>
  </q-page-container>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      searchQuery: "",
      products: [],
      filteredProducts: [],
      pageName: "Produkt suchen", // bei Veränderung ändert sich der Seitentitel automatisch
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
  position: fixed;
  width: 90%;
  top: 8em;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.button {
  margin-top: 8em;
  text-align: center;
}

.Ausgabebereich1 {
  margin-top: 12em;
  text-align: center;
}
</style>
