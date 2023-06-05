<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ pageName }}</q-toolbar-title
        >
        <!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="actionButtons">
          <q-btn
            class="zielButton"
            rounded
            color="green"
            icon="grade"
            to="/ziele"
          >
            Meine Ziel
          </q-btn>

          <q-btn
            class="statistikButton"
            rounded
            color="green"
            icon="auto_graph"
            to="/statistik"
          >
            Statistik
          </q-btn>
        </div>

        <br />
      </q-page>
    </q-page-container>
    ...
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      pageName: "Profil",
    };
  },
});
</script>

<style>
.actionButtons {
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: auto;
  margin-right: auto;
  transform: translate(-50%, -50%);
}

.zielButton {
  margin-top: 10px;
  margin-bottom: 10px;
}

.statistikButton {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
