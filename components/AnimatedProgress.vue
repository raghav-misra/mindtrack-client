<template>
    <b-progress :value="animatedValue" show-value :format="format"></b-progress>
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

<style scoped>

</style>