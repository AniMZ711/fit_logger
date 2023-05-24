<template>
    <q-layout>

        <q-page-container>
            <q-page>
                <h1> Das ist die Produkt einpflegen Seite Test</h1>

                <!-- <ion-item>
                    <ion-input label="Suche:" placeholder="Wie heißt die Mahlzeit/ Das Produkt?"
                        :clear-input="true"></ion-input>
                </ion-item> -->


                <q-btn color="green" to="/produkterstellen"> Produkt Erstellen</q-btn>


                <br>
                <br>
                <br>

                <q-btn color="green" to="/essenerstellen"> Essen Erstellen</q-btn>



                <!-- <q-button color="success" shape="round">
                    <router-link to="/essen-erstellen">Standard-Mahlzeit erstellen</router-link>
                </q-button> -->

                <br />
            </q-page>
        </q-page-container>
        ...
    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ProduktEinfplegenPage'
})
</script>