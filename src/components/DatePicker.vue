<template>
  <div>
    <q-btn flat icon="arrow_back" color="green" @click="decreaseDate"> </q-btn>

    {{ selectedDate.toLocaleDateString() }}

    <q-btn flat icon="arrow_forward" color="green" @click="increaseDate">
    </q-btn>

    <q-btn color="green" round name="event" icon="event" class="cursor-pointer">
      <q-popup-proxy
        @before-show="updateProxy"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date v-model="date" today-btn>
          <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
          <q-btn
            v-close-popup
            label="Speichern"
            color="primary"
            flat
            @click="saveDate"
          ></q-btn>
        </q-date>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const date = ref(new Date()); // heutiges Datum

    return {
      date, //
    };
  },

  data() {
    return {
      selectedDate: new Date(), // gibt das Tagesdatum an
    };
  },

  methods: {
    decreaseDate() {
      const currentDate = new Date(this.selectedDate); // neue Daums-Instanz

      currentDate.setDate(currentDate.getDate() - 1); // verringert das heutige Datum um einen Tag
      this.selectedDate = currentDate; // Update; currentDate wird zum selectedDate
    },

    increaseDate() {
      const currentDate = new Date(this.selectedDate);

      currentDate.setDate(currentDate.getDate() + 1); // erhöht das heutige Datum um einen Tag
      this.selectedDate = currentDate; // Update; currentDate wird zum selectedDate
    },

    saveDate() {
      const [year, month, day] = this.date.split("/");

      const format = new Date(year, month - 1, day);

      console.log(format);

      this.selectedDate = format;
      this.$emit("newDate", this.selectedDate);
    },

    getDate() {
      return this.selectedDate;
    },

    updateProxy() {},
  },
});
</script>
