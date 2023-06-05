<template>
  <div>
    <q-btn flat icon="arrow_back" color="green"> </q-btn>
    {{ dateAktuell }}
    <q-btn flat icon="arrow_forward" color="green"> </q-btn>

    <q-btn icon="event" round color="green">
      <q-popup-proxy
        @before-show="updateProxy"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date v-model="proxyDate">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Abbrechen" color="green" flat v-close-popup />
            <q-btn
              label="OK"
              color="primary"
              flat
              @click="save"
              v-close-popup
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

const dateAktuell = ref("2023/05/31"); //dieses Datum muss sich mit dem Klick der Buttons verändern
const proxyDate = ref("2023/05/31");

export default defineComponent({
  setup() {
    return {
      dateAktuell,
      proxyDate,
      updateProxy() {
        proxyDate.value = dateAktuell.value;
      },
      save() {
        dateAktuell.value = proxyDate.value;
      },
    };
  },
  methods: {
    decrease() {
      let newDate = dateAktuell.value;
      dateAktuell.value.subtractFromDate(newDate, { days: 1 });
    },
  },
});
</script>
