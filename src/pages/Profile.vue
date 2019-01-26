<template>
  <div>
    <v-layout
      v-if="!ready"
      class="justify-center"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <v-layout v-if="ready" column class="v-list theme--light px-2">
      <v-flex>
        <div class="d-flex align-center justify-center">
          <div class="title">
            <v-icon>account_box</v-icon>
            My Profile
          </div>
          <div class="text-xs-right">
            <v-btn
              @click="logout"
              outline
              color="purple">Logout</v-btn>
          </div>
        </div>
      </v-flex>
      <v-divider class="mt-2"></v-divider>

      <v-form
        ref="form"
        @submit.prevent="update"
      >
        <div class="mt-4">
          <v-text-field
            v-model="email"
            label="Email"
            disabled
            box
          ></v-text-field>
        </div>

        <div>
          <label class="v-label v-label--active theme--light mb-1">Your Name *</label>
          <v-text-field
            solo
            v-model="name"
            :rules="nameRules"
          ></v-text-field>
        </div>

        <v-alert type="info" :value="true">
          Your profile only appears for voting if you enter a costume photo.
        </v-alert>
        
        <div class="mt-3">
          <label class="v-label v-label--active theme--light mb-1">Costume Name *</label>
          <v-text-field
            solo
            single-line
            v-model="costumeName"
            required
          ></v-text-field>
        </div>

        <input id="file" type="file" ref="file" v-on:change="handleFileUpload()" class="d-none" />
        <label class="v-label v-label--active theme--light mb-1">Costume Photo</label>
        <label for="file">
          <v-flex class="text-xs-center">
            <v-card>
              <v-img
                class="white--text"
                :src="photo || noimage"
                height="60vh"
                position="top center"
              >
                <v-layout
                  column
                  fill-height
                  class="text-xs-left lightbox white--text"
                >
                  <v-spacer></v-spacer>
                  <div
                    class="pt-2 pb-2"
                    style="background-color: rgba(0, 0, 0, .5)"
                  >
                    <div class="subheading">
                      <div class="text-xs-center">
                        <v-icon dark size="20">camera_alt</v-icon>
                        <span> Change Photo </span>
                      </div>
                    </div>
                  </div>
                </v-layout>
              </v-img>
            </v-card>
          </v-flex>
        </label>
        <v-divider class="mt-3 mb-3"></v-divider>

        <div class="text-xs-center mb-3">
          <v-btn
            dark
            color="teal"
            type="submit"
            :loading="loading"
          >
            {{ buttonName }}
          </v-btn>
        </div>

        <div class="red--text text-xs-center" v-if="error">
          Update failed.
          <div class="red--text text-xs-center" v-for="feedback in feedbacks" :key="feedback">
            <div>{{ feedback[0] }}</div>
          </div>
        </div>
      </v-form>
    </v-layout>
  </div>
</template>

<script>
  import AuthService from '@/services/AuthService';
  import UserService from '@/services/UserService';
  import noimage from '../assets/noimage.jpg'

  export default {
    data: () => ({
      ready: false,
      loading: false,
      error: false,
      buttonName: 'Update Profile',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      photo: null,
      name: null,
      costumeName: null,
      noimage: noimage,
      email: null,
      feedbacks: [],
      file: ''
    }),
    mounted () {
      UserService.profile()
        .then((result) => {
          this.name = result.data.name;
          this.email = result.data.email;
          this.costumeName = (result.data.costume.name != 'null') ? result.data.costume.name : '';
          this.photo = result.data.costume.photo;
          this.ready = true;
        })
    },
    computed: {
      formData () {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('costume_name', this.costumeName);
        formData.append('photo', this.file);

        return formData;
      }
    },
    methods: {
      logout () {
        AuthService.logout();
      },
      update () {
        if (!this.$refs.form.validate()) {
          return;
        }

        this.error = false;
        this.loading = true;

        UserService.update(this.formData)
          .then(() => {
            this.loading = false;
            this.showUpdatedButton();
            return true;
          })
          .catch((error) => {
            this.feedbacks = Object.values(error.response.data)[0].errors;
            
            this.loading = false;
            this.error = true;
          })
      },
      showUpdatedButton(){
        this.buttonName = 'Updated!'

        const self = this;
        setTimeout(function(){
          self.buttonName = 'Update Profile';
        }, 3000)
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];

        var reader = new FileReader();

        const self = this;
        reader.onload = function(e) {
          self.photo = e.target.result;
        }

        reader.readAsDataURL(this.file);
      }
    }
  }
</script>