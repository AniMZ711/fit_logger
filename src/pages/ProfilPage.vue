<template>
    <q-layout>

        <q-page-container>
            <q-page>
               
                <p> Profil </p>


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
    name: 'ProfilPage'
})
</script>