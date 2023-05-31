<template>
    <q-layout>



        <q-header>
            <q-toolbar>
                <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>

                <q-space> </q-space>
                <q-btn position=right color="green" to="/greetingspage"> About </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page>
                <h1> Hallo, Name!</h1>



                <div class="offeneKalKreis">
                    <q-circular-progress rounded :value="value" show-value size="80px" color="green" track-color="grey"
                        class="q-ma-md">
                        {{ value }} %
                    </q-circular-progress>

                    <br>

                    <p class=" anzeigeGesamteZielKalorien"> {{ aktuellGesamtKcal }} / {{ zielGesamteKcal }} kcal </p>

                </div>

                <div class=" progressBarKohlenhydrate">

                    Kohlenhydrate {{ aktuellKohlenhydrate }}/{{ zielKohlenhydrate }} g

                    <q-linear-progress :value="progressKohlenhydrate" :label="Eiweiss" color="green" track-color="grey"
                        size="small" rounded="true">

                    </q-linear-progress>

                </div>

                <br>

                <div class=" progressBarEiweiss">

                    Eiweiss {{ aktuellEiweiss }}/{{ zielEiweiss }} g

                    <q-linear-progress :value="progressEiweiss" :label="Kohlenhydrate" color="green" track-color="grey"
                        size="small" rounded="true">

                    </q-linear-progress>

                </div>

                <br>

                <div class=" progressBarFett">

                    Fett {{ aktuellFett }}/{{ zielFett }} g

                    <q-linear-progress :value="progressFett" :label="Fett" color="green" track-color="grey" size="small"
                        rounded="true">

                    </q-linear-progress>

                </div>

                <div class="q-pa-md">
                    <q-responsive :ratio="1 / 1">
                        <q-table title="Letzte Mahlzeiten" class="my-sticky-table" virtual-scroll
                            v-model:pagination="pagination" :rows-per-page-options="[0]"
                            :virtual-scroll-sticky-size-start="48" row-key="index" :rows="rows" :columns="columns" />
                    </q-responsive>
                </div>

            </q-page>
        </q-page-container>
        ...
    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'

import { ref } from 'vue'



// we generate lots of rows here





export default defineComponent({

    setup() {


        return {
            value: 61,  // gibt den Wert für die Füllung des Progress-Circles 

            zielGesamteKcal: 0.0,

            aktuellGesamtKcal: 0.0,

            progressKohlenhydrate: 0.3, // gibt den Wert für die Füllung des Progress-Bars Kohlenhydrate -> später Funktion integrieren, die den Progress aus Ziel und aktuell berechnet

            progressEiweiss: 0.5, // gibt den Wert für die Füllung des Progress-Bars Eiweiss

            progressFett: 0.1, // gibt den Wert für die Füllung des Progress-Bars Fett

            zielKohlenhydrate: 0.0, // vom User festgelegter Tagesziel-Wert für Kohlenhydrate

            zielEiweiss: 100,   // vom User festgelegter Tagesziel-Wert für Eiweiss

            zielFett: 0.0,  // vom User festgelegter Tagesziel-Wert für Fett

            aktuellKohlenhydrate: 0.0,

            aktuellEiweiss: 0.0,

            aktuellFett: 0.0,

            name: 'Dashboard',









        }
    },

    //die Mahlzeiten müssen importiert werden, damit man sie anzeigen lassen kann

    data() {


    }
})
</script>


<style> h1 {

     font-size: 24px;
     position: absolute;
     width: 135px;
     height: 33px;
     left: 30px;
     top: 0px;
 }

 .offeneKalKreis {

     position: absolute;
     width: 135px;
     height: 33px;
     left: 30px;
     top: 90px;

 }

 .anzeigeGesamteZielKalorien {

     position: absolute;
     width: 135px;
     height: 33px;
     left: 30px;
     top: 109px;


 }

 .progressBarFett {

     position: absolute;
     width: 160px;
     height: 10px;
     left: 160px;
     top: 180px;


 }

 .progressBarEiweiss {

     position: absolute;
     width: 160px;
     height: 10px;
     left: 160px;
     top: 140px;


 }

 .progressBarKohlenhydrate {

     position: absolute;
     width: 160px;
     height: 10px;
     left: 160px;
     top: 100px;


 }

 .q-pa-md {


     position: absolute;
     width: 75%;
     margin-right: 50px;
     margin-left: 50px;
     height: auto;



     top: 300px;

 }
</style>

