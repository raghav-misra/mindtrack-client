<template>
    <section class="section">
        <div class="create-view" v-show="currentView === 1">
            <h1 class="is-size-1 has-text-weight-light">
                What is something you are working towards?                                       
            </h1>
            <div class="flex-margin d-flex btn-group">
                <input class="input is-success flex-1" type="text" placeholder="Primary input">
                <b-button type="is-success" @click="currentView = 2">
                    Next <i class="fas fa-arrow-right"></i>
                </b-button>
            </div>
        </div>
        <div class="create-view" v-show="currentView === 2">

        </div>
        <div class="create-view" v-show="currentView === 3">

        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            currentView: 1
        };
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