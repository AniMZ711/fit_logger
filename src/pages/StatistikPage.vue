<template>
  <q-header class="stickyHeader">
    <!--header ist nicht scrollbar-->
    <q-toolbar>
      <q-btn flat to="/profil" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-select
        filled
        v-model="single"
        :options="options.daten"
        label="Zeitraum"
        style="width: 250px"
        color="black"
        bg-color="green"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
          <!-- Dropdown für Auswahl des Zeitraums-->
        </template>
      </q-select>

      <q-select
        filled
        v-model="multiple"
        multiple
        :options="options.werte"
        label="Daten"
        style="width: 250px"
        color="black"
        bg-color="green"
      >
        <template v-slot:prepend>
          <q-icon name="addchart" />
          <!-- Dropdown für Auswahl des Datenarten-->
        </template>
      </q-select>
    </div>
  </div>

  <div>
    <!-- Checkboxen für die Auswahl-->
    <q-checkbox v-model="showProtein" label="Eiweiß" />
    <q-checkbox v-model="showFat" label="Fett" />
    <q-checkbox v-model="showCarbs" label="Kohlenhydrate" />
  </div>

  <div>
    <h3>Statistik für den Zeitraum:</h3>
  </div>

  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import {
  QBtn,
  QToolbarTitle,
  QToolbar,
  QHeader,
  QIcon,
  QSelect,
  QCheckbox,
} from "quasar";

