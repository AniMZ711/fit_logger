<template>
  <q-layout>

    <q-header class="stickyHeader">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title>

        <q-space> </q-space>
        <q-btn position="right" color="green" to="/greetingspage">
          About
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <h1>Hallo, Name! </h1> <!--hier soll später der Name des Nutzers {{userName}}stehen -->



        <div class="DashboardAnzeige">
          <div class="offeneKalKreis">
            <q-circular-progress rounded :value="goal.calories / goal.calories" show-value color="green"
              track-color="grey" size=" 80px">
              <!-- das muss noch gerundet werden -->
              {{ (dailyConsumption.calories / goal.calories).toFixed(2) }}%
            </q-circular-progress>

            <br />

            <p class="anzeigeGesamteZielKalorien">
              {{ dailyConsumption.calories }} / {{ goal.calories }} kcal
            </p>
          </div>

          <div class="progressBarKohlenhydrate">
            Kohlenhydrate {{ dailyConsumption.carbs }}/{{ goal.carbs }} g

            <q-linear-progress :value="dailyConsumption.carbs / goal.carbs" :label="Kohlenhydrate" color="green"
              track-color="grey" size="small" rounded="true">
            </q-linear-progress>
          </div>

          <br />

          <div class="progressBarEiweiss">
            Eiweiss {{ dailyConsumption.protein }}/{{ goal.protein }} g

            <q-linear-progress :value="dailyConsumption.protein / goal.protein" :label="Eiweiss" color="green"
              track-color="grey" size="small" rounded="true">
            </q-linear-progress>
          </div>

          <br />

          <div class="progressBarFett">
            Fett {{ dailyConsumption.fat }}/{{ goal.fat }} g

            <q-linear-progress :value="dailyConsumption.fat / goal.fat" :label="Fett" color="green" track-color="grey"
              size="small" rounded="true">
            </q-linear-progress>
          </div>
        </div>

        <div class="anzeigeMahlzeiten" v-if="true">
          <q-responsive :ratio="16 / 9" v-if="false">
            <q-table dense flat bordered title="Letzte Mahlzeiten" :rows="rows" :columns="columns" row-key="name"
              align="left">
            </q-table>
          </q-responsive>
          <p>Mahlzeiten</p>
          <ul>
            <li v-for="product in meals" :key="product.id">
              <p>
                {{ product.name }} Kalorien:
                {{ product.calories }} Kohlenhydrate:
                {{ product.carbs }} Proteine: {{ product.protein }} Fett:
                {{ product.fat }}
              </p>
            </li>
          </ul>
        </div>


      </q-page>
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
h1 {
  font-size: 24px;
  position: absolute;
  width: 135px;
  height: 33px;
  left: 30px;
  top: 0px;
}

.offeneKalKreis {
  position: relative;
  size: 80px;
  width: 30vh;
  height: 50px;
  left: 30px;
  top: 90px;
}

.anzeigeGesamteZielKalorien {
  position: absolute;
  width: 135px;
  height: 33px;
  left: 30px;
  top: 109px;
}

.progressBarFett {
  position: absolute;
  width: 160px;
  height: 10px;
  left: 160px;
  top: 180px;
}

.progressBarEiweiss {
  position: absolute;
  width: 160px;
  height: 10px;
  left: 160px;
  top: 140px;
}

.progressBarKohlenhydrate {
  position: absolute;
  width: 160px;
  height: 10px;
  left: 160px;
  top: 100px;
}

.anzeigeMahlzeiten {
  position: absolute;
  margin-top: auto;
  width: 80%;
  top: 400px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
