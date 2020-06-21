<template>
    <section>

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                   {{ goal }}
                </p>
                 <p class="subtitle is-4">
                   Assigned to: {{ assigned }}
                 </p>
                <a href="#collapsible-card" data-action="collapse" class="card-header-icon is-hidden-fullscreen"
                    aria-label="more options">
                    <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a>
            </header>
            <div id="collapsible-card" class="is-collapsible is-active">
                <div class="card-content">
                    <p class="title is-4">
                        “There are two hard things in computer science: cache invalidation, naming things, and
                        off-by-one
                        errors.”
                    </p>
                    <p class="subtitle is-5">
                        Jeff Atwood
                    </p>
                </div>
                <footer class="card-footer">
                    <p class="card-footer-item">
                        <span>
                            View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
                        </span>
                    </p>
                    <p class="card-footer-item">
                        <span>
                            Share on <a href="#">Facebook</a>
                        </span>
                    </p>
                </footer>
            </div>
        </div>
    </section>
</template>


<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: {
            title: String,
            assigned: String
        }
    });
</script>

<style scoped>
</style>