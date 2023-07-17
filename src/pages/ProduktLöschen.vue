<template>
  <q-header class="stickyHeader">
    <q-toolbar>
      <q-btn flat to="/produkteinpflegen" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <!-- Pop-Up mit Auswahl der Produkte in Form einer Liste und Button zum löschen: -->
  <q-dialog v-model="showProducts">
    <q-card style="width: 350px; height:550px">
     
      <q-btn
        class="absolute"
        style="right: -1em;"
        flat
        icon="close"
        color="primary"
        to="/produkteinpflegen"
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
                    icon="delete"
                    @click="deleteProduct(item)"
                  ></q-btn>
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
      pageName: "Produkt löschen", //bei Veränderung wird der Seitentitel automatisch angepasst
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
    deleteProduct(product) {
      const index = this.items.indexOf(product);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveProducts();
      }
    },
    },
  },
);
</script>

<style>
* {
  overflow: y;
}
</style>
