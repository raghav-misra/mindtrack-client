<template>
  <section class="section">
    <TrackListing
        v-for="(track, i) in tracks" :key="i"
        :title="track.title"
        :completed="track.subgoals.completed"
        :total="track.subgoals.total"
        :author="track.author"
        :trackID="track.id"
    />
    <div v-if="!tracksLoaded" class="container">
        <b-skeleton height="80px" width="50%" :animated="true"></b-skeleton>
        <b-skeleton :animated="true"></b-skeleton>
    </div>
  </section>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import TrackListing from "@/components/TrackListing.vue";
import { API_getTrackInfo, ITrackInfoResponse } from "@/services/api";
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            tracksLoaded: false,
            tracks: [] as ITrackInfoResponse[]
        }
    },
    components: { Header, TrackListing },

    async created() {
        if (!this.$store.state.userData._dataLoaded && sessionStorage.getItem("token")) {
            await this.$store.dispatch("userData/sync", sessionStorage.getItem("token"));
        }
        for await(let id of this.$store.state.userData.userTracks) {
            const track = await this.getTrack(id);
            this.tracks.push(track);
        }
        this.tracksLoaded = true;
    },

    methods: {
        async getTrack(trackID: string) {
            return await API_getTrackInfo(trackID, sessionStorage.getItem("token") as string);
        }
    }
});
</script>

<style scoped>
</style>