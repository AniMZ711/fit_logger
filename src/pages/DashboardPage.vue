<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title>

        <q-space> </q-space>
        <q-btn position="right" color="primary" to="/greetingspage">
          About
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row items-end">
        <div class="column col-2">col</div>

        <div class="column col-8 self-end">
          <p>Hallo Name!</p>
        </div>
      </div>

      <div class="test-container">
        <div class="row">
          <div class="column col-4 self-center">
            <div class="column self-center">
              <div id="AnzeigeKalorienCircleBar" class="q-px-md">
                <!-- die Klassenangeben können bei Quasar/layout nachgelesen werden-->
                <q-circular-progress size="15vh" rounded :value="goal.calories / goal.calories" show-value color="green"
                  track-color="grey" float-right>
                  <!-- Kreisförmige Visualiserung der bereits konsumierten Kalorien-->
                  <!-- das muss noch gerundet werden -->
                  {{ (dailyConsumption.calories / goal.calories).toFixed(2) }}%
                </q-circular-progress>
              </div>

              <div class="column self-center">
                <p>
                  {{ dailyConsumption.calories }} / {{ goal.calories }} kcal

                  <!-- Verhältnisanzeige aus konsumierten und noch offenen täglichen Kalorien-->
                </p>
              </div>
            </div>
          </div>
          <div class="column  col-8 makros"> <!-- Bereich für die Makro Anzeige-->

            <div class="row"> <!--Reihe 1 Makros-->
              <div class="column col-2">

              </div>
              <div class="column col-9">
                <div id="AnzeigeKohlenhydrate" class="q-px-sm">
                  <!-- Anzeige Kohlenhydrate-->
                  Kohlenhydrate {{ dailyConsumption.carbs }}/{{ goal.carbs }} g
                  <q-linear-progress class="progress-bar" :value="dailyConsumption.carbs / goal.carbs"
                    :label="Kohlenhydrate" color="green" track-color="grey" size="medium" rounded="true">
                  </q-linear-progress>

                </div>
              </div>

            </div>

            <div class="row"><!--Reihe 2 Makros-->
              <div class="column col-2">

              </div>
              <div class="column col-9 ">
                <div id="AnzeigeEiweiss" class="q-px-sm">
                  Eiweiss {{ dailyConsumption.protein }}/{{ goal.protein }} g
                  <q-linear-progress class="progress-bar" :value="dailyConsumption.protein / goal.protein"
                    :label="Eiweiss" color="green" track-color="grey" size="medium" rounded="true">
                  </q-linear-progress>

                </div>
              </div>
            </div>

            <div class="row "> <!--Reihe 3 Makros-->
              <div class="column col-2">

              </div>
              <div class="column col-9">

                <div id="AnzeigeFett" class=" q-px-sm ">
                  <!-- Anzeige Fett-->
                  Fett {{ dailyConsumption.fat }}/{{ goal.fat }} g
                  <q-linear-progress class="progress-bar" :value="dailyConsumption.fat / goal.fat" :label="Fett"
                    color="green" track-color="grey" size="medium" rounded="true">
                  </q-linear-progress>

                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </q-page-container>




    <!-- Container für die Anzeige der letzen Mahlzeiten-->

    <q-page-container id="AnzeigeLetzteMahlzeiten"
      class="q-pa-sm full-width column wrap justify-around items-stretch content-stretch">
      <div class="self-center">
        <p id="letzteMahlzeiten">Letzte Mahlzeiten</p>
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

      //columns,

      //rows,

      meals: JSON.parse(window.localStorage.getItem("products")),

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
      },
    };
  },

  //die Mahlzeiten müssen importiert werden, damit man sie anzeigen lassen kann
});
</script>

<style>
#displayUsername {
  text-align: center;
  font-size: clamp(1.5rem, 0.8182rem + 2.9091vw, 3rem);

  /* color: blue; */
}




.row {
  border: 1px solid red;
}

.column {
  border: 1px solid red;
}

#AnzeigeKohlenhydrate,
#AnzeigeEiweiss,
#AnzeigeFett {

  /* padding-bottom: -2em; */
  margin-bottom: -3em;
}

.progress-bar {
  margin-top: -0.5em;
}



#AnzeigeKalorienCircleBar {
  overflow: hidden;

  top: 200px;
}

#AnzeigeLetzteMahlzeiten {
  min-width: 21em;
  margin-top: 4em;
}

#letzteMahlzeiten {
  text-align: center;
  font-size: 1.5em;
}


.makros {

  font-size: 14px;
  text-align: center;
}
</style>
