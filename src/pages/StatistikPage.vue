<template>
  <q-header>
    <q-toolbar>
      <q-btn to="/profil" icon="arrow_back" />
      <q-toolbar-title> {{ name }}</q-toolbar-title>
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
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      name: "Statistik",
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
