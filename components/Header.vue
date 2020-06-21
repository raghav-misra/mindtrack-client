<template>
<section :class="className + ` hero is-medium is-primary is-bold`">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        {{ title }}
      </h1>
      <h2 class="subtitle">
       {{ subtitle }}
      </h2>
    </div>
  </div>
</section>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        "title": String,
        "subtitle": String,
        "className": String
    }
});
</script>

<style scoped>

</style>