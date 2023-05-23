<template>
  <div>
    <h2><button v-on:click="decrease">decrease</button> </h2>
    <h3><button v-on:click="increment">increment</button> </h3>
    
    
    <p>{{ count }}</p>
  </div>
</template>
<script lang="ts">
  import { DEPRECATED_ALIASES } from '@babel/types';
import { defineComponent} from 'vue';
  export default defineComponent({
   components:{},
   data(){
     return{
     count:0
     }
    },
   methods:{
      increment() {
       this.count++;
      },

      decrease(){
        this.count--;
      }
    }
  });

</script>