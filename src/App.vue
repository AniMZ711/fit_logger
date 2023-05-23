<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>

  <div id ="app"> 
  </div>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

</script>


<style>
#app {
    text-align: center;
  }
</style>