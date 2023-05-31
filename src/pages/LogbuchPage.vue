<template>
    <q-layout>



        <q-header>
            <q-toolbar>
                <q-btn flat icon="menu_book" color="white"> </q-btn>
                <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>


            </q-toolbar>
        </q-header>


        <q-page>

            <div class="DatePicker">

                <DatePicker> </DatePicker>

            </div>

            <div class="Liste">

                <q-table title="Mahlzeiten heute"></q-table>









            </div>

            <q-separator></q-separator>





            <div class="kreis">
                <q-btn round flat>
                    <q-circular-progress fab rounded :value="value" show-value size="60px" color="green" track-color="grey"
                        class="q-ma-md" @click='toggle = !toggle'>
                        {{ value }} %

                    </q-circular-progress>

                    {{ gesamteKcal }} kcal

                </q-btn>

                <div id="AnzeigeWerte">
                    <div v-show='toggle'>
                        gesamte Kcal x g
                        gesamte Proteine x g
                        gesamte Fett x g
                        gesamte Kohlenhydrate x g
                    </div>
                </div>
            </div>



        </q-page>


    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'
import DatePicker from 'src/components/DatePicker.vue';




export default defineComponent({

    components: {
        DatePicker,

    },
    data() {


        return {
            toggle: true,
            name: "Logbuch",
            value: 61, //value muss übereinstimmen
            gesamteKcal: 1111

        };
    },

});
</script>


<style>
.Liste {

    position: absolute;
    width: 80%;
    top: 250px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
}

.DatePicker {


    position: absolute;
    top: 100px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
}

.kreis {
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
}
</style>