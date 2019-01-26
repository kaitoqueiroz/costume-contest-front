<template>
  <v-layout>
    <v-layout
      class="justify-center"
      v-if="!noUser && loading"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-layout>


    <v-layout row wrap v-if="noUser">
      <v-flex xs12>
        <v-card color="teal lighten-1" class="white--text text-xs-center pt-4 pb-4">
          <div class="title"><v-icon x-large dark>done</v-icon></div>
          <div class="title">That's all for now!</div>
          <div class="mt-2">Come back later for more!</div>

          <v-card-actions class="justify-center">
            <v-btn outline dark @click="refresh()">Try Again</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-flex v-if="!noUser && !loading" class="text-xs-center">
      <v-card>
        <v-img
          class="white--text"
          :src="photo"
          height="60vh"
          min-height="60vh"
          position="top center"
        >
          <v-layout
            column
            fill-height
            class="text-xs-left lightbox white--text"
          >
            <v-spacer></v-spacer>
            <v-flex
              shrink
              pa-2
              style="background-color: rgba(0, 0, 0, .5)"
            >
              <div class="subheading">{{ name }}</div>
              <div class="body-1">{{ costumeName }}</div>
            </v-flex>
          </v-layout>
        </v-img>
      </v-card>
      <v-btn depressed large color="error" @click="vote(false)">
        <v-icon>thumb_down</v-icon>
      </v-btn>
      <v-btn depressed large color="success" @click="vote(true)">
        <v-icon>thumb_up</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import UserService from '@/services/UserService';

  export default {
    data: () => ({
      currentUser: null,
      photo: null,
      name: null,
      costumeName: null,
      loading: false,
      noUser: false,
    }),
    created () {
      this.getNext();
    },
    methods: {
      vote (option) {
        this.voteAndGetNext(option);
      },
      refresh () {
        this.getNext();
      },
      voteAndGetNext (vote) {
        this.loading = true;
        this.noUser = false;

        UserService.voteAndGetNext(
          {
            user_id: this.currentUser,
            vote: vote,
          })
          .then((result) => {
            this.setData(result.data);
          });
      },
      getNext () {

        this.loading = true;
        this.noUser = false;

        UserService.getNext()
          .then((result) => {
            this.setData(result.data);
          })
      },
      setData (data) {
        if(data.length == 0){
          this.noUser = true;
          return;
        }
        this.currentUser = data.user_id;
        this.photo = data.photo;
        this.name = data.user.name;
        this.costumeName = data.name;

        this.loading = false;
      }
    }
  }
</script>