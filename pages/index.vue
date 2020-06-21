<template>
  <div>
    <Header title="Mindtrack" subtitle="Keep Your Mind On Track" class="is-primary is-fullheight"></Header>

    <section class="section">
      <div class="container">
        <h1 class="title">Mindtrack</h1>
        <h2 class="subtitle">
          Is a <b>collaborative</b> platform that sets you up for success
        </h2>
        <p class="has-text-centered">Ever had a large project or goal and didn't know here to start?
          Mindtrack gives you the tools you need to start heading
          and the right direction! With Mindtrack the goals set will be more clear, more focused, and more rewarding.
        </p>
        <br>
          <Header title="Create Smarter Goals" subtitle="Mindtrack Goals are created in a way that ensures that all goals fits the SMART goals system" class="is-success "></Header>
          <Header title="Manage your goals, anywhere" subtitle="Mindtrack was built to work on any device with a browser, whether that is a phone, PC, or tablet" class="is-info "></Header>
          <Header title="Share your goals" subtitle="Mindtrack offers powerful collaboration tools to provide team projects and goals a space to map them out" class="is-warning "></Header>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  import TrackListing from "@/components/TrackListing.vue";
  import Vue from "vue";

  export default Vue.extend({
    components: {
      Header,
      TrackListing
    }
  });
</script>