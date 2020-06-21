<template>
  <div>
    <NavBar />
    <Nuxt />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Mindtrack</strong> by 
          <a href="http://github.com/LehuyH" target="_blank">LehuyH</a> & 
          <a href="http://github.com/raghav-misra" target="_blank">raghavm</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
  import Vue from "vue";
  import NavBar from "@/components/NavBar.vue";

  export default Vue.extend({
    components: {
      NavBar
    }
  });
</script>