<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Welcome</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large"> Welcome! </ion-title>
                </ion-toolbar>
            </ion-header>

            <ExploreContainer name="Add page" />

            <div class="home">
                <h1> Willkommen! </h1>

                <p> Danke, dass du dich für den FIT-Logger entschieden hast! </p>
                <p> Der FIT-Logger hilft dir, deine Ernährung zu überwachen & zu planen. </p>
                <p> Du kannst zu Beginn Kalorien- & Makroziele eingeben </p>
                <p> & anschließend deine Mahlzeiten eintragen</p>
                <p> Anhand deiner Eingaben wird sowohl eine Historie,</p>
                <p> in der du nachvollziehen kannst, wann du was gegessen hast,</p>
                <p> als auch eine Statistik erstellt, in der du sehen kannst, </p>
                <p> ob und wie sehr du von deinen gesetzten Zielen abweichst. </p>

            </div>

            <ButtonTest></ButtonTest>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

</script>
  