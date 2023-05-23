<template>
    <ion-page>
      <ion-header>
             <ion-toolbar color="success">
                <ion-title>Produkt Datenbank</ion-title>
            </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Produkt einpflegen </ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-item>
      <ion-input label="Suche:" placeholder="Wie heißt die Mahlzeit/ Das Produkt?" :clear-input="true"></ion-input>
      </ion-item> 

        <br/><br/>
        <ion-button color="success"  shape="round">
          <router-link to="/tabs/produkt-erstellen" tag="button">Produkt erstellen</router-link>
        </ion-button>
      <br/><br/>
        <ion-button color="success" shape="round">
          <router-link to="/tabs/essen-erstellen" tag="button">Standard-Mahlzeit erstellen</router-link>
      </ion-button>

      <br/>

  

        <ExploreContainer name="Produkte hinzufügen" />

      </ion-content>
    </ion-page>

</template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent , IonIcon} from '@ionic/vue';
  
</script>
  


<style>
  


</style>