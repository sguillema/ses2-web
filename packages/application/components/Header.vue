<template>
  <v-toolbar
    id="header"
    :flat="landingPage"
    :height="landingPage ? 110 : undefined"
    app
  >
    <v-toolbar-title>
      <Logo light />
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import Logo from './Logo'

export default {
  components: { Logo },
  props: {
    landingPage: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
#header {
  background-color: $color-primary;
  &.landing-page {
    height: 110px;
  }
}
.v-toolbar__title {
  height: 55%;
}
</style>
