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
      <h2>Statistik für den Zeitraum:</h2>
      <p>Startdatum: {{ dateRange.startDate }}</p>
      <p>Enddatum: {{ dateRange.endDate }}</p>
    </div>
  
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>




<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
export default {
  setup() {
    //Referenzen für Datenbereich und ausgewählte Optionen
    const dateRange = ref({
      startDate: subtractDays(new Date(), 6), // Startdatum = Aktuelles Datum - 6 Tage
      endDate: new Date() // Enddatum = Aktuelles Datum
    });

    function subtractDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result.toISOString().split("T")[0];
    }

    onMounted(() => {
      const ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
        type: "line", //Typ linien Diagramm
        data: {
          labels: getLabels(), //X-Achsenbeschriftung
          datasets: [
            {
              label: "Gramm",
              data: [50, 100, 150, 200, 250, 300, 350],
              borderColor: "blue",
              fill: false //keine Füllung
            }
          ]
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: "Gramm" //Titel der X-Achse
              },
              ticks: {
                stepSize: 50 //Schritte der X-Achse
              }
            },
            x: {
              title: {
                display: true,
                text: "Tag" //Titel der X-Achse
              }
            }
          }
        }
      });
    });
    
    return {
      pageName: "Statistik",
      single: ref(null),
      multiple: ref(null),
      options: {
        daten: [
          "letzte Woche",
          "letzte 2 Wochen",
          "letzter Monat",
          "letztes Jahr",
        ],
        werte: ["Kalorien", "Proteine", "Fett", "Zucker"],
      },
      dateRange
    };

    //Funktion zum generieren der X-Achsenbeschriftungen
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
  },
};
</script>




<style scoped>
#chart {
  height: 400px;
}
</style>