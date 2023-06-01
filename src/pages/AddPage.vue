<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-btn flat to="/dashboard" icon="arrow_back" />
        <q-toolbar-title> {{ name }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <h1>Produkt hinzufügen</h1>

        <div class="addIcon">
          <q-btn
            round
            color="green"
            icon="add_circle"
            size="24px"
            padding="5px"
          />
        </div>

        <div class="searchBar" style="max-width: 300px">
          <q-input
            color="teal"
            filled
            v-model="text"
            label="Nahrungsmittel suchen"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="auswahlButtons">
          <div>
            <q-btn rounded color="green" icon="edit"> Manuell eingeben </q-btn>
          </div>

          <br />

          <div>
            <q-btn
              rounded
              color="green"
              icon="qr_code_scanner"
              @click="toggleScanner"
            >
              Produkt scannen
            </q-btn>
          </div>

          <teleport to="body">
            <div class="modal" v-if="showScanner">
              <div>
                <StreamBarcodeReader
                  @decode="onDecode"
                  @loaded="onLoaded"
                ></StreamBarcodeReader>
                <div style="padding-top: 10px">
                  <q-btn
                    rounded
                    color="green"
                    icon="qr_code_scanner"
                    @click="toggleScanner"
                  >
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
      name: "Produkt hinzufügen",
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

h1 {
  position: absolute;
  width: 185px;
  height: 88px;
  left: 63px;
  top: 74px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-align: right;
  letter-spacing: -0.05em;

  color: #323232;
}

.addIcon {
  position: absolute;
  width: 185px;
  height: 88px;
  left: 270px;
  top: 120px;
  pointer-events: none;
}

.searchBar {
  position: absolute;
  width: 100%;
  max-width: 40rem;
  left: 40px;

  top: 200px;
}

.auswahlButtons {
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

.modal > div {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
}
</style>
