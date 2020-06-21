"<template>
    <div>
        <Header :title="headerTitle" :subtitle="headerSubtitle" className="is-primary" />
        <section class="section">
            <form @submit.prevent="signup" class="container" v-if="authType === 'signup'">
                <b-field label="Full Name">
                    <b-input type="text" v-model="signupName"></b-input>
                </b-field>

                <b-field label="Username">
                    <b-input type="text" v-model="signupUsername" minlength="4"></b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password" v-model="signupPassword" password-reveal minlength="8"></b-input>
                </b-field>

                <b-field>
                    <b-button native-type="submit" type="is-success">Let's Get Going!</b-button>
                </b-field>
            </form>

            <form @submit.prevent="login" class="container" v-if="authType === 'login'">
                <b-field label="Username">
                    <b-input type="text" v-model="loginUsername" minlength="4"></b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password" v-model="loginPassword" minlength="8" password-reveal></b-input>
                </b-field>

                <b-field>
                    <b-button native-type="submit" type="is-success">Onward!</b-button>
                </b-field>
            </form>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import { isEmpty, serverError } from "@/services/utils";
import { API_signup, API_login } from "@/services/api";

export default Vue.extend({
    data() {
        return {
            signupName: "",
            signupUsername: "",
            signupPassword: "",

            loginUsername: "",
            loginPassword: "",
        };
    },

    computed: {
        authType(): string { return this.$route.params.authType; },
        headerTitle(): string { return this.authType === "login" ? "Welcome back!" : "Welcome to MindTrack!" },
        headerSubtitle(): string { return this.authType === "login" ? "We've been expecting you..." : "Sign up for an account here!" }
    },
    methods: {
        async signup() {
            // Validation 
            let message = "Found Issues:";
            let success = true;
            const error = (e: string) => { success = false; message += `\n${e}`; }

            isEmpty(this.signupName) && error("Please enter your name.");
            (this.signupPassword.length < 8) && error("Your password must be at least 8 characters");
            (this.signupUsername.trim().length < 4) && error("Your username must be at least 4 characters");

            if (!success) { alert(message); return; }

            // Send signup request:
            const signupResponse = await API_signup({ username: this.signupUsername, password: this.signupPassword, name: this.signupName });
            if (!signupResponse.success) {
                serverError({
                    server: signupResponse.error as string
                }, this);
                return;
            }

            // Successful so far!
            this.onLogin(signupResponse.token as string);
        },
        async login() {
           // Validation 
            let message = "Found Issues:";
            let success = true;
            const error = (e: string) => { success = false; message += `\n${e}`; }

            isEmpty(this.loginPassword) && error("Please enter your password.");
            isEmpty(this.loginUsername) && error("Please enter your username");

            if (!success) { alert(message); return; }

            // Send login request:
            const loginResponse = await API_login({ username: this.loginUsername, password: this.loginPassword }); 
            if (!loginResponse.success) {
                serverError({
                    server: loginResponse.error as string
                }, this);
                return;
            }

            // Successful so far!
            this.onLogin(loginResponse.token as string);
        },
        onLogin(token: string) {
            sessionStorage.setItem("token", token);
            this.$store.commit("logIn");
            this.$router.push({ path: "/dashboard" });
        }
    },
    
    components: { Header }
});
</script>

<style scoped>

</style>