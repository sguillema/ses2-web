<template>
  <v-app>
    <Header landing-page />
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
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import FooterLinks from '~/components/FooterLinks'

export default {
  components: { Footer, FooterLinks, Header },
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
