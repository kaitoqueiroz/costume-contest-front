<template>
  <v-app>
    <Toolbar/>
    <v-content>
      <v-container fluid fill-height class="mt-4">
        <v-layout align-center justify-center>
          <v-flex shrink class="xs12 sm4">
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <BottomMenu/>
  </v-app>
</template>

<script>
  import BottomMenu from './components/BottomMenu'
  import Toolbar from './components/Toolbar'

  export default {
    components: {
      BottomMenu,
      Toolbar,
    },
    data: () => ({
      drawer: true,
    })
  }
</script>