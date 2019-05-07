<template>
  <v-app>
    <v-content>
      <v-container fluid class="app-container">
        <nuxt />
      </v-container>
    </v-content>
    <Footer>
      <FooterLinks />
    </Footer>
  </v-app>
</template>

<script>
import Footer from '~/components/Footer/Footer'
import FooterLinks from '~/components/Footer/FooterLinks'

export default {
  components: { Footer, FooterLinks },
  mounted() {
    if (process.browser) {
      screen.orientation.lock('portrait')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/global.scss';

.app-container {
  padding: 0;
  height: 100%;
}
</style>
