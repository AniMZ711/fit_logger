<template>
  <q-layout>
    <q-header class="stickyHeader">
      <!-- der Header scrollt nicht mit-->
      <q-toolbar>
        <q-btn flat icon="menu_book" color="white"> </q-btn>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title
        ><!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>

    <q-page>
      <div class="rectangle">
        <div id="DatePickerLogbuch" class="DatePicker">
          <DatePicker> </DatePicker>
          <!-- lädt den Component Date Picker aus /src/components/DatePicker.vue und zeigt den Date Picker an-->
        </div>
      </div>

      <q-page-container
        class="q-pa-sm full-width column wrap justify-around items-stretch content-stretch"
      >
        <div id="Liste" class="self-center q-pt-lg q-px-md">
          <ul style="padding-top: 50px">
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
      </q-page-container>

      <q-separator></q-separator>

      <q-page-container>
        <q-page-sticky id="tageszusammenfassung" class="fixed-bottom">
          <div class="kreis">
            <q-btn round flat>
              <q-circular-progress
                fab
                rounded
                :value="value"
                show-value
                size="60px"
                color="green"
                track-color="grey"
                class="q-ma-md"
                @click="toggle = !toggle"
              >
                {{ value }} %
              </q-circular-progress>

              {{ gesamteKcal }} kcal
            </q-btn>

            <div id="AnzeigeWerte">
              <div v-show="!toggle">
                gesamte Kcal x g gesamte Proteine x g gesamte Fett x g gesamte
                Kohlenhydrate x g
              </div>
            </div>
          </div>
        </q-page-sticky>
      </q-page-container>
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
#Liste {
  overflow: auto;
  z-index: 1;
}

#DatePickerLogbuch {
  position: fixed;
  top: 10%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.rectangle {
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: white;
  top: 120px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

#tageszusammenfassung {
  bottom: 100px;
}
</style>
