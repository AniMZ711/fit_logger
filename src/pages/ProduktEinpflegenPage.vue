<template>
    <q-layout>

        <q-page-container>
            <q-page>
               
                <p> Produkt Datenbank </p>


                
                <q-btn rounded color="green" icon="search" to="/produktsuchen"> Produkt suchen</q-btn>

                <br><br><br>
                <q-btn rounded color="green" icon="edit" to="/produkterstellen"> Produkt Erstellen</q-btn>

                <br><br><br>
                <q-btn rounded color="green" icon="edit" to="/essenerstellen"> Essen Erstellen</q-btn>

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