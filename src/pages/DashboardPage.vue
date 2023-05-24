<template>
    <q-layout>

        <q-page-container>
            <q-page>
                <h1> Hallo, Name!</h1>
                <div class="offeneKalKreis">
                    <q-circular-progress rounded :value="value" show-value size="80px" color="green" track-color="grey"
                        class="q-ma-md" />
                </div>

                <div class=" progressBarKohlenhydrate">

                    Kohlenhydrate

                    <q-linear-progress :value="progressKohlenhydrate" :label="Eiweiss" color="green" track-color="grey"
                        size="small" rounded="true">

                    </q-linear-progress>

                </div>

                <br>

                <div class=" progressBarEiweiss">

                    Eiweiss

                    <q-linear-progress :value="progressEiweiss" :label="Kohlenhydrate" color="green" track-color="grey"
                        size="small" rounded="true">

                    </q-linear-progress>

                </div>

                <br>


                <div class=" progressBarFett">

                    Fett

                    <q-linear-progress :value="progressFett" :label="Fett" color="green" track-color="grey" size="small"
                        rounded="true">

                    </q-linear-progress>

                </div>



            </q-page>
        </q-page-container>
        ...
    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'

// export default defineComponent({
//     name: 'DashboardPage'
// },
// )

export default defineComponent({
    setup() {


        return {
            value: 61,  // gibt den Wert für die Füllung des Progress-Circles 

            progressKohlenhydrate: 0.3, // gibt den Wert für die Füllung des Progress-Bars Kohlenhydrate

            progressEiweiss: 0.5, // gibt den Wert für die Füllung des Progress-Bars Eiweiss

            progressFett: 0.1 // gibt den Wert für die Füllung des Progress-Bars Fett
        }
    },
    name: 'DashboardPage'
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
</style>

