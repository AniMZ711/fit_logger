<template>
    <q-header>
        <q-toolbar>

            <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-layout>

        <q-page-container>
            <q-page>



                <div class="actionButtons">
                    <q-btn class="searchButton" rounded color="green" icon="search" to="/produktsuchen"> Produkt
                        suchen</q-btn>


                    <q-btn class="addButton" rounded color="green" icon="edit" to="/produkterstellen"> Produkt/Essen
                        hinzufügen</q-btn>


                </div>



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

<style>
.actionButtons {

    position: absolute;
    top: 100px;
    left: 50%;


    transform: translate(-50%, -50%)
}

.searchButton {

    margin-top: 10px;
    margin-bottom: 10px;
}

.addButton {

    margin-top: 10px;
    margin-bottom: 10px;
}
</style>