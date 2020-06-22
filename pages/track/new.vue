<template>
    <section :class="`section view-${currentView}`">
            <div class="create-view has-text-centered" v-show="currentView === 1">
                <h1 class="is-size-1 has-text-weight-light">
                    What is something you are working towards?                                       
                </h1>
                <div class="flex-margin d-flex btn-group">
                    <input 
                        class="input is-success flex-1" v-model="goalName" 
                        type="text" placeholder="Type your goal here…"
                    />
                    <b-button type="is-success" @click="goSecondView">
                        Next&nbsp;&nbsp; 
                        <i class="fas fa-arrow-right"></i>
                    </b-button>
                </div>
            </div>
            <div class="create-view has-text-centered" v-show="currentView === 2">
                <h1 class="is-size-1 has-text-weight-light">
                    How have you progressed towards your goal?                                       
                </h1>
                <div class="flex-margin d-flex btn-group">
                    <input 
                        class="input is-info flex-1" v-model="currentCompleted"
                        type="text" placeholder="Add a completed step..."
                    />
                    <b-button type="is-info" @click="addCompleted">
                        Add &nbsp;<b>+</b>
                    </b-button>
                </div>
                
                <div class="has-text-centered">
                    <div 
                        v-for="(completed, i) in completedSubGoals" :key="i"
                        class="mini-card" 
                    >
                        {{ completed }}
                    </div>
                </div>

                <b-button type="is-success" @click="goThirdView">
                    Next&nbsp;&nbsp; 
                    <i class="fas fa-arrow-right"></i>
                </b-button>
            </div>
            <div class="create-view has-text-centered" v-show="currentView === 3">
                <h1 class="is-size-1 has-text-weight-light">
                    Is your goal <b>SMART</b>?                                    
                </h1>
                <div class="flex-margin has-text-left check-group">
                    <div class="field">
                        <b-checkbox v-model="smartGroup"
                            size="is-large"
                            native-value="Specific">
                            Specific
                        </b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox v-model="smartGroup"
                            size="is-large"
                            native-value="Flint">
                            Measurable
                        </b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox v-model="smartGroup"
                            size="is-large"
                            native-value="Achievable">
                            Achievable
                        </b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox v-model="smartGroup"
                            size="is-large"
                            native-value="Relevant">
                            Relevant
                        </b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox v-model="smartGroup"
                            size="is-large"
                            native-value="Time-Based">
                            Time-Based
                        </b-checkbox>
                    </div>
                </div>

                <b-button type="is-success" @click="finish">
                    Finish! &nbsp;&nbsp; 
                    <i class="fas fa-arrow-right"></i>
                </b-button>
            </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { isEmpty, serverError } from "@/services/utils";
import { API_createTrack } from "@/services/api";

export default Vue.extend({
    data() {
        return {
            currentView: 1,
            currentCompleted: "",
            completedSubGoals: [] as string[],
            goalName: "",
            smartGroup: [] as string[]
        };
    },
    methods: {
        goSecondView() {
            if (!isEmpty(this.goalName))
                this.currentView = 2;
        },
        addCompleted() {
            if (!isEmpty(this.currentCompleted))
                this.completedSubGoals.push(this.currentCompleted);
        },
        goThirdView() {
            this.currentView = 3;
        },
        async finish() {
            const goalResponse = await API_createTrack(sessionStorage.getItem("token") as string, {
                title: this.goalName,
                author: this.$store.state.userData.fullName,
                subGoals: this.completedSubGoals.map(t => ({
                    title: "Prior Progress",
                    assigned: this.$store.state.userData.username,
                    details: t,
                    completed: true,
                }))
            });

            if (!goalResponse.success) {
                serverError({ 
                    server: goalResponse.error as string, 
                    client: "Sorry, we couldn't create that track" 
                }, this);   
            }
            else {
                alert("Added successfully.");
                location.href = "/dashboard";
            }
        }
    }
});
</script>

<style scoped>
section {
    flex: 1;
    display: flex;
    border-bottom: 1px #363636 solid;
    justify-content: center;
    align-items: center;
}

.check-group {
    position: relative;
    left: 5vw;
}

.mini-card {
    width: 75%;
    padding: 0.5rem;
    margin: 1rem;
    display: inline-block;
    border: cornflowerblue 1px solid;
    border-radius: 25px;
}

.flex-margin {
    margin: 1rem 4.75rem;
}

.btn-group > * {
    border-radius: 0;
}

.btn-group:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.btn-group:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>