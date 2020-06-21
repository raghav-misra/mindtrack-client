<template>
  <section class="container track-listing">
    <p class="title is-4">{{ title }}</p>
    <p class="subtitle is-5">By {{ author }}</p>
     <b-progress :value="completed * 100 / total" show-value format="percent" type="is-info"></b-progress>
    <b-button tag="nuxt-link" :to="{ path: `/track/view/${trackID}` }">View</b-button>
  </section>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    completed: Number,
    total: Number,
    author: String,
    title: String,
    trackID: String,
  },
});
</script>

<style scoped>
.track-listing {
    margin-bottom: 1rem;
}
</style>