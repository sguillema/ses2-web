<template>
  <v-toolbar-items v-if="isDashboard">
    <v-btn flat to="/styleguide">Styleguide</v-btn>
    <ProfileMenu />
  </v-toolbar-items>
</template>

<script>
import { authModule, LOGOUT } from '~/store/auth/methods'
import ProfileMenu from './ProfileMenu'

export default {
  components: { ProfileMenu },

  props: {
    isDashboard: Boolean
  },

  methods: {
    logOut() {
      this.$store.dispatch(authModule(LOGOUT))
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
