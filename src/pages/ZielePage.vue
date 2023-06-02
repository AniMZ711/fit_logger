<template>
  <q-header>
    <q-toolbar>
      <q-btn flat to="/profil" icon="arrow_back" />
      <q-toolbar-title> {{ name }}</q-toolbar-title>
    </q-toolbar>
  </q-header>
  <div class="Eingabebereich">
    <form v-if="!editMode" @submit.prevent="saveGoal">
      <q-input
        filled
        label="Name"
        color="green"
        type="text"
        id="name"
        v-model="newGoal.name"
        required
      />

      <q-input
        filled
        label="Kalorien"
        color="green"
        type="number"
        id="calories"
        v-model.number="newGoal.calories"
        min="0"
        max="15000"
        required
      />

      <q-input
        filled
        label="Kohlenhydrate"
        color="green"
        type="number"
        id="carbs"
        v-model.number="newGoal.carbs"
        min="0"
        max="5000"
        required
      />

      <q-input
        filled
        label="Protein"
        color="green"
        type="number"
        id="protein"
        v-model.number="newGoal.protein"
        min="0"
        max="5000"
        required
      />

      <q-input
        filled
        label="Fett"
        color="green"
        type="number"
        id="fat"
        v-model.number="newGoal.fat"
        min="0"
        max="5000"
        required
      />
      <div class="AddButton">
        <q-btn
          rounded
          color="green"
          icon="add"
          round
          type="submit"
          padding="10px"
        >
        </q-btn>
      </div>
    </form>

    <form v-else @submit.prevent="updateGoal">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="newGoal.name" required />
      <label for="calories">Kalorien:</label>
      <input
        type="number"
        id="calories"
        v-model.number="newGoal.calories"
        min="0"
        max="5000"
        required
      />
      <label for="carbs">Kohlenhydrate:</label>
      <input
        type="number"
        id="carbs"
        v-model.number="newGoal.carbs"
        min="0"
        max="5000"
        required
      />
      <label for="protein">Protein:</label>
      <input
        type="number"
        id="protein"
        v-model.number="newGoal.protein"
        min="0"
        max="5000"
        required
      />
      <label for="fat">Fett:</label>
      <input
        type="number"
        id="fat"
        v-model.number="newGoal.fat"
        min="0"
        max="5000"
        required
      />
      <q-btn rounded color="green" icon="update" type="submit"></q-btn>
      <q-btn rounded color="green" icon="cancel" @click="cancelEdit"></q-btn>
    </form>

    <ul v-if="goal" style="margin-top: 40px">
      <li>
        {{ goal.name }} - {{ goal.calories }} Kalorien
        <q-btn
          rounded
          color="green"
          icon="edit"
          @click="editGoal(goal)"
        ></q-btn>
        <q-btn
          rounded
          color="green"
          icon="delete"
          @click="deleteGoal(goal)"
        ></q-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      goal: localStorage.Goal || {
        name: Goal,
        calories: 1800,
        carbs: 250,
        protein: 80,
        fat: 50,
      },
      newGoal: {
        id: null,
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      editMode: false,
      editGoalIndex: null,
      name: "Mein Ziel", //bei Veränderung wird der Seitentitel automatisch angepasst
    };
  },
  created() {
    this.loadGoal();
  },
  methods: {
    loadGoal() {
      const savedGoal = window.localStorage.getItem("Goal");
      if (savedGoal) {
        this.goal = JSON.parse(savedGoal);
      }
    },
    saveGoal() {
      this.goal = {
        id: Date.now(),
        name: this.newGoal.name,
        calories: this.newGoal.calories,
        carbs: this.newGoal.carbs,
        protein: this.newGoal.protein,
        fat: this.newGoal.fat,
      };
      window.localStorage.setItem(
        "Goal",
        JSON.stringify({
          id: Date.now(),
          name: this.newGoal.name,
          calories: this.newGoal.calories,
          carbs: this.newGoal.carbs,
          protein: this.newGoal.protein,
          fat: this.newGoal.fat,
        })
      );
      this.resetForm();
    },
    addGoal() {
      // raus
      //if (this.goal.length > 0) {
      if (true) {
        // Nur ein Ziel erlaubt, überschreibt das vorhandene Ziel
        //this.goal.splice(0, 1, {
        this.goal = {
          id: Date.now(),
          name: this.newGoal.name,
          calories: this.newGoal.calories,
          carbs: this.newGoal.carbs,
          protein: this.newGoal.protein,
          fat: this.newGoal.fat,
        };
      }
      /* } else {
        // Kein vorhandenes Ziel, fügt das neue Ziel hinzu
        this.goal.push({
          id: Date.now(),
          name: this.newGoal.name,
          calories: this.newGoal.calories,
          carbs: this.newGoal.carbs,
          protein: this.newGoal.protein,
          fat: this.newGoal.fat,
        });
      } */
      this.saveGoal();
      this.resetForm();
    },
    updateGoal() {
      //raus
      const updatedGoal = {
        id: this.newGoal.id,
        name: this.newGoal.name,
        calories: this.newGoal.calories,
        carbs: this.newGoal.carbs,
        protein: this.newGoal.protein,
        fat: this.newGoal.fat,
      };
      this.goal.splice(0, 1, updatedGoal);
      this.saveGoal();
      this.cancelEdit();
      this.resetForm();
    },
    deleteGoal() {
      // raus bzw. ändern
      /* this.goal.splice(0, 1);
      this.saveGoal();
 */
      this.goal = {};
    },
    editGoal(Goal) {
      // raus bzw. ändern || wurde geändert
      // this.editMode = true; das ist nicht nötig - raus
      this.editGoalIndex = 0;
      this.newGoal = { ...Goal };
    },
    cancelEdit() {
      // ändern resetForm
      this.editMode = false;
      this.editGoalIndex = null;
      this.resetForm();
    },
    resetForm() {
      this.newGoal = {
        id: null,
        name: "",
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
.Eingabebereich {
  position: absolute;
  width: 90%;
  top: 300px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.AddButton {
  position: absolute;
  width: 90%;
  top: 300px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
