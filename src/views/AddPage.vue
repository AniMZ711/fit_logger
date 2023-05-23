

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"> Add </ion-title>  
        </ion-toolbar>
      </ion-header>
      

      <ExploreContainer name="Add page" />

        
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v160M336 256H176"/></svg>
  
      <h1> Produkt hinzufügen</h1>

      

    <div class = "Input"> 

      <ion-item>
    <ion-input
      label="Input with clear button"
      labelPlacement="stacked"
      clearInput="true"
      placeholder="Enter text to see clear button"
      value="Default value"
      class="customInput"
    >
    </ion-input>
  </ion-item>



    </div>
     
      
      
      
    
     
     
    </ion-content>
  </ion-page>

  
</template>

<script setup lang="ts">

    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/vue';
    import { add, book, ellipse, home, person, square, triangle, addCircleOutline, serverOutline, star } from 'ionicons/icons';
    import {defineComponent} from 'vue';

  //  import Counter from './Counter.vue';


  //   export default defineComponent({
  //   components:{
  //     Counter
  //  },
  
  // });

</script>
 



<style>

@import url('https://fonts.cdnfonts.com/css/inter');


svg{

  color: #07C258;
  position: fixed;
    width: 100%;
  height: 50px;
  left: 266px;
  top: 105px;

}

h1{

  position: absolute;
width: 185px;
height: 88px;
left: 63px;
top: 74px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 36px;
line-height: 44px;
text-align: right;
letter-spacing: -0.05em;

color: #323232;


}







</style>
