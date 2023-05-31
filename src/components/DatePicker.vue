<template>
    <div class="q-pa-md">
        <q-btn icon="event" round color="green">
            <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="proxyDate">
                    <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Abbrechen" color="green" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                    </div>
                </q-date>
            </q-popup-proxy>
        </q-btn>
    </div>
</template>
  
<script>
import { ref } from 'vue'

export default {
    setup() {
        const date = ref('2023/05/31')
        const proxyDate = ref('2023/05/31')

        return {
            date,
            proxyDate,

            updateProxy() {
                proxyDate.value = date.value
            },

            save() {
                date.value = proxyDate.value
            }
        }
    },


}
</script>