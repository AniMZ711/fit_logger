<template>
  <div>
    <h2>Produkt hinzufügen</h2>

    <form v-if="!editMode" @submit.prevent="addProduct">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="newProduct.name" required />
      <label for="calories">Kalorien:</label>
      <input
        type="number"
        id="calories"
        v-model.number="newProduct.calories"
        min="0"
        max="5000"
        required
      />
      <label for="carbs">Kohlenhydrate:</label>
      <input
        type="number"
        id="carbs"
        v-model.number="newProduct.carbs"
        min="0"
        max="5000"
        required
      />
      <label for="protein">Protein:</label>
      <input
        type="number"
        id="protein"
        v-model.number="newProduct.protein"
        min="0"
        max="5000"
        required
      />
      <label for="fat">Fett:</label>
      <input
        type="number"
        id="fat"
        v-model.number="newProduct.fat"
        min="0"
        max="5000"
        required
      />
      <button type="submit">Produkt hinzufügen</button>
    </form>

    <form v-else @submit.prevent="updateProduct">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="newProduct.name" required />
      <label for="calories">Kalorien:</label>
      <input
        type="number"
        id="calories"
        v-model.number="newProduct.calories"
        min="0"
        max="5000"
        required
      />
      <label for="carbs">Kohlenhydrate:</label>
      <input
        type="number"
        id="carbs"
        v-model.number="newProduct.carbs"
        min="0"
        max="5000"
        required
      />
      <label for="protein">Protein:</label>
      <input
        type="number"
        id="protein"
        v-model.number="newProduct.protein"
        min="0"
        max="5000"
        required
      />
      <label for="fat">Fett:</label>
      <input
        type="number"
        id="fat"
        v-model.number="newProduct.fat"
        min="0"
        max="5000"
        required
      />
      <button type="submit">Produkt aktualisieren</button>
      <button @click="cancelEdit">Abbrechen</button>
    </form>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.calories }} Kalorien
        <button @click="editProduct(item)">Bearbeiten</button>
        <button @click="deleteProduct(item)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      newProduct: {
        id: null,
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      editMode: false,
      editProductIndex: null,
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
    },

    addProduct() {
      // JS eingefügt 27.05 Teil zur Logik
      if (!this.isValidProduct(this.newProduct)) {
        console.log("Ungültige Eingabe");
        return;
      }
      // bis hier hin

      const product = {
        id: Date.now(),
        name: this.newProduct.name,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat,
      };
      this.items.push(product);
      this.saveProducts();
      this.resetForm();
    },

    updateProduct() {
      // JS eingefügt 27.05 Teil zur Logik
      if (!this.isValidProduct(this.newProduct)) {
        console.log("Ungültige Eingabe");
        return;
      }
      // bis hier hin

      const updatedProduct = {
        id: this.newProduct.id,
        name: this.newProduct.name,
        calories: this.newProduct.calories,
        carbs: this.newProduct.carbs,
        protein: this.newProduct.protein,
        fat: this.newProduct.fat,
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
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      };
    },

    //JS 27.05
    // prueft ob der Produktname eingegeben wurde - JS
    isValidProduct(product) {
      if (!product.name.trim()) {
        return false;
      }

      // prueft ob die Werte positive Zahlen sind - JS
      if (
        product.calories <= 0 ||
        product.carbs <= 0 ||
        product.protein <= 0 ||
        product.fat <= 0
      ) {
        return false;
      }

      // prueft ob die Werte fuer Kohlenhydrate, Protein und Fett insgesamt nicht über 100gramm kommen - JS
      if (product.carbs > 100 || product.protein > 100 || product.fat > 100) {
        return false;
      }

      // prueft ob die Kombination der Werte für Kohlenhydrate, Protein und Fett insgesamt nicht über 100g beträgt - JS
      if (product.carbs + product.protein + product.fat > 100) {
        return false;
      }

      return true;
    },
  },
};
</script>
