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
    <q-page-container>
      <div class="row">
        <div class="col col-1"></div>
        <div class="col col-10 text-center self-center">
          <ul style="padding-top: 50px">
            <li
              v-for="meal in mealsOfTheDay"
              :key="meal.id"
              @click="deleteMeal(meal)"
            >
              {{ meal.name }} Kalorien: {{ meal.calories }} Kohlenhydrate:
              {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
              {{ meal.fat }}
              <q-btn round color="green" icon="delete"></q-btn>
            </li>
          </ul>
        </div>
        <div class="col col-1"></div>
      </div>
    </q-page-container>

    <div></div>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import DatePicker from "src/components/DatePicker.vue";

export default defineComponent({
  components: {
    DatePicker,
  },
  data() {
    return {
      toggle: true,
      pageName: "Logbuch", // bei Veränderung ändert sich der Seitentitel automatisch
      meals: JSON.parse(localStorage.getItem("meals")) || [],
      mealsOfTheDay: [],
      goal: JSON.parse(localStorage.getItem("Goal")),
      dailyConsumption: JSON.parse(
        window.localStorage.getItem("dailyConsumption")
      ) || {
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
      console.log(this.date);
      this.filterMeals();
    },
    deleteMeal(meal) {
      const index = this.meals.indexOf(meal);
      if (index !== -1) {
        this.meals.splice(index, 1);
        window.localStorage.setItem("meals", JSON.stringify(this.meals));
      }

      this.dailyConsumption = {
        calories: this.dailyConsumption.calories - meal.calories,
        carbs: this.dailyConsumption.carbs - meal.carbs,
        protein: this.dailyConsumption.protein - meal.protein,
        fat: this.dailyConsumption.fat - meal.fat,
      };
      console.log(this.goal);
      this.setDailyConsumption();
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify(this.dailyConsumption)
      );
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
      this.mealsOfTheDay = filteredMeals;
    },
  },
});
</script>

<style>
.meals-list {
  position: absolute;

  margin-top: 5em;
}

.date-picker {
  position: absolute;
  z-index: 999;
}

#tageszusammenfassung {
  bottom: 100px;
}
</style>
