<template>
    <section class="section">
        <div class="container">
            <h1 class="title level">
                {{ goal.title }}
                <b-button type="is-danger">Delete Track</b-button>
            </h1>
            <AnimatedProgress :value="completionPercent" />
        </div> 

        <div class="container section d-flex">
            <div class="flex-1 has-text-centered">
                dd
            </div>
            <div class="flex-1 has-text-centered">
                ddd
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { IGoal, ISubGoal } from "@/app";
import AnimatedProgress from '@/components/AnimatedProgress.vue';

export default Vue.extend({
    data() {
        return {
            goal: {
                title: "Get good at Fortnite",
                author: "raghavm",
                subGoals: [
                    {
                        title: "Get at least 5 elims and a dub",
                        assigned: "raghavm",
                        details: "Self-explanatory, Raghav never gonna get good though.",
                        status: "Incomplete, probably forever",
                        completed: false
                    }
                ],
                collaborators: ["lehuyh"]
            } as IGoal
        }
    },
    async created() {
        // UNCOMMENT THIS WHEN SERVER UP
        // Fetch user data:
        // if (!this.$store.state.userData._dataLoaded && sessionStorage.getItem("token")) {
        //     await this.$store.dispatch("userData/sync", sessionStorage.getItem("token"));
        // }
    },
    computed: {
        userSubGoals(): ISubGoal[] { return this.goal.subGoals.filter(g => g.assigned === this.$store.state.userData.username); },
        teamSubGoals(): ISubGoal[] { return this.goal.subGoals.filter(g => g.assigned !== this.$store.state.userData.username); },
        completionPercent() { return 49; }
    },
    components: { AnimatedProgress }
});
</script>

<style scoped>

</style>