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
    });

      let chartInstance = null; //zum zurücksetzen des Charts damit ein neues angezeigt werden kann

      function createChart(ctx) {
        if (chartInstance){
          chartInstance.destroy(); //destroyen des Charts damit canvas neu genutzt werden kann
        }

        const chartData = {
          labels: getLabels(), //Y-Achsenbeschriftung
          datasets: [
            {
              label: "Gramm",
              data: [50, 100, 150, 200, 300, 350],
              borderColor: "blue",
              fill: false //keine Füllung des Diagramms
            }
          ]
        };

      const chartOptions = {
        scales: {
          y: {
            title: {
              display: true,
              text:"Gramm" //Titel y-achse
            },
            ticks: {
              stepSize: 50 //schritte der y-achse
            }
          },
          x: {
            title: {
              display: true,
              text: "Tag" //title x-achse
            }
          }
        }
      };

      // erstellen des Diagramms
      chartInstance = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions
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
        werte: ["Kalorien", "Proteine", "Fett", "Zucker"],
      },
      dateRange
    };
  }
};
</script>

<style scoped>
#chart {
  height: 100px;
}
</style>