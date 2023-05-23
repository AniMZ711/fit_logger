<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="success">
                <ion-title>Willkommen!</ion-title>
            </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large"> Welcome! </ion-title>  
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Add page" />

      <div class = "home" >
        
        <br/> <br/> <br/> <br/> <br/> <br/>
      
        <p style="color: #2fdf75"> 
          Danke, dass du dich für den FIT-Logger entschieden hast! 
          Der FIT-Logger hilft dir, deine Ernährung zu überwachen & zu planen.
          Du kannst zu Beginn Kalorien- & Makroziele eingeben
          & anschließend deine Mahlzeiten eintragen
          Anhand deiner Eingaben wird sowohl eine Historie,
          in der du nachvollziehen kannst, wann du was gegessen hast,
          als auch eine Statistik erstellt, in der du sehen kannst,
          ob und wie sehr du von deinen gesetzten Zielen abweichst.
        </p>

      </div>
        
        <ButtonTest></ButtonTest>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

  export default {
  data() {
    return {
      htmlElement: '<p style:"color:green"> second line </p>'
    };
  }
}


  </script>

  <style>

</style>
  