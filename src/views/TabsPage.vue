

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="homescreen" href="/tabs/homescreen">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Homescreen</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="logbuch" href="/tabs/logbuch">
          <ion-icon aria-hidden="true" :icon ="book"/>
          <ion-label>Logbuch</ion-label>
        </ion-tab-button>

        <ion-tab-button >
           
          <!-- Platzhalter, wird später  it Padding ersetzt -->
          
        </ion-tab-button> 

        
        <ion-fab  bottom> 
          <ion-fab-button color="success" tab="plus_hinzufuegen" href="/tabs/plus_hinzufuegen" >
            <ion-icon :icon="add"> </ion-icon>
           
          </ion-fab-button>
        </ion-fab>
        

        <ion-tab-button tab="Produkte" href="/tabs/produkt_einpflegen">
          <ion-icon aria-hidden="true" :icon="serverOutline" />
          <ion-label>Produkt einpflegen</ion-label>
        </ion-tab-button> 

        <ion-tab-button tab="Profil" href="/tabs/profil">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Profil</ion-label>
        </ion-tab-button> 

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { add, book, ellipse, home, person, square, triangle, addCircleOutline, serverOutline } from 'ionicons/icons';

import { IonFabButton } from '@ionic/vue';
</script>
