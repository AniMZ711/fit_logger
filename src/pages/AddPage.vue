<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-btn flat to="/dashboard" icon="arrow_back" />
        <q-toolbar-title> {{ pageName }}</q-toolbar-title>
        <!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>


    <q-page-container class="upper-container ">

      <q-page-container class="display-add-product">

        <p>Produkt hinzufügen</p>


      </q-page-container>

      <q-page-container class="add-icon">

        <div class="add-icon">
          <q-btn round color="green" icon="add_circle" size="24px" padding="5px" />
        </div>

      </q-page-container>

    </q-page-container>


    <q-page-container class="display-search-bar ">

      <div class="search-bar q-px-lg q-mx-lg ">
        <q-input color="primary" filled v-model="text" label="Nahrungsmittel suchen">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-page-container>






    <q-page-container>
      <q-page>




        <div class="auswahl-buttons">
          <!-- <div>
            <q-btn rounded color="green" icon="edit"> Manuell eingeben </q-btn>
          </div> -->

          <!-- diese Funktion bleibt vorab außenvor-->



          <div>
            <q-btn rounded color="green" icon="qr_code_scanner" @click="toggleScanner">
              Produkt scannen
            </q-btn>
          </div>

          <teleport to="body">
            <div class="modal" v-if="showScanner">
              <div>
                <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
                <div style="padding-top: 10px">
                  <q-btn rounded color="green" icon="qr_code_scanner" @click="toggleScanner">
                    Scan beenden
                  </q-btn>
                </div>
              </div>
            </div>
          </teleport>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default defineComponent({
  components: { StreamBarcodeReader },
  data() {
    return {
      showScanner: false,
      pageName: "Produkt hinzufügen", // bei Veränderung ändert sich der Seitentitel automatisch
    };
  },
  methods: {
    toggleScanner() {
      this.showScanner = !this.showScanner;
      //this.open = !this.open;
    },
    onLoaded() {
      console.log(`Scanning now`);
    },

    onDecode(text) {
      console.log(`Decode text from QR code is ${text}`);
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/inter");


.display-search-bar {

  display: flex;

  background-color: yellow;
  box-sizing: border-box;
  height: 10px;
  width: 100%;
  align-items: center;


}

.search-bar {
  vertical-align: top;
  flex: 1;
}

/* h1 {


  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-align: right;
  letter-spacing: -0.05em;

  color: #323232;
} */

/* .add-icon {
  position: absolute;
  width: 185px;
  height: 88px;
  left: 270px;
  top: 120px;
  pointer-events: none;
} */



.auswahl-buttons {
  position: absolute;
  width: 100%;
  max-width: 40rem;
  left: 100px;

  top: 580px;
}

.root {
  position: relative;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal>div {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
}


.upper-container {

  width: 100%;
  /* Set the initial width to 100% */
  max-width: 80em;
  /* Set a maximum width for the container */
  margin: 0 auto;
  /* Center the container horizontally */
  padding: 20px;
  /* Add padding as needed */
  box-sizing: border-box;
  /* Include padding and borders in the container's total width */
  background-color: aqua;

  display: flex;
  justify-content: center;
  align-items: center;


}
</style>
