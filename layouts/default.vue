<template>
  <div>
    <app-header></app-header>
    <nuxt/>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style>
img {
  height: auto;
}
</style>

