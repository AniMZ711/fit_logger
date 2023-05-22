<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Produkt erstellen</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large"> Erstelle Produkt </ion-title>  
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Add page" />
  
        <h1> Hier kommt die Produkt erstellen Seite </h1>
  
        
        <ButtonTest></ButtonTest>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  
  
  </script>