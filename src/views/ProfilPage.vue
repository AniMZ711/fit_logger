<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Profil</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Profil </ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Profil" />
       
       
        <ion-button color="success">
          <ion-icon aria-hidden="true" :icon="star" />
         Meine Ziele
        </ion-button>
    <ion-button>Statistik</ion-button>

   

    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      
        <componentButton> Button </componentButton>
   
   
  </ion-content>
  </ion-page>
</template>


  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent , IonIcon} from '@ionic/vue';
  import { add, book, ellipse, home, person, square, triangle, addCircleOutline, serverOutline, star } from 'ionicons/icons';


   import('@/components/ButtonTest.vue');

  </script>
  