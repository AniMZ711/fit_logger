<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title
        >

        <q-space> </q-space>
        <q-btn position="right" color="primary" to="/greetingspage">
          About
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-sm">
      <div class="row items-center">
        <div class="column col-1"></div>

        <div class="column col-8 self-center q-pb-md">
          <div class="display-user-name">Hallo Name!</div>
        </div>
      </div>

      <div class="test-container">
        <div class="row self-end">
          <div class="column col-4">
            <div class="column self-end progress-circle-container q-pl-md">
              <div id="AnzeigeKalorienCircleBar" class="circle-progress">
                <q-circular-progress
                  size="15vh"
                  rounded
                  :value="dailyConsumption.caloriesPercentage"
                  show-value
                  color="green"
                  track-color="grey"
                  float-right
                >
                  <!-- Kreisförmige Visualiserung der bereits konsumierten Kalorien-->
                  <!-- das muss noch gerundet werden -->
                  {{ dailyConsumption.caloriesPercentage }}%
                </q-circular-progress>
              </div>

              <div class="column self-center">
                {{ dailyConsumption.calories }} / {{ goal.calories }} kcal

                <!-- Verhältnisanzeige aus konsumierten und noch offenen täglichen Kalorien-->
              </div>
            </div>
          </div>

          <div class="column col-8 makros">
            <!-- Bereich für die Makro Anzeige-->

            <div class="row">
              <!--Reihe 1 Makros-->
              <div class="column col-2"></div>
              <div class="column col-9">
                <div id="AnzeigeKohlenhydrate" class="q-px-sm">
                  <!-- Anzeige Kohlenhydrate-->
                  Kohlenhydrate {{ dailyConsumption.carbs }}/{{ goal.carbs }} g
                  <q-linear-progress
                    class="progress-bar"
                    :value="dailyConsumption.carbsPercentage"
                    color="green"
                    track-color="grey"
                    size="medium"
                    rounded="true"
                  >
                  </q-linear-progress>
                </div>
              </div>
            </div>

            <div class="row">
              <!--Reihe 2 Makros-->
              <div class="column col-2"></div>
              <div class="column col-9">
                <div id="AnzeigeEiweiss" class="q-px-sm">
                  Eiweiss {{ dailyConsumption.protein }}/{{ goal.protein }} g
                  <q-linear-progress
                    class="progress-bar"
                    :value="dailyConsumption.proteinPercentage"
                    color="green"
                    track-color="grey"
                    size="medium"
                    rounded="true"
                  >
                  </q-linear-progress>
                </div>
              </div>
            </div>

            <div class="row">
              <!--Reihe 3 Makros-->
              <div class="column col-2"></div>
              <div class="column col-9">
                <div id="AnzeigeFett" class="q-px-sm">
                  <!-- Anzeige Fett-->
                  Fett {{ dailyConsumption.fat }}/{{ goal.fat }} g
                  <q-linear-progress
                    class="progress-bar"
                    :value="dailyConsumption.fatPercentage"
                    color="green"
                    track-color="grey"
                    size="medium"
                    rounded="true"
                  >
                  </q-linear-progress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>

    <q-page-container>
      <p>Letze Mahlzeiten</p>

      <div>
        <ul>
          <li v-for="product in meals" :key="product.id">
            <p>
              {{ product.name }} Kalorien: {{ product.calories }} Kohlenhydrate:
              {{ product.carbs }} Proteine: {{ product.protein }} Fett:
              {{ product.fat }}
            </p>
          </li>
        </ul>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      pageName: "Dashboard", // bei Veränderung ändert sich der Seitentitel automatisch

      meals: JSON.parse(window.localStorage.getItem("meals")),

      goal: JSON.parse(window.localStorage.getItem("Goal")) || {
        calories: 1800,
        carbs: 250,
        protein: 80,
        fat: 50,
      },

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
    };
  },

  //die Mahlzeiten müssen importiert werden, damit man sie anzeigen lassen kann
});
</script>

<style>
.expandable-row:hover .expandable-content {
  display: block;
}

.expandable-content {
  display: none;
}

#AnzeigeKohlenhydrate,
#AnzeigeEiweiss,
#AnzeigeFett {
  margin-bottom: -3em;
}

.progress-circle-container {
  margin-top: 1em;
}

.progress-bar {
  margin-top: -0.5em;
}

.display-user-name {
  margin-top: 0.2em;

  padding: 0.1em;

  font-size: clamp(1.75rem, 1.0682rem + 2.9091vw, 3.25rem);
}

#AnzeigeKalorienCircleBar {
  overflow: hidden;

  top: 200px;
}

.display-last-meals {
  text-align: center;
  font-size: clamp(1.5rem, 0.8182rem + 2.9091vw, 3rem);

  margin-top: -1em;
}

.makros {
  font-size: 14px;
  text-align: center;
}
</style>
