<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-button color="success">
        
        <ion-icon aria-hidden="true"/>
        <router-link to="/tabs/greetings-page" tag="button">About this App</router-link>
      
    </ion-button>

      
      <q-circular-progress :value="80"/>


      <button> </button>
      <ExploreContainer name="Dashboard/Homescreen" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

</script>
