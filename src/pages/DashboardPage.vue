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
    <!--Container für den Progress Circle mit Anzeige-->

    <!-- <h1>Hallo, Name! </h1> -->
    <!--hier soll später der Name des Nutzers {{userName}}stehen -->

    <q-page-container class="fit column wrap justify-start items-center content-center">


      <div id="AnzeigeKalorienCircleBar" class="self-center q-pt-lg q-px-md">
        <!-- die Klassenangeben können bei Quasar/layout nachgelesen werden-->
        <q-circular-progress size="15vh" rounded :value="goal.calories / goal.calories" show-value color="green"
          track-color="grey" float-right>
          <!-- Kreisförmige Visualiserung der bereits konsumierten Kalorien-->
          <!-- das muss noch gerundet werden -->
          {{ (dailyConsumption.calories / goal.calories).toFixed(2) }}%
        </q-circular-progress>
      </div>

      <p class="self-center">
        {{ dailyConsumption.calories }} / {{ goal.calories }} kcal

        <!-- Verhältnisanzeige aus konsumierten und noch offenen täglichen Kalorien-->
      </p>
    </q-page-container>

    <q-page-container class="fit row wrap justify-around items-start content-center">
      <!--Container für die Makro Anzeige-->

      <div id="AnzeigeKohlenhydrate" class="col-xs-5 self-center q-px-md">
        <!-- Anzeige Kohlenhydrate-->
        Kohlenhydrate
        <q-linear-progress :value="dailyConsumption.carbs / goal.carbs" :label="Kohlenhydrate" color="green"
          track-color="grey" size="medium" rounded="true">
        </q-linear-progress>
        {{ dailyConsumption.carbs }}/{{ goal.carbs }} g
      </div>

      <div id="AnzeigeEiweiss" class="col-xs-5 self-center q-px-md">
        <!--Anzeige Eiweiss-->
        Eiweiss
        <q-linear-progress :value="dailyConsumption.protein / goal.protein" :label="Eiweiss" color="green"
          track-color="grey" size="medium" rounded="true">
        </q-linear-progress>
        {{ dailyConsumption.protein }}/{{ goal.protein }} g
      </div>

      <div id="AnzeigeFett" class="col-xs-5 self-center q-px-md">
        <!-- Anzeige Fett-->
        Fett
        <q-linear-progress :value="dailyConsumption.fat / goal.fat" :label="Fett" color="green" track-color="grey"
          size="medium" rounded="true">
        </q-linear-progress>
        {{ dailyConsumption.fat }}/{{ goal.fat }} g
      </div>
    </q-page-container>

    <q-page-container id="AnzeigeLetzteMahlzeiten"
      class="q-pa-sm full-width column wrap justify-around items-stretch content-stretch">
      <!--Container für Anzeige der letzen Mahlzeiten-->

      <div class="self-center">
        <p>Letzte Mahlzeiten</p>
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
#AnzeigeKohlenhydrate,
#AnzeigeEiweiss,
#AnzeigeFett {
  overflow: auto;
  min-width: 350px;
  max-width: 400px;
}

#AnzeigeKalorienCircleBar {
  overflow: hidden;

  top: 200px;
}

h1 {
  font-size: 24px;
  position: absolute;
  width: 135px;
  height: 33px;
  left: 30px;
  top: 0px;
}

#AnzeigeLetzeMahlzeiten {

  min-width: 350px;
  max-width: 95%;
}
</style>
