<template>
  <v-layout align-center justify-center>
    <v-flex xs12 md12>
      <v-card class="elevation-3">
        <div class="title text-xs-center pt-2">
          Recover Password
        </div>
        <v-divider class="mt-2"></v-divider>
        <div v-if="!success">
          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="recover"
            >

              <v-text-field
                autofocus
                label="E-mail *"
                v-model="email"
                :rules="emailRules"
                type="email"></v-text-field>

              <v-card-actions>
                <v-btn
                  block
                  dark
                  color="purple"
                  type="submit"
                  :loading="loading"
                >Recover</v-btn>
              </v-card-actions>

              <div class="red--text text-xs-center" v-if="error">
                Recovery failed.
                <div class="red--text text-xs-center" v-if="serverError">
                  {{ serverError }}
                </div>
              </div>

            </v-form>
          </v-card-text>
          <v-divider class="mt-2"></v-divider>
          <div class="text-xs-center">
            <span class="text-xs-center">
              <v-btn color="primary" flat small @click="$router.push({name: 'login'})">Back to Login</v-btn>
            </span>
          </div>
        </div>
        <div v-if="success">
          <v-card-text>
            An email with a reset password link was sent to your email.

          <div class="text-xs-center">
            <span class="text-xs-center">
              Not received?
              <v-btn color="primary" flat small @click="resend">Send Again</v-btn>
            </span>
          </div>
          <div class="text-xs-center">
            {{ sentAgain }}
          </div>
          </v-card-text>
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
      success: false,
      sentAgain: '',
      loading: false,
      error: false,
      serverError: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid'
      ],
    }),
    methods: {
      resend () {
        this.success = false;
      },
      recover () {
        if (!this.$refs.form.validate()) {
          return;
        }

        this.error = false;
        this.loading = true;
        AuthService.recover({email: this.email})
          .then(request => {
            this.loading = false;
            this.success = true;
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;

            this.serverError = 'Email not found.';
          })
      },
    }
  }
</script>