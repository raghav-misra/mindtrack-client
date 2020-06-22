<template>
    <section class="section">
        <h1 class="title is-2 level">
            Your Tracks
            <b-button 
                type="is-success" 
                tag="nuxt-link" :to="{ path: '/track/new' }"
            >
                <h1>New Track <b>+</b></h1>
            </b-button>
        </h1>
        <hr>
        <div v-show="userTracksLoaded">
            <TrackListing
                v-for="(track, i) in userTracks" :key="i"
                :title="track.title"
                :completed="track.subGoals.completed"
                :total="track.subGoals.total"
                :author="track.author"
                :trackID="track.id"
            />
        </div>
        <div v-if="!userTracksLoaded" class="container">
            <b-skeleton height="80px" width="50%" :animated="true"></b-skeleton>
            <b-skeleton :animated="true"></b-skeleton>
        </div>

        <hr><hr>

        <h1 class="title is-2">
            Collaboration Tracks
        </h1>
        <hr>
        <div v-show="collabTracksLoaded">
            <TrackListing
                v-for="(track, i) in collabTracks" :key="i"
                :title="track.title"
                :completed="track.subGoals.completed"
                :total="track.subGoals.total"
                :author="track.author"
                :trackID="track.id"
            />
        </div>
        <div v-if="!collabTracksLoaded" class="container">
            <b-skeleton height="80px" width="50%" :animated="true"></b-skeleton>
            <b-skeleton :animated="true"></b-skeleton>
        </div>
    </section>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import TrackListing from "@/components/TrackListing.vue";
import { API_getTrackInfo } from "@/services/api";
import { ITrackInfo } from "@/app";
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            userTracksLoaded: false,
            userTracks: [] as ITrackInfo[],

            collabTracksLoaded: false,
            collabTracks: [] as ITrackInfo[]
        }
    },
    components: { Header, TrackListing },

    async created() {
        await this.$store.dispatch("userData/sync", this);

        // No access if not logged in:
        if (sessionStorage.getItem("token") === null) { this.$router.push({ path: "/" }); return; }

        // Fetch the user tracks:
        console.log(this.$store.state.userData.userTracks.length)
        for await(let id of this.$store.state.userData.userTracks) {
            const track = await this.getTrack(id);
            console.log(track);
            this.userTracks.push(track.data as ITrackInfo);
        }
        setTimeout(this.showUserTracks, 250);

        // Fetch the collab tracks:
        for await(let id of this.$store.state.userData.collabTracks) {
            const track = await this.getTrack(id);
            this.collabTracks.push(track.data as ITrackInfo);
        }
        setTimeout(this.showCollabTracks, 250);
    },

    methods: {
        async getTrack(trackID: string) {
            return await API_getTrackInfo(trackID, sessionStorage.getItem("token") as string);
        },
        showUserTracks() { this.userTracksLoaded = true; },
        showCollabTracks() { this.collabTracksLoaded = true; }
    }
});
</script>

<style scoped>
</style>