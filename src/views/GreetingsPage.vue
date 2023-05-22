<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Welcome</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large"> Welcome! </ion-title>  
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Add page" />
  
        Hier kommt die Willkommensnachricht
  
        
        <ButtonTest></ButtonTest>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  
  
  </script>
  