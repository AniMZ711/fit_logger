<template>
  <q-page-container class="meals-today text-center">
    <q-page-container class="meals-today-logbuch">
      <ul class="todays-items" style="padding-top: 5px">
        <p class="heading-logbuch">{{ mealTime }}</p>
        <div v-if="mealList.length === 0" class="platzhalter">
          Noch keine Einträge
        </div>
        <!-- checkt auf vorhandene Einträge - wenn kein Eintrag vorhanden ist, wird ein Platzhalter angezeigt-->
        <li
          v-for="(meal, index) in mealList"
          :key="meal.id"
          :class="index % 2 === 0 ? 'even' : 'odd'"
        >
          <!-- Anzeige aller Einträge "Breakfast" in Listenform-->
          <details>
            <summary>
              {{ meal.name }}
              <span class="badge"> {{ meal.calories }}kcal</span>
            </summary>
            Kalorien: {{ meal.calories }} | Kohlenhydrate: {{ meal.carbs }}g |
            Proteine: {{ meal.protein }}g | Fett: {{ meal.fat }}g &nbsp;

            <!-- Schickt Info an Logpage: Mahlzeit löschen -->
            <q-btn
              v-if="editable"
              class="q-ma-sm"
              round
              color="green"
              icon="delete"
              @click="emitDelete(meal)"
            >
            </q-btn>
            <!-- Schickt Info an Logpage: Mahlzeit bearbeiten -->
            <q-btn
              v-if="editable"
              round
              color="green"
              icon="edit"
              @click="emitEdit(meal)"
            >
            </q-btn>
          </details>
        </li>
      </ul>
    </q-page-container>
  </q-page-container>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  props: {
    mealList: Object,
    mealTime: String,
    editable: Boolean,
  },
  methods: {
    emitDelete(meal) {
      this.$emit("delete", meal);
    },
    emitEdit(meal) {
      this.$emit("edit", meal);
    },
  },
});
</script>

<style>
.todays-items {
  list-style-type: none;
}

.platzhalter {
  background-color: lightgrey;
  list-style-type: none;
  font-display: inherit;
}

#tageszusammenfassung {
  bottom: 100px;
}

.meals-today {
  margin-top: -2em;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
}

.even {
  background-color: #bbbbbb7c;
}

.odd {
  background-color: white;
}

.meals-today-logbuch {
  margin-right: 2em;
  margin-top: -2em;
}
</style>
