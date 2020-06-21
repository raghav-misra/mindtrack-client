<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" :to="{ path: '/' }">
        <h1 id="brandTitle" class="has-background-warning title">MindTrack</h1>
      </b-navbar-item>
    </template>
    <template v-if="isLoggedIn" slot="start">
      <b-navbar-item href="#" tag="nuxt-link" :to="{ path: '/' }">Home</b-navbar-item>
      <b-navbar-item tag="nuxt-link" :to="{ path: '/dashboard' }">Dashboard</b-navbar-item>
    </template>
    <template v-else slot="start">
      <b-navbar-item href="#" tag="nuxt-link" :to="{ path: '/' }">Home</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div" v-if="isLoggedIn">
        <p id="userGreeting">
          Hey
          <b>{{ username }}</b>!
        </p>
      </b-navbar-item>

      <b-navbar-item tag="div" v-if="isLoggedIn">
        <div class="buttons">
          <div class="field has-addons">
            <p class="control">
              <b-button tag="button" type="is-danger" @click="logOut">
                <strong>Logout</strong>
              </b-button>
            </p>
          </div>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div" v-else>
        <div class="buttons">
          <div class="field has-addons">
            <p class="control">
              <b-button tag="nuxt-link" type="is-primary" :to="{ path: '/auth/signup' }">
                <strong>Signup</strong>
              </b-button>
            </p>
            <p class="control">
              <b-button tag="nuxt-link" type="is-primary" :to="{ path: '/auth/login' }">Login</b-button>
            </p>
          </div>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    username() {
      return this.$store.state.userData.username;
    }
  },
  methods: {
    logOut() {
      this.$store.commit("logOut");
      this.$store.commit("userData/clear");
      sessionStorage.clear();
      this.$router.push({ path: "/" });
    }
  }
});
</script>

<style scoped>
#userGreeting {
  margin-right: 0.5rem;
}

nav {
  padding: 1rem 0.25rem;
  border-bottom: 1px solid #363636;
}
</style>