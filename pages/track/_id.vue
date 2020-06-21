<template>
    <section :class="`section ${editMode && 'edit-mode'}`">
        <div class="container">
            <h1 class="title is-2">
                {{ goal.title }}
                <div class="modify-buttons">
                    <b-button type="is-primary" @click="editMode = !editMode">Editor Mode: {{ editMode ? "on" : "off" }}</b-button>
                    <b-button type="is-danger">Delete Track</b-button>
                </div>
            </h1>
            <AnimatedProgress :value="completionPercent" />
        </div>

        <div class="container section">
            <div>
                <select class="goal-type-select" v-model="goalDisplay">
                    <option value="user">My Goals</option>
                    <option value="team" v-if="teamSubGoals.length > 0">My Teammates' Goals</option>
                    <option value="completed" v-if="completedSubGoals.length > 0">Completed Goals</option>
                </select>
                <b-button v-if="editMode && goalDisplay === 'user'" id="addUserGoal" type="is-primary">Add A Goal +</b-button>
            </div>

            <div v-show="goalDisplay === 'user'">
                <p class="subtitle" v-if="userSubGoals.length === 0">
                    <br /><br />
                    You have no goals.
                    {{ editMode ? "Add one above!" : "Turn on editor mode to add one!" }}
                </p>
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
import { IGoal, ISubGoal } from "@/app";
import AnimatedProgress from "@/components/AnimatedProgress.vue";
import GoalListing from "@/components/GoalListing.vue";

export default Vue.extend({
  data() {
    return {
      goalDisplay: "user",
      editMode: false,
      goal: {
        title: "Get good at Fortnite",
        author: "raghavm",
        subGoals: [
          {
            staticIndex: 0,
            title: "Get at least 5 elims and a dub",
            assigned: "raghav",
            details: "Self-explanatory, Raghav never gonna get good though.",
            completed: false
          },
          {
            staticIndex: 1,
            title: "3 vicroy in a day",
            assigned: "raghav",
            details: "Self-explanatory, Raghav never gonna get good though.",
            completed: false
          }
        ]
      } as IGoal
    };
  },
  async created() {
    // Fetch user data:
    if (
      !this.$store.state.userData._dataLoaded &&
      sessionStorage.getItem("token")
    ) {
      await this.$store.dispatch(
        "userData/sync",
        sessionStorage.getItem("token")
      );
    }
  },
  computed: {
    userSubGoals(): ISubGoal[] {
      return this.goal.subGoals.filter(g => (g.assigned === this.username && !g.completed));
    },
    completedSubGoals(): ISubGoal[] {
        return this.goal.subGoals.filter(g => g.completed);
    },
    teamSubGoals(): ISubGoal[] {
      return this.goal.subGoals.filter(g => (g.assigned !== this.username && !g.completed));
    },
    completionPercent(): number {
      return (this.completedSubGoals.length / this.goal.subGoals.length) * 100;
    },
    username() {
      return this.$store.state.userData.username;
    }
  },
  components: { AnimatedProgress, GoalListing },
  methods: {
    updateAtIndex(staticIndex: number, subGoal: ISubGoal) {
        this.goal.subGoals.splice(this.userSubGoals.findIndex(s => s.staticIndex === staticIndex), 1, subGoal);
    },
    removeAtIndex(staticIndex: number) {
      this.userSubGoals.splice(
        this.userSubGoals.findIndex(s => s.staticIndex === staticIndex),
        1
      );
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
</style>