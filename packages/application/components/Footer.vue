<template>
  <v-footer id="footer" app>
    <div class="footerMessage">
      {{ $messages.FooterText }}
    </div>
  </v-footer>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
#footer {
  height: 40px;
  background-color: $color-black;
  color: $color-white;

  .footerMessage {
    width: 100%;
    text-align: center;
  }
}
</style>
