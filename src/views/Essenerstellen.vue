<template>
    <ion-page>
      <ion-header>
             <ion-toolbar color="success">
                <ion-title>Standard-Mahlzeit erstellen</ion-title>
            </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large"> Erstelle Standard-Mahlzeit </ion-title>  
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Add page" />
  
        <h1 color="success"> Bitte gebe die Daten der Mahlzeit ein: </h1>
  
       
       <p> Gebe den Namen ein: </p>
            <input type ="text" placeholder="Name"/>
        <br /> 
        
        <p> Gebe die Kalorien ein: </p>
        <input type ="text" placeholder="Kalorien"/>
        <br /> 


        <p> Gebe das Gewicht ein: </p>
        <input type ="text" placeholder="Gewicht"/>
        <br /> 

        <p> Gebe den Eiweigehalt in Gramm ein: </p>
        <input type ="text" placeholder="Eiweiß"/>
        <br /> 

        <p> Gebe den Fettgehalt in Gramm ein: </p>
        <input type ="text" placeholder="Fett"/>
        <br /> 

        <p> Gebe den Kohlenhydratgehalt in Gramm ein: </p>
        <input type ="text" placeholder="Kohlenhydrate"/>
        <br /> 

        <br />

        <ion-button color="success" shape="round">
          <router-link to="/tabs/produkt_einpflegen" tag="button">Speichern</router-link>
        </ion-button>


        <br /><br /><br /><br />
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