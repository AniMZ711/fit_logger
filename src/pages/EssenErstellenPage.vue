<template>
    <q-layout>

        <q-page-container>
            <q-page>
                <h1> Das ist die Essen erstellen Seite </h1>


                <br/><br/>
                <p> Name: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Gesamtgewicht: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Kalorien/100g: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Eiweiß/100g: </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Fett/100g </p>
                <input type="text" placeholder="..." />
                <br />

                <p> Kohlenhydrate/100g: </p>
                <input type="text" placeholder="..." />
                <br />
                <br />

                <q-btn color="green" to="/produkteinpflegen"> Speichern </q-btn>
            </q-page>
        </q-page-container>

    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'EssenErstellenPage'
})
</script>