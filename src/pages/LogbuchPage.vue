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

    <!--Container für den Date Picker-->
    <q-page-container class="q-my-sm">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 text-center self-center">
          <DatePicker @newSelectedDate="setDate"> </DatePicker>
        </div>
        <div class="col-2"></div>
      </div>
    </q-page-container>

    <!--Container für Anzeige der Mahlzeiten des Tages-->
    <q-page-container class="meals-today">
      <!--Reihe Frühstück-->
      <div class="row">
        <div class="col col-2"></div>

        <div class="col col-8 text-center">
          <q-page-container class="meals-today-logbuch">
            <ul class="breakfast-items" style="padding-top: 5px">
              <p>Frühstück</p>

              <li v-for="meal in breakfast" :key="meal.id">
                <details>
                  <summary>
                    {{ meal.name }}
                    <span class="badge"> {{ meal.calories }}kcal</span>
                  </summary>
                  Kalorien: {{ meal.calories }} Kohlenhydrate:
                  {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
                  {{ meal.fat }}
                  <q-btn
                    round
                    color="green"
                    icon="delete"
                    @click="deleteMeal(meal)"
                  >
                  </q-btn>
                  <q-btn
                    round
                    color="green"
                    icon="edit"
                    @click="setUpEditMeal(meal)"
                  >
                  </q-btn>
                </details>
              </li>
            </ul>

            <ul style="padding-top: 50px">
              <p>Mittagessen</p>
              <li v-for="meal in lunch" :key="meal.id">
                <details>
                  <summary>
                    {{ meal.name }}
                    <span class="badge"> {{ meal.calories }}kcal</span>
                  </summary>
                  Kalorien: {{ meal.calories }} Kohlenhydrate:
                  {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
                  {{ meal.fat }}
                  <q-btn
                    round
                    color="green"
                    icon="delete"
                    @click="deleteMeal(meal)"
                  >
                  </q-btn>
                  <q-btn
                    round
                    color="green"
                    icon="edit"
                    @click="setUpEditMeal(meal)"
                  >
                  </q-btn>
                </details>
              </li>
            </ul>
            <ul style="padding-top: 50px">
              <p>Abendessen</p>
              <li v-for="meal in diner" :key="meal.id">
                <details>
                  <summary>
                    {{ meal.name }}
                    <span class="badge"> {{ meal.calories }}kcal</span>
                  </summary>
                  Kalorien: {{ meal.calories }} Kohlenhydrate:
                  {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
                  {{ meal.fat }}
                  <q-btn
                    round
                    color="green"
                    icon="delete"
                    @click="deleteMeal(meal)"
                  >
                  </q-btn>
                  <q-btn
                    round
                    color="green"
                    icon="edit"
                    @click="setUpEditMeal(meal)"
                  >
                  </q-btn>
                </details>
              </li>
            </ul>
            <ul style="padding-top: 50px">
              <p>Snacks</p>
              <li v-for="meal in snacks" :key="meal.id">
                <details>
                  <summary>
                    {{ meal.name }}
                    <span class="badge"> {{ meal.calories }}kcal</span>
                  </summary>
                  Kalorien: {{ meal.calories }} Kohlenhydrate:
                  {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
                  {{ meal.fat }}
                  <q-btn
                    round
                    color="green"
                    icon="delete"
                    @click="deleteMeal(meal)"
                  >
                  </q-btn>
                  <q-btn
                    round
                    color="green"
                    icon="edit"
                    @click="setUpEditMeal(meal)"
                  >
                  </q-btn>
                </details>
              </li>
            </ul>
          </q-page-container>
        </div>
        <div class="col col-2"></div>
      </div>

      <teleport to="body">
        <div class="modal" v-if="editMode">
          <div>
            <div>
              {{ mealToEdit.name }} - {{ mealToEdit.quantity }}g
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
              </q-btn>
              <q-btn rounded color="green" icon="cancel" @click="cancelEdit()">
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
import { ref } from "vue";

export default defineComponent({
  components: {
    DatePicker,
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
      options: ref([
        { text: "Frühstück", value: "Frühstück" },
        { text: "Mittagessen", value: "Mittagessen" },
        { text: "Abendessen", value: "Abendessen" },
        { text: "Snacks", value: "Snacks" },
      ]),
      single: ref(null),
      selectedMealTime: ref("Frühstück"),
      quantity: 100,
      editIndex: 0,
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

    deleteMeal(meal) {
      const index = this.meals.indexOf(meal);
      if (index !== -1) {
        this.meals.splice(index, 1);
        window.localStorage.setItem("meals", JSON.stringify(this.meals));
      }

      this.dailyConsumption = {
        date: this.dailyConsumption.date,
        calories: this.dailyConsumption.calories - meal.calories,
        carbs: this.dailyConsumption.carbs - meal.carbs,
        protein: this.dailyConsumption.protein - meal.protein,
        fat: this.dailyConsumption.fat - meal.fat,
      };
      this.setDailyConsumption();
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
      this.filterMeals();
    },

    setUpEditMeal(meal) {
      this.editIndex = this.meals.indexOf(meal);
      this.dailyConsumption = {
        date: this.dailyConsumption.date,
        calories: this.dailyConsumption.calories - meal.calories,
        carbs: this.dailyConsumption.carbs - meal.carbs,
        protein: this.dailyConsumption.protein - meal.protein,
        fat: this.dailyConsumption.fat - meal.fat,
      };
      this.mealToEdit = { ...meal };
      this.quantity = this.mealToEdit.quantity;
      this.editMode = true;
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
      this.filterMeals();
      this.mealToEdit = {};
      this.editMode = false;
    },

    calculateIngredientValues(quantity) {
      const factor = quantity / this.mealToEdit.quantity;
      this.mealToEdit = {
        name: this.mealToEdit.name,
        date: this.mealToEdit.date,
        time: this.mealToEdit.time,
        quantity: quantity,
        calories: this.mealToEdit.calories * factor,
        carbs: this.mealToEdit.carbs * factor,
        protein: this.mealToEdit.protein * factor,
        fat: this.mealToEdit.fat * factor,
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
      return parseFloat(((dailyConsumptionValue / goalValue) * 100).toFixed(2));
    },

    calculateOtherValues(dailyConsumptionValue, goalValue) {
      return dailyConsumptionValue / goalValue;
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
.meals-today-logbuch {
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
</style>
