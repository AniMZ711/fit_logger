<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>
  <div class="show-all-products">
    <q-btn @click="showProducts = true" label="Alle anzeigen" icon="storage" rounded color="green" size="lg">
    </q-btn>
  </div>

  <q-dialog v-model="showProducts">
    <q-card class="q-pa-md">
      <q-btn class="absolute" style="top: 10px; right: 10px" flat icon="close" color="primary" v-close-popup />

      <div>
        <h2>Alle Produkte</h2>
        <div>
          <ul>
            <li class="dashboard-meals-list" v-for="product in products" :key="product.id">
              {{ product.name }}
            </li>
          </ul>
        </div>
      </div>
    </q-card>
  </q-dialog>


  <div class="row text-center item-center">
    <div class="col col-1"></div>
    <div class="col col-10">
      <!-- <div class="Eingabebereich" style="padding-bottom: 50px"> -->
      <br />
      <form v-if="!editMode" @submit.prevent="addProduct">
        <q-input filled label="Name" color="green" type="text" id="name" v-model="newProduct.name" required />

        <q-input filled color="green" label="Menge (g)" type="number" id="quantity" v-model.number="newProduct.quantity"
          min="0" max="5000" required />

        <q-input filled color="green" label="Kalorien (kcal)" type="number" id="calories"
          v-model.number="newProduct.calories" min="0" max="5000" required />

        <q-input filled color="green" label="Kohlenhydrate (g)" type="number" id="carbs" v-model.number="newProduct.carbs"
          min="0" max="5000" required />

        <q-input filled color="green" label="Proteine (g)" type="number" id="protein" v-model.number="newProduct.protein"
          min="0" max="5000" required />

        <q-input filled color="green" label="Fett (g)" type="number" id="fat" v-model.number="newProduct.fat" min="0"
          max="5000" required />

        <div class="SpeicherButton">
          <q-btn color="green" icon="save" type="submit" size="lg" rounded>Speichern</q-btn>
        </div>
      </form>

      <form v-if="editMode" @submit.prevent="updateProduct">
        <q-input filled label="Name" color="green" type="text" id="name" v-model="newProduct.name" required />

        <q-input filled color="green" label="Menge (g)" type="number" id="quantity" v-model.number="newProduct.quantity"
          min="0" max="5000" required />

        <q-input filled label="Kalorien (kcal)" color="green" type="number" id="calories"
          v-model.number="newProduct.calories" min="0" max="5000" required />

        <q-input filled label="Kohlenhydrate (g)" color="green" type="number" id="carbs" v-model.number="newProduct.carbs"
          min="0" max="5000" required />

        <q-input filled label="Proteine (g)" color="green" type="number" id="protein" v-model.number="newProduct.protein"
          min="0" max="5000" required />

        <q-input filled label="Fett (g)" color="green" type="number" id="fat" v-model.number="newProduct.fat" min="0"
          max="5000" required />
        <div class="AktualisierenButton">
          <q-btn rounded color="green" icon="update" type="submit" size="lg">Aktualisieren</q-btn>
        </div>
        <div class="AbbrechenButton">
          <q-btn rounded color="green" icon="cancel" @click="cancelEdit" size="lg">Abbrechen</q-btn>
        </div>
      </form>
      <!-- </div> -->
    </div>
    <div class="col col-1"></div>
  </div>

  <!--  <div class="Ausgabebereich">
    <q-scroll-area style="height: 240px; max-width: 90%">
      <div class="ScrollContainer">
        <ul>
          <li v-for="item in items" :key="item.id">
            {{ item.name }} - {{ item.calories }} Kalorien
            <q-btn round color="green" icon="edit" @click="editProduct(item)">
            </q-btn>
            <q-btn
              round
              color="green"
              icon="delete"
              @click="deleteProduct(item)"
            ></q-btn>
          </li>
        </ul>
      </div>
    </q-scroll-area>
  </div> -->

  <q-page-container class="editmeals">
    <div class="row">
      <div class="col col-1"></div>
      <div class="col col-10 text-center items-center">
        <ul>
          <li v-for="item in items" :key="item.id">
            <details>
              <summary>
                <span class="word"> {{ item.name }}</span>
                <span class="badge"> {{ item.calories }} kcal </span>
              </summary>
              Kalorien: {{ item.calories }}
              Kohlenhydrate:
              {{ item.carbs }} Proteine: {{ item.protein }} Fett:
              {{ item.fat }}
              <q-btn round color="green" icon="edit" @click="editProduct(item)">
              </q-btn>
              <q-btn round color="green" icon="delete" @click="deleteProduct(item)"></q-btn>
            </details>
          </li>
        </ul>
      </div>
      <div class="col col-1"></div>
    </div>
  </q-page-container>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {

      // is localStorage needed here?
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
      pageName: "Produkte", //bei Veränderung wird der Seitentitel automatisch angepasst
      shhowProducts: ref(false),
      products: []
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
        quantity: this.newProduct.quantity,
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
}
</style>
