<template>
  <v-footer id="footer" style="height: unset;">
    <slot></slot>
    <div class="footer-message">
      {{ $messages.FooterText }}
    </div>
  </v-footer>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';
#footer {
  padding: 13px;
  background-color: $color-black;
  color: $color-white;
  &.v-footer {
    display: block;
  }
  .footer-message {
    width: 100%;
    text-align: center;
    font-size: $font-footer;
  }
}
</style>
