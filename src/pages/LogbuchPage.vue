<template>
  <q-layout>
    <q-header class="stickyHeader">
      <!-- der Header scrollt nicht mit-->
      <q-toolbar>
        <q-btn flat icon="menu_book" color="white"> </q-btn>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title
        ><!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>

    <div class="hilfsline"></div>

    <!--Container für den Date Picker-->
    <q-page-container class="q-my-sm">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 text-center self-center">
          <DatePicker @newSelectedDate="setDate"></DatePicker>
          <q-btn
            v-if="mealEdited"
            round
            color="green"
            icon="edit"
            @click="undoEdit"
          >
            <!-- klick auf den Button öffnet einen Kalender, wo das neue Datum festgelegt werden kann-->
          </q-btn>
        </div>
        <div class="col-2"></div>
      </div>
    </q-page-container>

    <ListComponent
      mealTime="Frühstück"
      :mealList="breakfast"
      :editable="true"
      @edit="setUpEditPopup"
      @delete="setUpDeletePopup"
    ></ListComponent>

    <ListComponent
      mealTime="Mittagessen"
      :mealList="lunch"
      :editable="true"
      @edit="setUpEditPopup"
      @delete="setUpDeletePopup"
    ></ListComponent>

    <ListComponent
      mealTime="Abendessen"
      :mealList="diner"
      :editable="true"
      @edit="setUpEditPopup"
      @delete="setUpDeletePopup"
    ></ListComponent>

    <ListComponent
      mealTime="Snacks"
      :mealList="snacks"
      :editable="true"
      @edit="setUpEditPopup"
      @delete="setUpDeletePopup"
    ></ListComponent>

    <!--Container für Anzeige der Mahlzeiten des Tages-->
    <q-page-container class="meals-today text-center">
      <teleport to="body">
        <div class="modal" v-if="editMode">
          <!-- Edit Mode ist true, wenn auf den Button zur Bearbeitung eines Eintrags gelickt wurde-->
          <div>
            <div>
              {{ mealToEdit.name }} - {{ mealToEdit.quantity }}g
              <!-- Zeigt das zu nearbeitende Produkt an-->
              <br />

              {{ mealToEdit.calories }} kcal, {{ mealToEdit.carbs }}g
              Kohlenhydrate, {{ mealToEdit.protein }}g Protein,
              {{ mealToEdit.fat }}g Fett
            </div>

            <div>
              <q-input
                filled
                color="green"
                label="Menge eintragen (g)"
                id="Menge"
                v-model.number="quantity"
                type="number"
                min="0"
                required
              >
                <!-- hier trägt der User die gewünschte Menge des Produkts in Gramm ein-->
              </q-input>

              <div>
                <select v-model="mealToEdit.time">
                  <option
                    v-for="option in options"
                    :value="option.value"
                    :key="option.text"
                  >
                    {{ option.text }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <q-btn
                rounded
                color="green"
                icon="save"
                @click="calculateIngredientValues(quantity)"
              >
                Speichern
                <!-- Speichert die Änderungen des Eintrags ab, neuer Wert ist im Logbuch zu sehen-->
              </q-btn>
              <q-btn rounded color="green" icon="cancel" @click="cancelEdit()">
                Abbrechen
                <!-- bricht die Bearbeitung des Eintrags ab, Änderungen werden verworfen-->
              </q-btn>
            </div>
          </div>
        </div>
      </teleport>

      <teleport to="body">
        <div v-if="editBool || deleteBool" class="modal">
          <!-- Edit Mode ist true, wenn auf den Button zur Bearbeitung eines Eintrags gelickt wurde-->
          <div>
            <h6 v-if="editBool">Willst du diese Mahlzeit bearbeiten?</h6>
            <p v-if="deleteBool">Willst du diese Mahlzeit löschen?</p>
            <div>
              {{ mealToEdit.time }}
              <br />
              {{ mealToEdit.name }} - {{ mealToEdit.quantity }}g
              <!-- Zeigt das zu nearbeitende Produkt an-->
              <br />

              {{ mealToEdit.calories }} kcal, {{ mealToEdit.carbs }}g
              Kohlenhydrate, {{ mealToEdit.protein }}g Protein,
              {{ mealToEdit.fat }}g Fett
              <p></p>
            </div>
            <div>
              <q-btn rounded color="green" icon="close" @click="resetPopup">
                Abbrechen
                <!-- Speichert die Änderungen des Eintrags ab, neuer Wert ist im Logbuch zu sehen-->
              </q-btn>
              <q-btn
                v-if="deleteBool"
                rounded
                color="green"
                icon="delete"
                @click="deleteMeal"
              >
                Löschen
                <!-- Speichert die Änderungen des Eintrags ab, neuer Wert ist im Logbuch zu sehen-->
              </q-btn>
              <q-btn
                v-if="editBool"
                rounded
                color="green"
                icon="edit"
                @click="setUpEditMeal"
              >
                Bearbeiten
                <!-- bricht die Bearbeitung des Eintrags ab, Änderungen werden verworfen-->
              </q-btn>
            </div>
          </div>
        </div>
      </teleport>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import DatePicker from "src/components/DatePicker.vue";
import ListComponent from "src/components/ListComponent.vue";
import { ref } from "vue";

export default defineComponent({
  components: {
    DatePicker,
    ListComponent,
  },
  data() {
    return {
      toggle: true,
      editMode: false,
      pageName: "Logbuch", // bei Veränderung ändert sich der Seitentitel automatisch
      meals: JSON.parse(localStorage.getItem("meals")) || [],
      /*       mealsOfTheDay: [],
       */
      breakfast: [],
      lunch: [],
      diner: [],
      snacks: [],
      goal: JSON.parse(localStorage.getItem("Goal")),
      dailyConsumption: JSON.parse(
        window.localStorage.getItem("dailyConsumption")
      ) || {
        date: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        caloriesPercentage: 0,
        carbsPercentage: 0,
        proteinPercentage: 0,
        fatPercentage: 0,
      },
      date: "",
      mealToEdit: {},
      editedMeal: {},
      mealEdited: false,
      options: ref([
        { text: "Frühstück", value: "Frühstück" },
        { text: "Mittagessen", value: "Mittagessen" },
        { text: "Abendessen", value: "Abendessen" },
        { text: "Snacks", value: "Snacks" },
      ]),
      single: ref(null),
      selectedMealTime: ref("Frühstück"),
      quantity: 0,
      editIndex: 0,
      deleteBool: false,
      editBool: false,
    };
  },
  created() {
    this.filterMeals();
  },
  methods: {
    setDate(currentDate) {
      const day = currentDate;
      this.date =
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      this.filterMeals();
    },

    deleteMeal() {
      const index = this.meals.indexOf(this.mealToEdit);
      if (index !== -1) {
        this.meals.splice(index, 1);
        window.localStorage.setItem("meals", JSON.stringify(this.meals));
      }

      this.setUpDailyConsumption();

      this.setDailyConsumption();
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
      this.filterMeals();
    },

    setUpEditPopup(meal) {
      this.mealToEdit = { ...meal };
      console.log(this.mealToEdit);
      this.editBool = true;
    },
    setUpDeletePopup(meal) {
      this.mealToEdit = { ...meal };
      console.log(this.mealToEdit);
      this.deleteBool = true;
    },

    resetPopup() {
      this.mealToEdit = {};
      this.deleteBool = false;
      this.editBool = false;
    },

    setUpEditMeal() {
      this.editBool = false;
      const id = this.mealToEdit.id;

      for (let i = 0; i < this.meals.length; i++) {
        if (this.meals[i].id === id) {
          console.log(this.meals[i].id);
          this.editIndex = this.meals.indexOf(this.meals[i]);
          console.log(this.editIndex);
        }
      }

      this.setUpDailyConsumption();

      this.editedMeal = { ...this.mealToEdit };
      this.quantity = this.mealToEdit.quantity;
      this.editMode = true;
    },

    setUpDailyConsumption() {
      if (this.mealToEdit.date == this.dailyConsumption.date) {
        this.dailyConsumption = {
          date: this.dailyConsumption.date,
          calories: this.dailyConsumption.calories - this.mealToEdit.calories,
          carbs: this.dailyConsumption.carbs - this.mealToEdit.carbs,
          protein: this.dailyConsumption.protein - this.mealToEdit.protein,
          fat: this.dailyConsumption.fat - this.mealToEdit.fat,
        };
      }
    },

    cancelEdit() {
      this.dailyConsumption = JSON.parse(
        window.localStorage.getItem("dailyConsumption")
      );
      this.editMode = false;
      this.mealToEdit = {};
    },

    editMeal() {
      if (this.editIndex !== -1) {
        this.meals[this.editIndex] = this.mealToEdit;
        window.localStorage.setItem("meals", JSON.stringify(this.meals));
      }

      if (this.mealToEdit.date == this.dailyConsumption.date) {
        this.dailyConsumption = {
          date: this.dailyConsumption.date,
          calories: this.dailyConsumption.calories + this.mealToEdit.calories,
          carbs: this.dailyConsumption.carbs + this.mealToEdit.carbs,
          protein: this.dailyConsumption.protein + this.mealToEdit.protein,
          fat: this.dailyConsumption.fat + this.mealToEdit.fat,
        };
        this.setDailyConsumption();
        window.localStorage.setItem(
          "dailyConsumption",
          JSON.stringify(this.dailyConsumption)
        );
      }

      this.filterMeals();
      this.editMode = false;
      this.mealEdited = true;
    },

    undoEdit() {
      if (this.editIndex !== -1) {
        this.meals[this.editIndex] = this.editedMeal;
        window.localStorage.setItem("meals", JSON.stringify(this.meals));
      }
      if (this.editedMeal.date == this.dailyConsumption.date) {
        this.dailyConsumption = {
          date: this.dailyConsumption.date,
          calories:
            this.dailyConsumption.calories -
            this.mealToEdit.calories +
            this.editedMeal.calories,
          carbs:
            this.dailyConsumption.carbs -
            this.mealToEdit.carbs +
            this.editedMeal.carbs,
          protein:
            this.dailyConsumption.protein -
            this.mealToEdit.protein +
            this.editedMeal.protein,
          fat:
            this.dailyConsumption.fat -
            this.mealToEdit.fat +
            this.editedMeal.fat,
        };
        this.setDailyConsumption();
        window.localStorage.setItem(
          "dailyConsumption",
          JSON.stringify(this.dailyConsumption)
        );
      }
      this.filterMeals();
      this.mealEdited = false;
    },

    calculateIngredientValues(quantity) {
      const factor = quantity / this.mealToEdit.quantity;
      this.mealToEdit = {
        name: this.mealToEdit.name,
        id: this.mealToEdit.id,
        date: this.mealToEdit.date,
        time: this.mealToEdit.time,
        quantity: quantity,
        calories: Math.round(this.mealToEdit.calories * factor),
        carbs: Math.round(this.mealToEdit.carbs * factor),
        protein: Math.round(this.mealToEdit.protein * factor),
        fat: Math.round(this.mealToEdit.fat * factor),
      };
      console.log(this.mealToEdit);
      this.editMeal();
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
    },

    calculateCaloriesValue(dailyConsumptionValue, goalValue) {
      return Math.round((dailyConsumptionValue / goalValue) * 100);
    },

    calculateOtherValues(dailyConsumptionValue, goalValue) {
      return parseFloat(dailyConsumptionValue / goalValue);
    },

    filterMeals() {
      const filteredMeals = this.meals.filter((meal) => {
        return meal.date.includes(this.date);
      });
      this.breakfast = filteredMeals.filter((meal) => {
        return meal.time.includes("Frühstück");
      });
      this.lunch = filteredMeals.filter((meal) => {
        return meal.time.includes("Mittagessen");
      });
      this.diner = filteredMeals.filter((meal) => {
        return meal.time.includes("Abendessen");
      });
      this.snacks = filteredMeals.filter((meal) => {
        return meal.time.includes("Snacks");
      });
    },
  },
});
</script>

<style>
.todays-items {
  list-style-type: none;
}

.platzhalter {
  background-color: lightgrey;
  list-style-type: none;
  font-display: inherit;
}

.heading-logbuch {
  background-color: #4caf50;
  color: white;
  font-weight: 500;
  font-size: larger;

  margin-top: -2em;
}

.date-picker {
  position: absolute;
  z-index: 999;
}

#tageszusammenfassung {
  bottom: 100px;
}

.meals-today {
  margin-top: -2em;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
}

.meals-today-logbuch {
  margin-right: 2em;
  margin-top: -2em;
}

/* .hilfsline {

  position: fixed;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: red;

  z-index: 9999;


} */
</style>
