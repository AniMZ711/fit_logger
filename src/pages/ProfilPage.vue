<template>
    <q-layout>

        <q-header>
            <q-toolbar>

                <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page>



                <q-btn rounded color="green" icon="grade" to="/ziele"> Meine Ziele </q-btn>


                <br><br><br>

                <q-btn rounded color="green" icon="auto_graph" to="/statistik"> Statistik </q-btn>


                <br />
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
            name: 'Profil'

        }


    }



})
</script>