<template>
    <div :class="`app-card has-text-centered ${isDark && 'edit-mode'}`">
        <div class="app-card-header">
            <div>
                <input class="is-size-4 title-input" :disabled="disableInputs" v-model="title"><br>
                <small>Assigned To: <b>{{ goal.assigned }}</b></small>
            </div>
            <div>
                <textarea class="is-size-6" v-model="details"></textarea>
            </div>
        </div>
        <div v-if="editMode">
            <b-button @click="finish" type="is-success">Finish Goal</b-button>
            <b-button @click="remove" type="is-danger">Delete Goal</b-button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: {
            goal: Object,
            editMode: { type: Boolean, default: false },
            darkTheme: Boolean
        },
        data() {
            return {
                title: this.goal.title,
                details: this.goal.details,
                completed: this.goal.completed
            };
        },
        methods: {
            finish() { this.goal.completed = true; },
            remove() { this.$emit("remove", this.goal.staticIndex); },
            update() { this.$emit("update", this.goal.staticIndex, { ...this.goal, title: this.title, details: this.details, completed: this.completed }); }
        },
        computed: {
            isDark(): boolean { return this.editMode || this.darkTheme; },
            disableInputs(): boolean { return !this.editMode; }
        },
        watch: {
            title() { this.update(); },
            details() { this.update(); },
            completed() { this.update(); },
        }
    });
</script>

<style scoped>
.app-card {
    padding: 0.25rem 0;
    padding-bottom: 1rem;
    border: 0.5px solid rgb(37, 56, 71);
    border-radius: 5px;
    text-align: center;
    margin: 2rem;
}

.app-card-header {
    margin: 1rem;
}
.edit-mode input, .edit-mode textarea{
    background: none;
    color: white;
}

.edit-mode.app-card {
    border-color: white;
}

input, textarea {
    width: 100%;
    padding: 0.125rem;
    margin: 0.5rem;
    border: none;
    text-align: center;
}
</style>