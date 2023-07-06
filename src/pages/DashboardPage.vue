<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title
        >

        <q-space> </q-space>
        <q-btn
          class="no-ripple"
          label="about"
          flat
          position="right"
          color="white"
          icon-right="info_outline"
          @click="about = true"
          style="z-index: 999"
        >
          <!-- About Page, öffnet sich beim klicken des Buttons-->
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="about">
      <q-card>
        <q-btn
          class="absolute"
          style="top: 10px; right: 10px"
          flat
          icon="close"
          color="primary"
          v-close-popup
        />

        <div class="row text-center q-pt-sm">
          <div class="col col-2"></div>
          <div class="col col-8">
            <p>Willkommen!</p>
          </div>
          <div class="col col-2"></div>
        </div>

        <div class="row text-center q-px-lg q-ma-sm">
          <div clas="col col-2"></div>
          <div clas="col col-8 about-text">
            Danke, dass du dich für den FIT-Logger entschieden hast! Der
            FIT-Logger hilft dir, deine Ernährung zu überwachen & zu planen. Du
            kannst zu Beginn Kalorien- & Makroziele eingeben & anschließend
            deine Mahlzeiten eintragen. Anhand deiner Eingaben wird sowohl eine
            Historie, in der du nachvollziehen kannst, wann du was gegessen
            hast, als auch eine Statistik erstellt, in der du sehen kannst, ob
            und wie sehr du von deinen gesetzten Zielen abweichst.
          </div>
          <div clas="col col-2"></div>
        </div>
      </q-card>
    </q-dialog>

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
                <!--Balkendiagramm für die Anzeige des täglichen zu konsumierenden Kohlenhydrate-->
                <div id="AnzeigeKohlenhydrate" class="q-px-sm">
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
                <!--Balkendiagramm für die Anzeige des täglichen Eiweißbedarfs-->
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
                  <!--Balkendiagramm für die Anzeige des täglichen Fettbedarfs-->
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

    <q-page-container class="display-last-meals">
      <div id="rectangle" class="q-mb-lg">
        <p class="text-center self-center last-meals">Letzte Mahlzeiten</p>
      </div>

      <div class="row">
        <div class="col col-1"></div>

        <div class="col col-10 text-center items-center">
          <ul class="dashboard-ul">
            <li
              class="dashboard-li dashboard-meals-list"
              v-for="(product, index) in meals.slice(0, 5)"
              :key="product.id"
              :class="index % 2 === 0 ? 'even' : 'odd'"
            >
              <details>
                <summary>
                  <span class="word"> {{ product.name }}</span>
                  <span class="badge"> {{ product.calories }} kcal </span>
                </summary>
                Kalorien: {{ product.calories }} | Kohlenhydrate:
                {{ product.carbs }}g | Proteine: {{ product.protein }}g | Fett:
                {{ product.fat }}g
              </details>
            </li>
          </ul>
        </div>
        <div class="col col-1"></div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    return {
      about: ref(false),
      pageName: "Dashboard", // bei Veränderung ändert sich der Seitentitel automatisch

      meals: JSON.parse(window.localStorage.getItem("meals")) || [],

      goal: JSON.parse(window.localStorage.getItem("Goal")) || {
        calories: 2400,
        carbs: 340,
        protein: 80,
        fat: 80,
      },

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
    };
  },
  created() {
    //dailyConsumption
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (window.localStorage.getItem("dailyConsumption")) {
      const tempDaily = JSON.parse(
        window.localStorage.getItem("dailyConsumption")
      );
      if (tempDaily.date != date) {
        window.localStorage.setItem(
          "dailyConsumption",
          JSON.stringify({
            date: date,
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            caloriesPercentage: 0,
            carbsPercentage: 0,
            proteinPercentage: 0,
            fatPercentage: 0,
          })
        );
        this.dailyConsumption = JSON.parse(
          window.localStorage.getItem("dailyConsumption")
        );
      }
    } else {
      window.localStorage.setItem(
        "dailyConsumption",
        JSON.stringify({
          date: date,
          calories: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          caloriesPercentage: 0,
          carbsPercentage: 0,
          proteinPercentage: 0,
          fatPercentage: 0,
        })
      );
      this.dailyConsumption = JSON.parse(
        window.localStorage.getItem("dailyConsumption")
      );
    }
    //goal
    if (!window.localStorage.getItem("Goal")) {
      window.localStorage.setItem(
        "Goal",
        JSON.stringify({
          name: "Goal",
          calories: 1800,
          carbs: 250,
          protein: 80,
          fat: 50,
        })
      );
    }
  },

  //die Mahlzeiten müssen importiert werden, damit man sie anzeigen lassen kann
});
</script>

<style>
.dashboard-li {
  list-style-type: none;
  padding-left: 0;
  transform: translateX(-1.25em);
}

.dashboard-ul {
  list-style-type: none;
  padding-left: 0;
}

.even {
  background-color: #bbbbbb7c;
}

.odd {
  background-color: white;
}

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

.last-melas {
  z-index: 999;
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
  /* font-size: clamp(1.5rem, 0.8182rem + 2.9091vw, 3rem); */

  margin-top: -3.5em;
}

.makros {
  font-size: 14px;
  text-align: center;
}
</style>
