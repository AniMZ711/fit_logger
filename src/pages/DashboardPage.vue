<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title
        >

        <q-space> </q-space>
        <q-btn position="right" color="green" to="/greetingspage">
          About
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <h1>Hallo, Name!</h1>

        <div class="DashboardAnzeige">
          <div class="offeneKalKreis">
            <q-circular-progress
              rounded
              :value="goal.calories / goal.calories"
              show-value
              size="80px"
              color="green"
              track-color="grey"
              class="q-ma-md"
            >
              <!-- das muss noch gerundet werden -->
              {{ dailyConsumption.calories / goal.calories }} %
            </q-circular-progress>

            <br />

            <p class="anzeigeGesamteZielKalorien">
              {{ dailyConsumption.calories }} / {{ goal.calories }} kcal
            </p>
          </div>

          <div class="progressBarKohlenhydrate">
            Kohlenhydrate {{ dailyConsumption.carbs }}/{{ goal.carbs }} g

            <q-linear-progress
              :value="dailyConsumption.carbs / goal.carbs"
              :label="Kohlenhydrate"
              color="green"
              track-color="grey"
              size="small"
              rounded="true"
            >
            </q-linear-progress>
          </div>

          <br />

          <div class="progressBarEiweiss">
            Eiweiss {{ dailyConsumption.protein }}/{{ goal.protein }} g

            <q-linear-progress
              :value="dailyConsumption.protein / goal.protein"
              :label="Eiweiss"
              color="green"
              track-color="grey"
              size="small"
              rounded="true"
            >
            </q-linear-progress>
          </div>

          <br />

          <div class="progressBarFett">
            Fett {{ dailyConsumption.fat }}/{{ goal.fat }} g

            <q-linear-progress
              :value="dailyConsumption.fat / goal.fat"
              :label="Fett"
              color="green"
              track-color="grey"
              size="small"
              rounded="true"
            >
            </q-linear-progress>
          </div>
        </div>

        <div class="anzeigeMahlzeiten" v-if="true">
          <q-responsive :ratio="16 / 9" v-if="false">
            <q-table
              dense
              flat
              bordered
              title="Letzte Mahlzeiten"
              :rows="rows"
              :columns="columns"
              row-key="name"
              align="left"
            >
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

        <div></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

// columns und rows können entfernt werden
/* const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "kcal", align: "left", label: "kcal", field: "kcal", sortable: true },
  {
    name: "fat",
    align: "left",
    label: "Fat (g)",
    field: "fat",
    sortable: true,
  },
  { name: "carbs", align: "left", label: "Carbs (g)", field: "carbs" },
  { name: "protein", align: "left", label: "Protein (g)", field: "protein" },
];

const rows = [
  {
    name: "Mahlzeit1",
    kcal: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },

  {
    name: "Mahlzeit2",
    kcal: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
]; */

export default defineComponent({
  // kann entfernt werden
  /*loadGoal() {
    const savedGoal = window.localStorage.getItem("Goal");
    if (savedGoal) {
    const goalData = JSON.parse(savedGoal);
    this.goal = goalData.goal;
    this.zielGesamtKcal = goalData.zielGesamtKcal;
    this.zielKohlenhydrate = goalData.zielKohlenhydrate;
    this.zielEiweiss = goalData.zielEiweiss;
    this.zielFett = goalData.zielFett;
  }
},*/
  setup() {
    return {
      pageName: "Dashboard",

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
  position: absolute;
  width: 135px;
  height: 33px;
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
