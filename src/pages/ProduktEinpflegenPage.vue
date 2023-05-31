<template>
    <q-header>
        <q-toolbar>

            <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-layout>

        <q-page-container>
            <q-page>

                <p> Produkt Datenbank </p>



                <q-btn rounded color="green" icon="search" to="/produktsuchen"> Produkt suchen</q-btn>

                <br><br><br>
                <q-btn rounded color="green" icon="edit" to="/produkterstellen"> Produkt/Essen hinzufügen</q-btn>

            </q-page>
        </q-page-container>
        ...
    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({

    setup() {
        return {

            name: 'Produkte'

        }
    }

})
</script>