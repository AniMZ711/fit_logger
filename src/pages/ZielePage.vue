<template>
  <q-header class="stickyHeader">
    <!-- Header ist nicht scrollbar-->
    <q-toolbar>
      <q-btn flat to="/profil" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <!-- Eingabebreich zur Ziel-Bearbeitung mit einzelnen Eingabefeldern: -->
  <div class="EingabebereichZielBearbeiten">
    <form v-if="true" @submit.prevent="saveGoal">
      <q-input
        filled
        v-if="false"
        label="Name"
        color="green"
        type="text"
        id="name"
        v-model="newGoal.name"
        required
        :disable="!editMode"
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
        :disable="!editMode"
      />

      <q-input
        filled
        label="Kohlenhydrate in Gramm"
        color="green"
        type="number"
        id="carbs"
        v-model.number="newGoal.carbs"
        min="0"
        max="5000"
        required
        :disable="!editMode"
      />

      <q-input
        filled
        label="Protein in Gramm"
        color="green"
        type="number"
        id="protein"
        v-model.number="newGoal.protein"
        min="0"
        max="5000"
        required
        :disable="!editMode"
      />

      <q-input
        filled
        label="Fett in Gramm"
        color="green"
        type="number"
        id="fat"
        v-model.number="newGoal.fat"
        min="0"
        max="5000"
        required
        :disable="!editMode"
      />
      
      <!-- Buttons zum Speichern/Abbrechen/Bearbeiten: -->
      <div class="Buttons">
        <q-btn
          v-if="editMode"
          rounded
          color="green"
          icon="save"
          type="submit"
          padding="10px"
          size="lg"
        >
          Speichern
        </q-btn>

        <q-btn
          v-if="editMode"
          rounded
          style="margin-right: 16px; padding: 10px"
          color="green"
          icon="cancel"
          @click="cancelEdit()"
          size="lg"
        >
          Abbrechen
        </q-btn>

        <q-btn
          v-if="!editMode"
          rounded
          color="green"
          icon="build"
          @click="editMode = true"
          size="lg"
        >
          Ziel bearbeiten
        </q-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      goal: {},
      newGoal: {
        id: null,
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      dailyConsumption: JSON.parse(localStorage.getItem("dailyConsumption")),
      editMode: true,
      pageName: "Mein Tagesziel", //bei Veränderung wird der Seitentitel automatisch angepasst
    };
  },
  created() {
    this.loadGoal();
  },
  methods: {
    loadGoal() {
      if (window.localStorage.getItem("Goal")) {
        this.newGoal = JSON.parse(window.localStorage.getItem("Goal"));
        this.goal = { ...this.newGoal };
      } else {
        this.newGoal = {
          name: "Goal",
          calories: 1800,
          carbs: 250,
          protein: 80,
          fat: 50,
        };
        this.goal = { ...this.newGoal };
        window.localStorage.setItem("Goal", JSON.stringify(this.newGoal));
      }
    },
    saveGoal() {
      window.localStorage.setItem("Goal", JSON.stringify(this.newGoal));
      this.goal = { ...this.newGoal };
      this.editMode = false;
      this.setDailyConsumption();
    },
    cancelEdit() {
      this.newGoal = { ...this.goal };
      this.editMode = false;
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
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
    },
    calculateCaloriesValue(dailyConsumptionValue, goalValue) {
      return Math.round((dailyConsumptionValue / goalValue) * 100);
    },
    calculateOtherValues(dailyConsumptionValue, goalValue) {
      return parseFloat(dailyConsumptionValue / goalValue);
    },
  },
});
</script>

<style>
/* Positionierung des Eingabereichs: */
.EingabebereichZielBearbeiten {
  position: fixed;
  width: 90%;
  top: 15em;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

/* Positionierung der Buttons: */
.Buttons {
  margin-top: 2em;
  text-align: center;
}
</style>
