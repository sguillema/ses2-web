<template>
  <v-toolbar
    id="header"
    :class="userType || ''"
    :flat="landingPage"
    :height="landingPage ? 110 : undefined"
    app
  >
    <v-toolbar-title>
      <Logo light />
    </v-toolbar-title>
    <v-spacer />
    <HeaderActions :is-dashboard="!landingPage" />
  </v-toolbar>
</template>

<script>
import Logo from '../Logo/Logo'
import HeaderActions from './HeaderActions'
import { authModule, TYPE } from '~/store/auth/methods'

export default {
  components: { Logo, HeaderActions },
  props: {
    landingPage: Boolean
  },

  data() {
    return {
      userType: this.$store.getters[authModule(TYPE)]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
#header {
  background-color: $color-primary;
  &.admin {
    background-color: $color-black;
  }
  &.landing-page {
    height: 110px;
  }
}
.v-toolbar__title {
  height: 55%;
}
</style>
