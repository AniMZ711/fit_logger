<template>
  <q-header class="stickyHeader"> <!--header ist nicht scrollbar-->
    <q-toolbar>
      <q-btn flat to="/profil" icon="arrow_back" />
      <q-toolbar-title class="absolute-center"> {{ pageName }}</q-toolbar-title>
      <!--Anzeige des Titels; Variable aus dem Script-->
    </q-toolbar>
  </q-header>

  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-select filled v-model="single" :options="options.daten" label="Zeitraum" style="width: 250px" color="black"
        bg-color="green">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-select filled v-model="multiple" multiple :options="options.werte" label="Daten" style="width: 250px"
        color="black" bg-color="green">
        <template v-slot:prepend>
          <q-icon name="addchart" />
        </template>
      </q-select>
    </div>
  </div>

  <div>
    <q-checkbox v-model = "showProtein" label = "Eiweiß" />
    <q-checkbox v-model = "showFat" label = "Fett" />
    <q-checkbox v-model = "showCarbs" label = "Kohlenhydrate" />
  </div>

  <div>
      <h2>Statistik für den Zeitraum:</h2>
      <p>Startdatum: {{ dateRange.startDate }}</p>
      <p>Enddatum: {{ dateRange.endDate }}</p>
    </div>
  
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>


<script>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

export default {
  setup() {
    //Referenzen für Datenbereich und ausgewählte Optionen
    const dateRange = ref({
      startDate: subtractDays(new Date(), 6), // Startdatum = Aktuelles Datum - 6 Tage
      endDate: new Date() // Enddatum = Aktuelles Datum
    });

    const single =  ref(null);
    //const multiple = ref(null);
    const showProtein = ref(true);
    const showFat = ref(true);
    const showCarbs = ref(true);

    function subtractDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result.toISOString().split("T")[0];
    }

    //Funktion zum Generieren der X-Achsenbeschriftungen
    function getLabels() {
      const labels = [];
      const startDate = new Date(dateRange.value.startDate);
      const endDate = new Date(dateRange.value.endDate);

      //Schleife zum durchlaufen der Daten
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        labels.push(date.toISOString().split("T")[0]);
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

      let chartInstance = null; //zum zurücksetzen des Charts damit ein neues angezeigt werden kann
      let maxDataValue = 0; // Maximalwert der Daten

      function createChart(ctx) {
        if (chartInstance) {
        chartInstance.destroy();
        }

      const chartData = {
        labels: getLabels(), //Beschriftung der x-achse, basierend auf dem gewählten datum
        datasets: [] //leeres Array für die Datensätze des Diagramms
        };
          //ProteinData, fatData und carbdata noch ändern (max fragen welche Variablen es in der DB sind pro Tag)
      if (showProtein) {
        const proteinData = [50, 100, 150, 200, 300, 350]; //noch beispieldaten
        chartData.datasets.push({
          label: "Eiweiß",
          data: proteinData,
          borderColor: "red",
          fill: false
        });
        maxDataValue = Math.max(maxDataValue, Math.max(...proteinData)); //aktualisiert den maximalen Datenwert
      }

      if (showFat) {
        const fatData = [30, 70, 90, 120, 180, 200]; //noch beispieldaten
        chartData.datasets.push({
          label: "Fett",
          data: fatData,
          borderColor: "green",
          fill: false
        });
        maxDataValue = Math.max(maxDataValue, Math.max(...fatData));  //aktualisiert den maximalen Datenwert
      }

      if (showCarbs) {
        const carbsData = [80, 150, 200, 250, 350, 400]; //noch beispieldaten
        chartData.datasets.push({
          label: "Kohlenhydrate",
          data: carbsData,
          borderColor: "blue",
          fill: false
        });
        maxDataValue = Math.max(maxDataValue, Math.max(...carbsData));  //aktualisiert den maximalen Datenwert
      }

      const chartOptions = {
        scales: {
          y: { //Einstellung für y-achse
            title: {
              display: true,
              text: "Gramm"
            },
          ticks: {
            stepSize: calculateStepSize(maxDataValue) //Schrittgrößenberechnung der y-Achse basierend auf dem maximalen Datenwerten
          }
        },
          x: { // Einstellung für x-achse
            title: {
              display: true,
              text: "Tag"
            }
          }
        }
      };

      chartInstance = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions
      });
    }

    function calculateStepSize(maxValue) {
      const steps = Math.ceil(maxValue / 5); //Schritte berechnen indem der maximale Wert durch 5 geteilt wird (5 damit eine gute Verteilung auf der y-achse ist)
      const magnitude = Math.pow(10, Math.floor(Math.log10(steps))); //Größenordnung der Schritte bestimmen mit 10er Potenz damit es gut lesbar ist
      const magnitudeValue = steps / magnitude; //Berechnet den Wert der Zehnerpotenz
      let stepSize = 1; //Ist auf 1 gesetzt damit immmer ein minimale Schrittgröße vorhanden ist

      if (magnitudeValue > 5) { //Schrittgröße basierend auf der Größenordnung anpassen
        stepSize = 10 * magnitude;
      } else if (magnitudeValue > 2) {
        stepSize = 5 * magnitude;
      } else if (magnitudeValue > 1) {
        stepSize = 2 * magnitude;
      }

      return stepSize;
    }

    // Überwachen der Änderungen von ausgewählten Optionen des Zeitraums
    watch(single, (singleVal) => {
      console.log("Dropdown-Option ausgewählt:", singleVal); //prüfen ob es auf benutzerinteraktion reagiert

      if (singleVal === "letzte Woche") {
        dateRange.value = {
          startDate: subtractDays(new Date(), 6),
          endDate: new Date(),
        };
      }
      else if (singleVal === "letzte 2 Wochen") {
          dateRange.value = {
            startDate: subtractDays(new Date(), 13),
            endDate: new Date(),
          };
        }
      else if (singleVal === "letzter Monat") {
          const currentDate = new Date();
          const startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() -1, 1);
          const endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
          dateRange.value = {
            startDate: startMonth.toISOString().split("T")[0],
            endDate: endMonth.toISOString().split("T")[0],
          };
        }
    });

    return {
      pageName: "Statistik",
      single,
      options: {
        daten: ["letzte Woche", "letzte 2 Wochen", "letzter Monat",],
        werte: ["Kalorien", "Eiweiß", "Fett", "Kohlenhydrate"],
      },
      dateRange,
      showProtein,
      showFat,
      showCarbs
    };
  }
};
</script>

<style scoped>
#chart {
  height: 100px;
}
</style>