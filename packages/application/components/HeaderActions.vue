<template>
  <v-toolbar-items v-if="isDashboard">
    <v-btn flat @click="logOut">Log Out</v-btn>
  </v-toolbar-items>
</template>

<script>
import { AUTH_LOGOUT } from '../store/auth'

export default {
  props: {
    isDashboard: Boolean
  },

  methods: {
    logOut() {
      this.$store.dispatch(AUTH_LOGOUT)
      this.$router.push({ path: '/' })
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
