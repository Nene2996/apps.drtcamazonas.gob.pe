<template>
  <img alt="Vue logo" src="./assets/logo_drtc.png" width="200">
  <TheMainApp msg="Portal de aplicativos informáticos"/>
  <TheFooter/>
</template>

<script>
import TheMainApp from './components/apps/TheMainApps.vue'
import TheFooter from './components/footer/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheMainApp,
    TheFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
