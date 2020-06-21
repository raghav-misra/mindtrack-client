<template>
    <section :class="`section ${editMode && 'edit-mode'}`">
        <div class="container">
            <h1 class="title is-2">
                {{ goal.title }}
                <div class="modify-buttons">
                    <b-button type="is-success" @click="save">Save Track</b-button>
                    <b-button type="is-primary" @click="editMode = !editMode">Editor Mode: {{ editMode ? "on" : "off" }}</b-button>
                    <b-button type="is-danger" @click="deleteTrack" v-if="isOwner">Delete Track</b-button>
                </div>
            </h1>
            <b-progress :value="completionPercent" show-value format="percent" type="is-info"></b-progress>
        </div>

        <div class="container section">
            <div>
                <select class="goal-type-select" v-model="goalDisplay">
                    <option value="user">My Goals</option>
                    <option value="team" v-if="teamSubGoals.length > 0">My Teammates' Goals</option>
                    <option value="completed" v-if="completedSubGoals.length > 0">Completed Goals</option>
                </select>
                <b-button v-if="editMode && goalDisplay === 'user'" id="addUserGoal" @click="createGoal" type="is-primary">Add A Goal +</b-button>
            </div>

            <div v-show="goalDisplay === 'user'">
                <p class="subtitle" v-if="userSubGoals.length === 0 && goalsLoaded">
                    <br /><br />
                    You have no goals.
                    {{ editMode ? "Add one above!" : "Turn on editor mode to add one!" }}
                </p>
                <div class="section skeleton-card">
                    <b-skeleton height="10rem" width="100%" :animated="true" v-if="!goalsLoaded"></b-skeleton>
                </div>
                <GoalListing
                    v-for="goal in userSubGoals"
                    :key="goal.staticIndex"
                    @update="updateAtIndex"
                    @remove="removeAtIndex"
                    :goal="goal"
                    :editMode="editMode"
                />
            </div>
            <div v-show="goalDisplay === 'team'">
                <GoalListing
                    v-for="goal in teamSubGoals"
                    :key="goal.staticIndex"
                    @update="updateAtIndex"
                    @remove="removeAtIndex"
                    :goal="goal"
                    :darkTheme="editMode"
                />
            </div> 
            <div v-show="goalDisplay === 'completed'">
                <GoalListing
                    v-for="goal in completedSubGoals"
                    :key="goal.staticIndex"
                    @update="updateAtIndex"
                    @remove="removeAtIndex"
                    :goal="goal"
                    :darkTheme="editMode"
                />
            </div> 
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { IGoal, ISubGoal, IFullTrackData } from "@/app";
import GoalListing from "@/components/GoalListing.vue";
import { serverError } from "@/services/utils";
import { API_getFullTrackData, API_editTrackData, API_deleteTrack } from "@/services/api";

export default Vue.extend({
	data() {
		return {
            keyTracker: 0,
			goalDisplay: "user",
			goalsLoaded: false,
			editMode: false,
			goal: {
				title: "...",
				author: "",
				subGoals: [],
				obstacles: []
			} as IGoal,
			isChanged: false
		};
	},
	async created() {
		// Fetch goal:
		const goalResponse = await API_getFullTrackData(
			this.$route.params.id,
			sessionStorage.getItem("token") as string
		);
		if (!goalResponse.success) {
			serverError({
                    server: goalResponse.error as string
            }, this);
			this.$router.push({ path: "/" });
			return;
        }
        let tracker = -1;
		this.goal = {
            ...(goalResponse.data as IFullTrackData),
			subGoals: (goalResponse.data as IFullTrackData).subGoals.map((g, i) => {
                tracker++;
                return {
                    ...g,
                    staticIndex: tracker
                };
            })
		} as IGoal;
        this.goalsLoaded = true;
        this.keyTracker = tracker + 1;
	},
	computed: {
		userSubGoals(): ISubGoal[] {
			return this.goal.subGoals.filter(
				g => g.assigned === this.username && !g.completed
			);
		},
		completedSubGoals(): ISubGoal[] {
			return this.goal.subGoals.filter(g => g.completed);
		},
		teamSubGoals(): ISubGoal[] {
			return this.goal.subGoals.filter(
				g => g.assigned !== this.username && !g.completed
			);
		},
		completionPercent(): number {
			return (this.completedSubGoals.length / this.goal.subGoals.length) * 100;
		},
		username(): string { return this.$store.state.userData.username; },
        isOwner(): boolean { return this.goal.author === this.$store.state.userData.fullName; }
	},
	components: { GoalListing },
	methods: {
		updateAtIndex(staticIndex: number, subGoal: ISubGoal) {
			this.goal.subGoals.splice(
				this.userSubGoals.findIndex(s => s.staticIndex === staticIndex),
				1,
				subGoal
			);
			this.isChanged = true;
		},
		removeAtIndex(staticIndex: number) {
			const removeIndex = this.goal.subGoals.findIndex(
				s => s.staticIndex === staticIndex
			);
			this.goal.subGoals.splice(removeIndex, 1);
			this.isChanged = true;
		},
		async save() {
			if (!this.isChanged) return;

			const saveResponse = await API_editTrackData(
				{
                    ...this.goal,
                    subGoals: this.goal.subGoals.map(g => {
                        const clone = Object.assign(Object.create(null), g);
                        delete clone["staticIndex"];
                        return clone;
                    })
                },
				this.$route.params.id,
				sessionStorage.getItem("token") as string
			);
			if (!saveResponse.success) {
				serverError({
                    client: "We couldn't save your track.",
                    server: saveResponse.error as string
                }, this);
				this.$router.push({ path: "/" });
				return;
			} else {
				alert("Saved!");
				this.$router.push({ path: "/dashboard" });
			}
		},
		createGoal() {
			this.goal.subGoals.push({
				staticIndex: this.keyTracker,
				title: "A brand new goal!",
				assigned: this.$store.state.userData.username,
				details: "Explain your new goal...",
				completed: false
            });
            this.keyTracker++;
			this.isChanged = true;
		},
		async deleteTrack() {
            const deleteResponse = await API_deleteTrack(this.$route.params.id, sessionStorage.getItem("token") as string);

            if (!deleteResponse.success) {
                serverError({
                    client: "We weren't able to delete that track!",
                    server: deleteResponse.error as string
                }, this);
            }

            else {
                alert("Deleted!");
                location.href = "/dashboard";
            }
        }
	}
});
</script>

<style scoped>
section, section * {
    transition: background 0.25s ease-in-out, color 0.25s ease-in-out;
}

section.edit-mode {
    background: rgb(37, 56, 71);
}

section.edit-mode * {
    color: white;
}

#addUserGoal {
  margin-left: 0.75rem;
  float: right;
  position: relative;
  top: 1rem;
}

.goal-section > h2.title {
  border-bottom: 1px #363636 solid;
  padding-bottom: 2rem;
}

.modify-buttons {
  float: right;
  position: relative;
  top: 0.5rem;
}

.goal-type-select {
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  padding-right: 1.5rem;
  border: none;
  background: none;
  color: #363636;
}

.goal-type-select option {
  font-size: 1rem;
  color: #363636;
}

.skeleton-card {
    padding: 0.25rem 0;
    margin-top: 3rem;
    padding-bottom: 1rem;
    margin: 2rem;
}
</style>