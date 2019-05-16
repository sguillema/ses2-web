<template>
  <v-toolbar id="header" app>
    <v-toolbar-title>
      <Logo light />
    </v-toolbar-title>
    <HeaderActions />
  </v-toolbar>
</template>

<script>
import Logo from '../../Logos/LogoMain'
import HeaderActions from './HeaderActions'
import { authModule, TYPE } from '~/store/auth/methods'

export default {
  components: { Logo, HeaderActions },

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
}
.v-toolbar__title {
  height: 55%;
}
</style>
