<template>
  <div class="d-block mb-3">
    <v-toolbar fixed dark color="purple darken-1" height="60px">
      <v-spacer class="hidden-xs-only"></v-spacer>
      <h3 class="title font-weight-light text-xs-center grow" :style="titleStyle">
        <img :src="logo" :style="logoStyle" alt="logo" width="35px" />
        <div :style="subtitleStyle">Costume Contest</div>
      </h3>
      <v-spacer class="hidden-xs-only"></v-spacer>
    </v-toolbar>
  </div>
</template>
<script>
  import logo from '../assets/vote.svg'

  export default {
    data () {
      return {
        logo: logo,
        logoStyle: {
          width: '35px',
        },
        titleStyle: {
          position: 'relative'
        },
        subtitleStyle: {
          fontSize: '0.7em',
        },
        avatarStyle: {
          height: '50px',
          width: '50px',
          position: 'absolute',
          right: '10px',
          top: '-6px',
        }
      }
    }
  }
</script>