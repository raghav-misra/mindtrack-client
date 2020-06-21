<template>
  <div>
    <NavBar />
    <Nuxt />
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";

export default Vue.extend({
    components: { NavBar }
});
</script>
