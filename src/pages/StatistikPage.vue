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
        </template>
      </q-select>
    </div>
  </div>
</template>

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
