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

  <!-- Code damit die Linien als Graph angezeigt werden können -->
  <div class="control-section">
    <div align='center'>
        <ejs-chart style='display:block' :theme='theme' align='center' id='chartcontainer' :title='title' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis'
            :tooltip='tooltip' :chartArea='chartArea' :width='width' :legendSettings='legend'>
            <e-series-collection>
                <e-series :dataSource='seriesData' type='Line' xName='Period' yName='//definiert, welches Datenfeld für den Y-Wert verwendet werden soll' name='Eiweiß' opacity=1 width=2 :marker='circleMarker'> </e-series>
                <e-series :dataSource='seriesData' type='Line' xName='Period' yName='//' name='Fett' opacity=1 width=2 :marker='triangleMarker'> </e-series>
                <e-series :dataSource='seriesData' type='Line' xName='Period' yName='//' name='Kohlenhydrate' opacity=1 width=2 :marker='diamondMarker'> </e-series>
                <e-series :dataSource='seriesData' type='Line' xName='Period' yName='//' name='Kcal' opacity=1 width=2 :marker='rectangleMarker'> </e-series>
            </e-series-collection>
        </ejs-chart>
    </div>

  </div>
</template>
<style scoped>

</style>

<script>
import { ref } from "vue";
export default {
  setup() {
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
    };
  },
};
</script>

<!-- alles überprüfen ob es normal angezeigt werden kann -->
<script>
//Importe um über vue das Diagramm zu erstellen
import Vue from "vue";
import { Browser } from '@syncfusion/ej2-base';
import { ChartPlugin, LineSeries, Legend, Tooltip,DateTime, Category, Highlight } from "@syncfusion/ej2-vue-charts";

Vue.use(ChartPlugin);

let selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

export default Vue.extend({
  data: function() {
    return {
      theme: theme,
      seriesData: [
      { Period : new Date(2012, 1, 1), Can_Growth : 13.5, Viet_Growth : 5.3, Mal_Growth : 5.6, Egy_Growth : 6.6, Ind_Growth : 2.3 },
    ],
      //Initialisierung X Achse
      primaryXAxis: {
        valueType: "DateTime",
        edgeLabelPlacement: "Shift",
        majorGridLines: { width: 0 },
        labelFormat: 'dd',
        intervalType: 'Days'
      },
      //Initialisierung Y Achse
      primaryYAxis: {
        title: 'Gramm',
        minimum: 0,
        maximum: 500,
        interval: 50,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
      },
      chartArea: {
        border: {
          width: 0
        }
      },
      width : Browser.isDevice ? '100%' : '75%',
      circleMarker: { visible: true, height: 7, width: 7 , shape: 'Circle' , isFilled: true },
      triangleMarker: { visible: true, height: 6, width: 6 , shape: 'Triangle' , isFilled: true },
      diamondMarker: {  visible: true, height: 7, width: 7 , shape: 'Diamond' , isFilled: true  },
      rectangleMarker: { visible: true, height: 5, width: 5 , shape: 'Rectangle' , isFilled: true },
      pentagonMarker: { visible: true, height: 7, width: 7 , shape: 'Pentagon' , isFilled: true },
      tooltip: {
        enable: true,
      },
      legend: {enableHighlight : true},
      title: "Verlauf der gewählten Nährwerte"
    };
  },
  provide: {
    chart: [LineSeries, Legend, Tooltip, Category,DateTime, Highlight]
  },
  methods: {
  }
   
});
</script>