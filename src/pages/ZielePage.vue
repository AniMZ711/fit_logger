<template>
  <q-header class="stickyHeader">
    <!-- Header ist nicht scrollbar-->
    <q-toolbar>
      <q-btn flat to="/profil" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div class="Eingabebereich1">
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
        label="Kohlenhydrate"
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
        label="Protein"
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
        label="Fett"
        color="green"
        type="number"
        id="fat"
        v-model.number="newGoal.fat"
        min="0"
        max="5000"
        required
        :disable="!editMode"
      />
      <div class="AddButton">
        <q-btn
          v-if="editMode"
          rounded
          style="margin-right: 16px; padding: 10px"
          color="green"
          icon="cancel"
          @click="cancelEdit()"
        ></q-btn>

        <q-btn
          v-if="!editMode"
          rounded
          color="green"
          icon="edit"
          @click="editMode = true"
        ></q-btn>

        <q-btn
          v-if="editMode"
          rounded
          color="green"
          icon="save"
          round
          type="submit"
          padding="10px"
        >
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
    },
    cancelEdit() {
      this.newGoal = { ...this.goal };
      this.editMode = false;
    },
  },
});
</script>

<style>
.Eingabebereich1 {
  position: fixed;
  width: 90%;
  top: 20em;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.AddButton {
  margin-top: 2em;
  text-align: center;
}
</style>
