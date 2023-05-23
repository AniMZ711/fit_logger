<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="success">
                <ion-title>Produkt hinzufügen</ion-title>
         </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large"> Erstelle Produkt </ion-title>  
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Add page" />
  
        <br /> <br /> 
  <p> Name: </p>
       <input type ="text" placeholder="..."/>
   <br /> 
   
   <p> Marke: </p>
            <input type ="text" placeholder="..."/>
        <br /> 

    <p> Gewicht/Packung </p>
   <input type ="text" placeholder="..."/>
   <br /> 

   <p> Kalorien/100g: </p>
   <input type ="text" placeholder="..."/>
   <br /> 

   <p> Eiweiß/100g: </p>
   <input type ="text" placeholder="..."/>
   <br /> 

   <p> Fett/100g </p>
   <input type ="text" placeholder="..."/>
   <br /> 

   <p> Kohlenhydrate/100g: </p>
   <input type ="text" placeholder="..."/>
   <br /> 

   <br />

   <ion-button color="success" shape="round">
     <router-link to="/tabs/produkt_einpflegen" tag="button">Speichern</router-link>
   </ion-button>

        
        <ButtonTest></ButtonTest>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  
  
  </script>