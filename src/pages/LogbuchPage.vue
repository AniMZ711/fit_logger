<template>
    <q-layout>



        <q-header>
            <q-toolbar>
                <q-btn flat icon="menu_book" color="white"> </q-btn>
                <q-toolbar-title class="absolute-center"> {{ name }}</q-toolbar-title>


            </q-toolbar>
        </q-header>


        <q-page>

            <div class="DatePicker">

                <DatePicker message=" hi"></DatePicker>
            </div>


        </q-page>


    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'
import DatePicker from 'src/components/DatePicker.vue';


export default defineComponent({

    components: {
        DatePicker
    },
    data() {
        return {
            name: "Logbuch",
        };
    },

})
    ;
</script>


<style>
.DatePicker {

    position: absolute;

    top: 50px;

    right: 50px;
}
</style>