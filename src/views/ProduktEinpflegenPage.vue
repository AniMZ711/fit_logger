<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Produkt einpflegen</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Produkt einpflegen </ion-title>
          </ion-toolbar>
        </ion-header>
        
        <ion-button color="success">
          <ion-icon aria-hidden="true"/>
          <router-link to="/tabs/produkt-erstellen" tag="button">Produkt erstellen</router-link>
        </ion-button>

        <ion-button color="success">
        
          <ion-icon aria-hidden="true"/>
          <router-link to="/tabs/essen-erstellen" tag="button">Standard-Mahlzeit erstellen</router-link>
        
      </ion-button>

      <ion-item>
      <ion-input label="Name:" placeholder="Wie heißt die Mahlzeit?" :clear-input="true"></ion-input>
    </ion-item> 

        <ExploreContainer name="Produkte hinzufügen" />

      </ion-content>
    </ion-page>


  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent , IonIcon} from '@ionic/vue';
  
  </script>
  