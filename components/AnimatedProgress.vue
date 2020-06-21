<template>
    <b-progress :value="animatedValue" show-value :format="format" type="is-info"></b-progress>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        value: Number,
        format: {
            type: String,
            default: "percent"
        }
    },
    data() {
        return {
            animatedValue: 0
        }
    },
    created() {
        this.initAnimation();
    },
    methods: {
        initAnimation() {
            if (this.animatedValue === this.value) return;
            this.animatedValue += 1;
            setInterval(this.initAnimation, 20);
        }
    }
});
</script>

<style>
.progress-wrapper > .progress-value {
    font-size: 1rem;
    top: 12.5%;
    color: rgb(21, 38, 46);
}

.progress-wrapper > progress {
    height: 1.5rem;
}
</style>