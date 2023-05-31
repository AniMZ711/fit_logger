<template>
    <q-layout>

        <q-header>
            <q-toolbar>
                <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>

            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page>
                <h1> Das ist die Logbuch Seite</h1>


                
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
            name: 'Logbuch'

        }
    }

})
</script>