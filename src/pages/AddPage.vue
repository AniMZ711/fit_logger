<template>
  <q-layout>
    <q-header class="stickyHeader">
      <q-toolbar>
        <q-btn flat to="/dashboard" icon="arrow_back" />
        <q-toolbar-title> {{ pageName }}</q-toolbar-title>
        <!--Anzeige des Titels; Variable aus dem Script-->
      </q-toolbar>
    </q-header>

    <q-page>


      <div class="upper-container">
        <div class="q-pa-sm example-row-equal-width">
          <div class="row" style="height: 6em">
            <div class="col col-1">.col</div>

            <div class="col col-6">
              <div class="display-add-product">
                <p>Produkt hinzufügen</p>
              </div>

            </div>
            <div class="col">
              <div class="add-icon">
                <q-btn round color="green" icon="add_circle" size="5em" padding="5px" />
              </div>
            </div>

            <div class="col col-1">.col</div>
            <div class="col col-1">.col</div>


          </div>

          <div class="row">
            <div class="col col-12">
              <div class="search-bar  ">
                <q-input color="primary" filled v-model="text" label="Nahrungsmittel suchen">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="buttons-container">

        <div class="lower-container">
          <div class="row" style="height:4em">
            <div class="col col-2"></div>
            <div class="col col-8">
              <div class="scan-button">
                <q-btn size="md" rounded color="green" icon="qr_code_scanner" @click="toggleScanner">
                  Produkt scannen
                </q-btn>
              </div>
            </div>
            <div class="col col-2"></div>
          </div>
        </div>

        <div class="lower-container-2">
          <div class="row" style="height:4em">
            <div class="col col-2"> </div>
            <div class="col col-8">
              <div class="manuell-add">
                <q-btn rounded color="green" icon="edit">
                  Manuell eingeben
                </q-btn>
              </div>
            </div>
            <div class="col col-2"> </div>
          </div>
        </div>

      </div>




      <div class="auswahl-buttons">

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



.scan-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.lower-container {
  position: relative;
  top: 5em;
}

.lower-container-2 {
  position: relative;
  top: 5.1em;
}

.manuell-add {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.buttons-container {

  position: sticky;
  top: 60vh;


}

.upper-container {
  margin-top: 4em;


}

.row {
  /* padding: 10px 15px; */
  background: rgba(#999, 0.15);
  /* border: 1px solid red; */
}

.col {
  padding: 10px 15px;
  background: rgba(#999, 0.15);
  /* border: 1px solid red; */
}

.display-add-product {


  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 6vw;

  line-height: 3em;
  text-align: right;
  letter-spacing: -0.05em;
  align-items: center;

  color: #323232;


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
</style>
