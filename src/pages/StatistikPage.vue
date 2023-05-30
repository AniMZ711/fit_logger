<template>
  <div>
    <h5>Statistik</h5>
  </div>

  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-select
        filled
        v-model="single"
        :options="options[0]"
        label="Zeitraum"
        style="width: 250px"
      />

      <q-select
        filled
        v-model="multiple"
        multiple
        :options="options[1]"
        label="Daten"
        style="width: 250px"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      single: ref(null),
      multiple: ref(null),
      options: [
        ["letzte Woche", "letzte 2 Wochen", "letzter Monat", "letztes Jahr"],
        ["Kalorien", "Proteine", "Fett", "Zucker"],
      ],
    };
  },
};
</script>
