<template>
  <v-layout align-center justify-center>
    <v-flex xs12 md12>
      <v-card class="elevation-3">
        <div class="title text-xs-center pt-2">
          Reset Password
        </div>
        <v-divider class="mt-2"></v-divider>
        <v-card-text>
          <v-form
            ref="form"
            @submit.prevent="reset"
          >
            <v-text-field
              label="E-mail *"
              v-model="email"
              :rules="emailRules"
              type="email"></v-text-field>

            <v-text-field
              label="Password *"
              v-model="password"
              :rules="passwordRules"
              type="password"></v-text-field>

            <v-text-field
              v-model="passwordConfirmation"
              label="Repeat password *"
              :rules="equalPasswordRule"
              type="password"></v-text-field>

            <v-card-actions>
              <v-btn
                block
                dark
                color="purple"
                type="submit"
                :loading="loading"
              >Reset</v-btn>
            </v-card-actions>

            <div class="red--text text-xs-center" v-if="error">
              Reset password failed.
              <div class="red--text text-xs-center" v-for="feedback in feedbacks" :key="feedback">
                {{ feedback[0] }}
              </div>
              <div class="red--text text-xs-center" v-if="serverError">
                {{ serverError }}
              </div>
            </div>

          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import AuthService from '@/services/AuthService';

  export default {
    data: () => ({
      loading: false,
      errorMessage: '',
      loadingPhoto: false,
      error: false,
      loadedPhoto: false,
      name: null,
      costumeName: null,
      photo: null,
      email: null,
      password: '',
      passwordConfirmation: '',
      feedbacks: [],
      serverError: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
    }),
    computed: {
      passwordRules () {
        return [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must have at least 8 characters',
        ]
      },
      equalPasswordRule () {
        return [
          () => this.password == this.passwordConfirmation || 'Passwords must be equals',
        ]
      },
      formData () {
        return {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          token: this.$route.query.token,
        }
      }
    },
    methods: {
      resetValidation () {
        this.$refs.form.resetValidation();
      },
      reset () {
        if (!this.$refs.form.validate()) {
          return;
        }

        this.error = false;
        this.loading = true;
        AuthService.reset(this.formData)
          .then(request => {
            this.loading = false;
            AuthService.loginSuccessful(request);
            return true;
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;

            if(typeof error.response == 'undefined'){
              this.serverError = 'Something went wrong, try again later.';
              return;
            }
            
            const formError = Object.values(error.response.data)[0].errors
            this.feedbacks = formError;
          })
      }
    }
  }
</script>