<template>
  <q-header class="stickyHeader">
    <!-- Header ist nicht scrollbar-->
    <q-toolbar>
      <q-btn flat to="/profil" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>
  <div class="Eingabebereich">
    <form v-if="true" @submit.prevent="addGoal">
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
          v-if="!editMode"
          rounded
          color="green"
          icon="add"
          round
          type="submit"
          padding="10px"
        >
        </q-btn>
        <q-btn
          v-if="editMode"
          rounded
          color="green"
          icon="update"
          @click="addGoal()"
        ></q-btn>
        <q-btn
          v-if="editMode"
          rounded
          color="green"
          icon="cancel"
          @click="cancelEdit()"
        ></q-btn>
      </div>
    </form>

    <ul style="margin-top: 40px">
      <li>
        {{ this.goal.name }} - {{ this.goal.calories }} Kalorien
        <q-btn rounded color="green" icon="edit" @click="editGoal()"></q-btn>
        <q-btn
          v-if="false"
          rounded
          color="green"
          icon="update"
          @click="resetGoal(goal)"
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
      goal: {},

      newGoal: {
        id: null,
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
      editMode: false,
      pageName: "Mein Ziel", //bei Veränderung wird der Seitentitel automatisch angepasst
    };
  },
  created() {
    this.loadGoal();
  },
  methods: {
    loadGoal() {
      if (window.localStorage.getItem("Goal")) {
        this.goal = JSON.parse(window.localStorage.getItem("Goal"));
      } else {
        window.localStorage.setItem(
          "Goal",
          JSON.stringify({
            id: Date.now(),
            name: "Goal",
            calories: 1800,
            carbs: 250,
            protein: 80,
            fat: 50,
          })
        );
        this.goal = {
          id: Date.now(),
          name: "Goal",
          calories: 1800,
          carbs: 250,
          protein: 80,
          fat: 50,
        };
      }
    },
    saveGoal() {
      this.goal = { ...this.newGoal };
      window.localStorage.setItem("Goal", JSON.stringify(this.newGoal));
      this.resetForm();
    },
    addGoal() {
      this.goal = { ...this.newGoal };
      this.saveGoal();
      this.editMode = false;
      this.resetForm();
    },
    resetGoal() {
      this.goal = {
        id: Date.now(),
        name: "Goal",
        calories: 1800,
        carbs: 250,
        protein: 80,
        fat: 50,
      };
    },
    editGoal() {
      this.newGoal = { ...this.goal };
      this.editMode = true;
    },
    cancelEdit() {
      this.editMode = false;
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
