<template>
  <v-layout align-center justify-center>
    <v-flex xs12 md12>
      <v-card class="elevation-3">
        <div class="title text-xs-center pt-2">
          Sign in
        </div>
        <v-divider class="mt-2"></v-divider>
        <v-card-text>
          <v-form
            ref="form"
            @submit.prevent="login"
            lazy-validation
          >
            <v-text-field
              prepend-icon="alternate_email"
              v-model="email"
              label="E-mail"
              type="email"
              :rules="emailRules"
              autofocus
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="password"
              label="Password"
              :rules="passwordRules"
              type="password"
              required
            ></v-text-field>
            <v-btn
              block
              dark
              :loading="loading"
              color="purple"
              type="submit"
            >Sign in</v-btn>

            <div class="red--text text-xs-center" v-if="error">
              Authentication failed. Check the fields and try again.
            </div>
          </v-form>
        </v-card-text>
        <div class="text-xs-center">
          <span class="text-xs-center">Forgot password? <v-btn color="primary" flat small @click="$router.push({name: 'recover'})">Click Here</v-btn></span>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div class="text-xs-center">
          <span class="text-xs-center">Not registered yet?</span>
          <v-btn
            @click="$router.push({name: 'register'})"
            class="pl-0 pr-0"
            outline
            color="purple">Sign Up</v-btn>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import AuthService from '@/services/AuthService';

  export default {
    data: () => ({
      email: null,
      password: null,
      error: false,
      loading: false,
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    }),
    methods: {
      login () {
        if (!this.$refs.form.validate()) {
          return;
        }

        this.error = false;
        this.loading = true;
        AuthService.login(this.email, this.password)
          .then(request => {
            this.loading = false;
            if (!request.data.token) {
              this.error = true;
              return;
            }
            AuthService.loginSuccessful(request);
            return true;
          })
          .catch(() => {
            this.loading = false;
            this.error = true;
          })
      }
    }

  }
</script>