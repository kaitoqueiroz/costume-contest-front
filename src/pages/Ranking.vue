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

    <v-list v-if="ready">
      <div class="title ml-2 mb-2"> 
        <v-icon>format_list_numbered</v-icon>
        Ranking
      </div>
      <template v-for="(item, index) in items">
        <v-list-tile
          avatar
          v-if="item"
          :key="index"
        >
          <v-list-tile-avatar>
            <img :src="item.photo">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="item.user.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="(item.name != 'null') ? item.name : ''"></v-list-tile-sub-title>
          </v-list-tile-content>

          <div class="text-xs-center">
            <div>
              <v-list-tile-action-text>Votes</v-list-tile-action-text>
            </div>
            <v-list-tile-action-text v-text="item.user.votes.length"></v-list-tile-action-text>
          </div>
        </v-list-tile>
        <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
  import UserService from '@/services/UserService';

  export default {
    data () {
      return {
        ready: false,
        items: []
      }
    },
    mounted () {
      UserService.getRanking()
        .then((result) => {
          this.items = result.data.sort((a,b) => {
            return b.user.votes.length - a.user.votes.length
          });
          this.ready = true;
        })
    },
    methods: {
    }
  }
</script>