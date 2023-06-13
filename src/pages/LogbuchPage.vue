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

    <!-- Page, weil click events nicht durchgelassen werden -->
    <q-page v-if="false">
      <q-page-container
        class="date-picker fit self-center row wrap justify-center items-start content-start"
      >
        <div id="rectangle" class="fixed q-pa-md q-mb-lg">
          <DatePicker v-model="date"> </DatePicker>
        </div>

        <!-- lädt den Component Date Picker aus /src/components/DatePicker.vue und zeigt den Date Picker an-->
      </q-page-container>

      <q-page-container
        class="meals-list q-pa-sm full-width column wrap justify-around items-stretch content-stretch"
      >
        <div id="Liste" class="self-center q-pt-lg q-px-md">
          <ul style="padding-top: 50px">
            <li v-for="meal in meals" :key="meal.id" @click="deleteMeal(meal)">
              {{ meal.name }} Kalorien: {{ meal.calories }} Kohlenhydrate:
              {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
              {{ meal.fat }}
              <q-btn rounded color="green" icon="delete"></q-btn>
            </li>
          </ul>
        </div>
      </q-page-container>

      <q-separator></q-separator>

      <q-page-container>
        <q-page-sticky id="tageszusammenfassung" class="fixed-bottom">
          <div class="kreis">
            <q-btn round flat>
              <q-circular-progress
                fab
                rounded
                :value="dailyConsumption.caloriesPercentage"
                show-value
                size="60px"
                color="green"
                track-color="grey"
                class="q-ma-md"
                @click="toggle = !toggle"
              >
                {{ dailyConsumption.caloriesPercentage }} %
              </q-circular-progress>

              {{ dailyConsumption.calories }} kcal
            </q-btn>

            <div id="AnzeigeWerte">
              <div v-show="!toggle">
                gesamte Kcal x g gesamte Proteine x g gesamte Fett x g gesamte
                Kohlenhydrate x g
              </div>
            </div>
          </div>
        </q-page-sticky>
      </q-page-container>
    </q-page>
    <ul style="padding-top: 50px">
      <li v-for="meal in meals" :key="meal.id" @click="deleteMeal(meal)">
        {{ meal.name }} Kalorien: {{ meal.calories }} Kohlenhydrate:
        {{ meal.carbs }} Proteine: {{ meal.protein }} Fett:
        {{ meal.fat }}
        <q-btn rounded color="green" icon="delete"></q-btn>
      </li>
    </ul>
    <div class="fixed-bottom">
      <div class="kreis">
        <q-btn round flat>
          <q-circular-progress
            fab
            rounded
            :value="dailyConsumption.caloriesPercentage"
            show-value
            size="60px"
            color="green"
            track-color="grey"
            class="q-ma-md"
            @click="toggle = !toggle"
          >
            {{ dailyConsumption.caloriesPercentage }} %
          </q-circular-progress>

          {{ dailyConsumption.calories }} kcal
        </q-btn>

        <div id="AnzeigeWerte">
          <div v-show="!toggle">
            gesamte Kcal x g gesamte Proteine x g gesamte Fett x g gesamte
            Kohlenhydrate x g
          </div>
        </div>
      </div>
    </div>
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
  /* created() {
    this.meals = JSON.parse(localStorage.getItem("meals"));
  }, */
  methods: {
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
