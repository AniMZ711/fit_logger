<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>

        <q-btn icon="arrow_back" position="right" color="green" to="/dashboard">
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="home">
        <h1>Willkommen!</h1>
        <br />
        <br />
        <br />
        <p>Danke, dass du dich für den FIT-Logger entschieden hast!</p>
        <p>
          Der FIT-Logger hilft dir, deine Ernährung zu überwachen & zu planen.
        </p>
        <p>Du kannst zu Beginn Kalorien- & Makroziele eingeben</p>
        <p>& anschließend deine Mahlzeiten eintragen</p>
        <p>Anhand deiner Eingaben wird sowohl eine Historie,</p>
        <p>in der du nachvollziehen kannst, wann du was gegessen hast,</p>
        <p>als auch eine Statistik erstellt, in der du sehen kannst,</p>
        <p>ob und wie sehr du von deinen gesetzten Zielen abweichst.</p>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      pageName: "About",
    };
  },
});
</script>
