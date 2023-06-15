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
        <div class="col col-1"></div>

        <div class="col col-10 text-center self-center">
          <ul style="padding-top: 50px">
            <p>Frühstück</p>
            <li
              v-for="meal in breakfast"
              :key="meal.id"
              @click="deleteMeal(meal)"
            >
              {{ meal.name }} Kalorien: {{ meal.calories }} Kohlenhydrate:
              {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
              {{ meal.fat }}
              <q-btn round color="green" icon="delete"></q-btn>
            </li>
          </ul>
          <ul style="padding-top: 50px">
            <p>Mittagessen</p>
            <li v-for="meal in lunch" :key="meal.id" @click="deleteMeal(meal)">
              {{ meal.name }} Kalorien: {{ meal.calories }} Kohlenhydrate:
              {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
              {{ meal.fat }}
              <q-btn round color="green" icon="delete"></q-btn>
            </li>
          </ul>
          <ul style="padding-top: 50px">
            <p>Abendessen</p>
            <li v-for="meal in diner" :key="meal.id" @click="deleteMeal(meal)">
              {{ meal.name }} Kalorien: {{ meal.calories }} Kohlenhydrate:
              {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
              {{ meal.fat }}
              <q-btn round color="green" icon="delete"></q-btn>
            </li>
          </ul>
          <ul style="padding-top: 50px">
            <p>Snacks</p>
            <li v-for="meal in snacks" :key="meal.id" @click="deleteMeal(meal)">
              {{ meal.name }} Kalorien: {{ meal.calories }} Kohlenhydrate:
              {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
              {{ meal.fat }}
              <q-btn round color="green" icon="delete"></q-btn>
            </li>
          </ul>
        </div>
      </div>
    </q-page-container>
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

.meals-today {
  margin-top: -2em;
}

/* .row {

  border-style: dashed;
}

.col {

  border-style: dashed;
} */
</style>
