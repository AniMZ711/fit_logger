<template>
    <div>
      <h5>Meine aktuellen Tagesziele</h5>
      
        <q-input 
        v-model = "text"
        label="Kalorien"
        />
        <br/>
      
      <q-input 
        v-model = "text"
        label="Eiweiß"
        />
        <br/>
        
        <q-input 
        v-model = "text"
        label="Kolenhydrate"
        />
        <br/>

        <q-input 
        v-model = "text"
        label="Fett"
        />
        <br/>

      <q-btn rounded color="green" icon="save"> speichern </q-btn>
    </div>
  </template>
  
<script>
import { defineComponent } from 'vue'
</script>