<template>
  <section class="container track-listing">
    <p class="title is-4">{{ title }}</p>
    <p class="subtitle is-5">By {{ author }}</p>
    <AnimatedProgress :value="(completed/total) * 100" show-value format="percent" />
    <b-button tag="nuxt-link" :to="{ path: `/track/${trackID}` }">View</b-button>
  </section>
</template>


<script lang="ts">
import Vue from "vue";
import AnimatedProgress from '@/components/AnimatedProgress.vue';

export default Vue.extend({
  props: {
    completed: Number,
    total: Number,
    author: String,
    title: String,
    trackID: String,
  },
  components: { AnimatedProgress }
});
</script>

<style scoped>
.track-listing {
    margin-bottom: 1rem;
}
</style>