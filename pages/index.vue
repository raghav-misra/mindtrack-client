<template>
  <div>
    <Header title="Mindtrack.gg" subtitle="like and subscribe" className="is-primary is-fullheight"></Header>
  
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TrackListing from "@/components/TrackListing.vue";
import Vue from "vue";

export default Vue.extend({
    components: { Header, TrackListing },

    async created() {
        if (!this.$store.state.userData._dataLoaded && sessionStorage.getItem("token")) {
            await this.$store.dispatch("userData/sync", sessionStorage.getItem("token"));
        }
    }
})
</script>