export default {
  setup() {
    const single = ref("");

    const showProtein = ref(true); //Damit die Checkboxen ausgewählt sind als default
    const showFat = ref(true);
    const showCarbs = ref(true);
    const showKcal = ref(false);

    //Referenzen für Datenbereich und ausgewählte Optionen
    const dateRange = ref({
      startDate: subtractDays(new Date(), 6), // Startdatum = Aktuelles Datum - 6 Tage
      endDate: new Date(), // Enddatum = Aktuelles Datum
    });

    const fatData = ref([]); //Referenz für alle Werte
    const proteinData = ref([]);
    const carbsData = ref([]);
    const kcalData = ref([]);
    let chartInstance = null; //zum zurücksetzen des Charts damit ein neues angezeigt werden kann
    let maxDataValue = 0; // Maximalwert der Daten

    function subtractDays(date, days) {
      //Zum Subtrahieren von x-Tagen von dem aktuellen Datum
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result.toISOString().split("T")[0];
    }

    function formatXAxisLabel(date) {
      const formattedDate = new Date(date);
      const day = String(formattedDate.getDate()).padStart(2, "0");
      const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
      return `${day}.${month}`;
    }

    //Funktion zum Generieren der X-Achsenbeschriftungen
    function getLabels() {
      const labels = [];
      const startDate = new Date(dateRange.value.startDate);
      const endDate = new Date(dateRange.value.endDate);

      //Schleife zum durchlaufen der Daten
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        labels.push(formatXAxisLabel(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return labels;
    }

    //Funktion wird verwendet sobald die Komponente montiert wurde (Zeitpunkt an dem das DOM (document object Model)-Element der Komponente bereit ist auf dem Bildschirm angezeigt zu werden),
    onMounted(() => {
      const ctx = document.getElementById("chart").getContext("2d");
      createChart(ctx);

      //Überwache Änderungen an dateRange und erstelle das Diagramm neu
      watch(dateRange, () => {
        createChart(ctx);
      });

      watch(showProtein, () => {
        createChart(ctx);
      });

      watch(showFat, () => {
        createChart(ctx);
      });

      watch(showCarbs, () => {
        createChart(ctx);
      });
    });

    function calculateStepSize(maxValue) {
      const stepSizes = [25, 50]; //hierdruch wird ermöglicht, eine vordefinierte Auswahl an Schrittgrößen zu haben, aus der die Funktion wählen kann
      const maxSteps = 7;
      const maxStepValue = Math.ceil(maxValue / maxSteps);
      let stepSize = 1; //wird verwendet wenn kein anderer Wert gefunden wird

      for (const size of stepSizes) {
        //Dient dazu eine geeignete Schrittgröße zu finden indem sie geprüft wird ob maxStepValue kleiner oder gleich der aktuellen size ist
        if (maxStepValue <= size) {
          // wird hiermit erreicht
          stepSize = size;
          break;
        }
      }
      return stepSize;
    }

    function createChart(ctx) {
      // Überprüfung, ob bereits eine Chart-Instanz existiert, um sie zurückzusetzen
      if (chartInstance) {
        chartInstance.destroy();
      }
      // Abfrage der Daten aus dem Webstorage
      const storedData = JSON.parse(localStorage.getItem("meals")) || []; //JSon parse to list, damit es iterable wird
      const dataValues = Object.values(storedData);

      proteinData.value = [];
      fatData.value = [];
      carbsData.value = [];
      kcalData.value = [];

      // Iteration über die gespeicherten Daten im Webstorage
      for (const data of dataValues) {
        fatData.value.push(meal.fat);
        proteinData.value.push(meal.protein);
        carbsData.value.push(meal.carbs);
        kcalData.value.push(meal.kcal);
      }

      const chartData = {
        labels: getLabels(), //Beschriftung der x-achse, basierend auf dem gewählten datum
        datasets: [], //leeres Array für die Datensätze des Diagramms
      };

      if (showProtein.value) {
        //Überprüfung, ob die Checkbox für Eiweiß ausgewählt ist
        chartData.datasets.push({
          label: "Eiweiß",
          data: proteinData.value,
          borderColor: "red",
          fill: false,
        });
        maxDataValue = Math.max(maxDataValue, Math.max(...proteinData.value)); //aktualisiert den maximalen Datenwert
      }

      if (showFat.value) {
        chartData.datasets.push({
          label: "Fett",
          data: fatData.value,
          borderColor: "green",
          fill: false,
        });
        maxDataValue = Math.max(maxDataValue, Math.max(...fatData.value));
      }

      if (showCarbs.value) {
        chartData.datasets.push({
          label: "Kohlenhydrate",
          data: carbsData.value,
          borderColor: "blue",
          fill: false,
        });
        maxDataValue = Math.max(maxDataValue, Math.max(...carbsData.value));
      }

      if (showKcal.value) {
        chartData.datasets.push({
          label: "kcal",
          data: kcalData.value,
          borderColor: "orange",
          fill: false,
        });
        maxDataValue = Math.max(maxDataValue, Math.max(...kcalData.value));
      }

      const chartOptions = {
        scales: {
          y: {
            //Einstellung für y-achse
            title: {
              display: true,
              text: "Gramm",
            },
            ticks: {
              stepSize: calculateStepSize(maxDataValue), //Schrittgrößenberechnung der y-Achse basierend auf dem maximalen Datenwerten
            },
          },
          x: {
            // Einstellung für x-achse
            title: {
              display: true,
              text: "Tag",
            },
          },
        },
      };

      if (showKcal.value) {
        chartOptions.scales.y.ticks.stepSize = calculateStepSize(
          maxDataValue * 2
        );
      }

      chartInstance = new Chart(ctx, {
        //Erstellung des Chart mit den Daten und Optionen
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    }

    // Überwachen der Änderungen von ausgewählten Optionen des Zeitraums
    watch(single, (singleVal) => {
      console.log("Dropdown-Option ausgewählt:", singleVal); //prüfen ob es auf benutzerinteraktion reagiert

      if (singleVal === "letzte Woche") {
        dateRange.value = {
          startDate: subtractDays(new Date(), 6),
          endDate: new Date(),
        };
      } else if (singleVal === "letzte 2 Wochen") {
        dateRange.value = {
          startDate: subtractDays(new Date(), 13),
          endDate: new Date(),
        };
      } else if (singleVal === "letzter Monat") {
        const currentDate = new Date();
        const startMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
        const endMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );
        dateRange.value = {
          startDate: startMonth.toISOString().split("T")[0],
          endDate: endMonth.toISOString().split("T")[0],
        };
      }

      if (singleVal === "Kalorien") {
        showProtein.value = false;
        showFat.value = false;
        showCarbs.value = false;
        showKcal.value = true;
      } else {
        showProtein.value = true;
        showFat.value = true;
        showCarbs.value = true;
        showKcal.value = false;
      }
    });

    return {
      pageName: "Statistik",
      single,
      options: {
        daten: ["letzte Woche", "letzte 2 Wochen", "letzter Monat"],
        werte: ["Kalorien", "Eiweiß", "Fett", "Kohlenhydrate"],
      },
      dateRange,
      showProtein,
      showFat,
      showCarbs,
      showKcal,
    };
  },
};
</script>

<style>
.DropdownZeitraum {
  margin-top: 2em;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

.DropdownDaten {
  margin-top: 2em;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
