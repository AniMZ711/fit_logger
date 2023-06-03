<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-btn flat icon="menu_book" color="white"> </q-btn>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title><!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>

    <q-page>
      <div class="DatePicker">
        <DatePicker> </DatePicker>
        <!-- lädt den Component Date Picker aus /src/components/DatePicker.vue und zeigt den Date Picker an-->
      </div>

      <div class="Liste">
        <!--         <q-table title="Mahlzeiten heute"></q-table>
 -->
        <ul style="padding-top: 50px">
          <li v-for="product in meals" :key="product.id">
            <p>
              {{ product.name }} Kalorien: {{ product.calories }} Kohlenhydrate:
              {{ product.carbs }} Proteine: {{ product.protein }} Fett:
              {{ product.fat }}
            </p>
          </li>
        </ul>
      </div>

      <q-separator></q-separator>

      <div class="kreis">
        <q-btn round flat>
          <q-circular-progress fab rounded :value="value" show-value size="60px" color="green" track-color="grey"
            class="q-ma-md" @click="toggle = !toggle">
            {{ value }} %
          </q-circular-progress>

          {{ gesamteKcal }} kcal
        </q-btn>

        <div id="AnzeigeWerte">
          <div v-show="toggle">
            gesamte Kcal x g gesamte Proteine x g gesamte Fett x g gesamte
            Kohlenhydrate x g
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import DatePicker from "src/components/DatePicker.vue";

export default defineComponent({
  components: {
    DatePicker,
  },
  data() {
    return {
      toggle: true,
      pageName: "Logbuch", // bei Veränderung ändert sich der Seitentitel automatisch
      value: 61, //value muss übereinstimmen
      gesamteKcal: 1111,
      meals: JSON.parse(window.localStorage.getItem("products")) || [],
      date: "",
    };
  },
  /*  created() {
    const today =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(today);
    this.date = today;
  }, */
});
</script>

<style>
.Liste {
  position: absolute;
  width: 80%;
  top: 250px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.DatePicker {
  position: absolute;
  top: 100px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.kreis {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
