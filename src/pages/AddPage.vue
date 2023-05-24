<template>
    <q-layout>

        <q-page-container>
            <q-page>
                <h1> Das ist die AddProdukt (Plus) Page</h1>

                <div class="q-pa-md flex flex-center">
                    <q-circular-progress rounded :value="value" size="50px" color="orange" class="q-ma-md" />
                </div>
            </q-page>
        </q-page-container>

    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AddPage'
})
</script>

