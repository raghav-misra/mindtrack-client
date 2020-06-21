<template>
  <div>
    <NavBar />
    <div id="currentView">
        <Nuxt />
    </div>
    <footer class="section">
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
    components: { NavBar },
    async beforeCreate() {
        // Fetch user data:
        // await this.$store.dispatch("userData/sync", this);
    }
  });
</script>

<style>
/* Flexboxify the body */
html, body, #__nuxt, #__layout, #__layout > div {
    min-height: 100vh;
}
#__layout > div {
    display: flex;
    flex-direction: column;
}
#currentView {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>