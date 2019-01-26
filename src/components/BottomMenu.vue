<template>
  <div :style="{'height': height}" v-if="showBottomMenu">
    <v-bottom-nav
      :active="activeRoute"
      value="true"
      fixed
      dark
      elevation="5"
      color="purple"
      :height="height"
    >
      <v-btn
        flat
        dark
        value="profile"
        @click="$router.push({ name: 'profile' })"
      >
        <span>Profile</span>
        <v-icon>face</v-icon>
      </v-btn>

      <v-btn
        flat
        dark
        value="vote"
        @click="$router.push({name: 'vote'})"
      >
        <span>Vote</span>
        <v-icon>thumbs_up_down</v-icon>
      </v-btn>

      <v-btn
        flat
        dark
        value="ranking"
        @click="$router.push({ name: 'ranking' })"
      >
        <span>Ranking</span>
        <v-icon>format_list_numbered</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        height: '56px',
      }
    },
    computed: {
      showBottomMenu () {
        return !this.$route.meta.public;
      },
      activeRoute () {
        const route = this.$route.name;
        return route;
      }
    }
  }
</script>