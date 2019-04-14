<template>
  <v-toolbar-items v-if="isDashboard">
    <v-btn flat @click="logOut">Log Out</v-btn>
  </v-toolbar-items>
</template>

<script>
import AuthService from '../core/AuthService'

export default {
  props: {
    isDashboard: Boolean
  },

  methods: {
    logOut() {
      AuthService.endSession(this.$store)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

button.v-btn {
  color: $color-white;
}
</style>
