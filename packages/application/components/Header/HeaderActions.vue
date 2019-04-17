<template>
  <v-toolbar-items v-if="isDashboard">
    <v-btn flat to="/styleguide">Styleguide</v-btn>
    <v-btn flat @click="logOut">Log Out</v-btn>
  </v-toolbar-items>
</template>

<script>
let storeModule, AUTH, LOGOUT

export default {
  props: {
    isDashboard: Boolean
  },

  created() {
    storeModule = this.$helpers.storeModule
    AUTH = this.$storeStrings.AUTH
    LOGOUT = this.$storeStrings.LOGOUT
  },

  methods: {
    logOut() {
      this.$store.dispatch(storeModule(AUTH, LOGOUT))
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.theme--light.v-btn,
.v-btn {
  color: $color-white;
}
</style>
