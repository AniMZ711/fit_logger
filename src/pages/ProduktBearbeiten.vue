<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div class="row text-center item-center">
    <div class="col col-1"></div>
    <div class="col col-10">
      <!-- <div class="Eingabebereich" style="padding-bottom: 50px"> -->
      <br />
      
      <form v-if="editMode">
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
          label="Menge (g)"
          type="number"
          id="quantity"
          v-model.number="newProduct.quantity"
          min="0"
          max="5000"
          required
        />

        <q-input
          filled
          label="Kalorien (kcal)"
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
          label="Kohlenhydrate (g)"
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
          label="Proteine (g)"
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
          label="Fett (g)"
          color="green"
          type="number"
          id="fat"
          v-model.number="newProduct.fat"
          min="0"
          max="5000"
          required
        />

        <div class="AktualisierenButton">
          <q-btn
            rounded
            color="green"
            icon="save"
           @click="updateProduct"
            size="lg"
            padding="10px"
            to="/produkteinpflegen"
            >Speichern</q-btn
          >
          <q-btn
            rounded
            padding="10px"
            color="green"
            icon="cancel"
            @click="cancelEdit"
            size="lg"
            to="/produkteinpflegen"
            >Abbrechen</q-btn
          >
        </div>

        <!-- <div class="AbbrechenButton">
          <q-btn
            rounded
            color="green"
            icon="cancel"
            @click="cancelEdit"
            size="lg"
            >Abbrechen</q-btn
          >
        </div> -->
      </form>
    </div>
    <div class="col col-1"></div>
  </div>

  <!--   <div class="row text-center item-center">
    <div class="col col-1"></div>
    <div class="col col-10">
      <br />
      <q-btn
        @click="showProducts = true"
        label="Produkt bearbeiten "
        rounded
        color="green"
        size="lg"
        icon="edit"
      >
      </q-btn>
    </div>
    <div class="col col-1"></div>
  </div> -->

  <q-dialog v-model="showProducts">
    <q-card style="width: 350px; height:550px">
      <q-btn
        class="absolute"
        style="right: -1em"
        flat
        icon="close"
        color="primary"
        v-close-popup
        to ="/produkteinpflegen"
      />

      <div class="q-px-lg q-ma-sm">
          <ul>
            <li v-for="item in items" :key="item.id">
              <details>
                <summary>
                  <span class="word"> {{ item.name }}</span>
                  <q-btn
                    round
                    color="green"
                    icon="edit"
                    @click="editProduct(item)"
                    v-close-popup
                  >
                  </q-btn>
                </summary>
                 Kalorien: {{ item.calories }} | Kohlenhydrate: {{ item.carbs }}g
                | Proteine: {{ item.protein }}g | Fett: {{ item.fat }}g &nbsp;
              </details>
            </li>
          </ul>
        </div>
      
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      // is localStorage needed here?
      showProducts: ref(true),
      items: JSON.parse(localStorage.getItem("products")) || [],
      newProduct: {
        id: null,
        name: "",
        quantity: 0,
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      editMode: false,
      editProductIndex: null,
      pageName: "Produkt bearbeiten", //bei Veränderung wird der Seitentitel automatisch angepasst
      shhowProducts: ref(false),
      products: [],
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
    // Produkt aktualisieren 
    updateProduct() {
      console.log("updateProduct");
      console.log(this.newProduct);
      this.items[this.editProductIndex] =this.newProduct; 
      this.saveProducts();
      this.editMode = false;
      this.editProductIndex = -1;
      this.resetForm();
    },
    // Produkt bearbeiten
    editProduct(product) {
      this.editMode = true;
      this.editProductIndex = this.items.indexOf(product);
      console.log(this.editProductIndex);
      this.newProduct = { ...product };
      console.log("editProduct");
      console.log(this.newProduct);
    },
    // Abbruch-Funktion
    cancelEdit() {
      this.editMode = false;
      this.editProductIndex = null;
      this.resetForm();
    },
    // Zurücksetz-Funktion
    resetForm() {
      this.newProduct = {
        id: null,
        name: "",
        quantity: 0,
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
  top: 20em;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.SpeicherButton {
  margin-top: 2em;
  text-align: center;
}

.Ausgabebereich {
  margin-top: 30em;
  position: fixed;
  left: 5%;
  margin-right: 5%;
}

.AktualisierenButton {
  margin-top: 1em;
  text-align: center;
}

.AbbrechenButton {
  margin-top: 1em;
  text-align: center;
}

.show-all-products {
  text-align: center;
  margin-top: 1em;
}
</style>
