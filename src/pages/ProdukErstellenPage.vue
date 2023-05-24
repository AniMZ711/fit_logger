<template>
    <q-layout>

        <q-page-container>
            <q-page>
                <h1> Das ist die Produkt Erstellen Seite</h1>


                <br /> <br />
                <p> Name: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Marke: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Gewicht/Packung </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Kalorien/100g: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Eiweiß/100g: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Fett/100g </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Kohlenhydrate/100g: </p>
                <input type="text" placeholder="..." />
                <br />

                <br />

                <q-btn color="green" to="/produkteinpflegen"> Speichern</q-btn>
            </q-page>
        </q-page-container>

    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'EssenErstellenPage',

    data() {
      return {
        items: [],
        newProduct: {
          id: null,
          name: '',
          calories: 0,
          carbs: 0,
          protein: 0,
          fat: 0
        },
        editMode: false,
        editProductIndex: null
      };
    },
    created() {
      this.loadProducts();
    },
    methods: {
      loadProducts() {
        const savedProducts = window.localStorage.getItem('products');
        if (savedProducts) {
          this.items = JSON.parse(savedProducts);
        }
      },
      saveProducts() {
        window.localStorage.setItem('products', JSON.stringify(this.items));
      },
  addProduct() {
  const product = {
  id: Date.now(),
  name: this.newProduct.name,
  calories: this.newProduct.calories,
  carbs: this.newProduct.carbs,
  protein: this.newProduct.protein,
  fat: this.newProduct.fat
  };
  this.items.push(product);
  this.saveProducts();
  this.resetForm();
  },
  updateProduct() {
  const updatedProduct = {
  id: this.newProduct.id,
  name: this.newProduct.name,
  calories: this.newProduct.calories,
  carbs: this.newProduct.carbs,
  protein: this.newProduct.protein,
  fat: this.newProduct.fat
  };
  this.items.splice(this.editProductIndex, 1, updatedProduct);
  this.saveProducts();
  this.cancelEdit();
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
  name: '',
  calories: 0,
  carbs: 0,
  protein: 0,
  fat: 0
  };
  }
  }
});
</script>