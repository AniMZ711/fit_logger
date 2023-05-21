<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"> Add </ion-title>  
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Add page" />

      test blabla

      <h1> Hier kommt der Testbutton</h1>
      <ButtonTest></ButtonTest>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';



</script>
