<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Produkte</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Produkt einpflegen </ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Produkte hinzufügen" />

        <ion-item>
      <ion-input label="Default input" placeholder="Produkt suchen" :clear-input="true"></ion-input>
    </ion-item> 
      </ion-content>
    </ion-page>


  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent , IonIcon} from '@ionic/vue';
  
  </script>
  