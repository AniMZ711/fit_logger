<template>
<div class="loading-page">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>

</div>
</template>

<script>
    export default {
        data: () => {
            return {

            }
        }
    }
</script>

<style lang = "ts" scoped>
    $colors: 07C258;

    .page-loader {
        display: flex;
        justify-content: center;
        align-items: center;
        postion: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vw;
        background-color: #333;
        z-index: 999;
    }
    
</style>