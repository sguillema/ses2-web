<template>
  <v-toolbar id="header" app />
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dummy: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
#header {
  height: 70px;
  background-color: $color-primary;
}
</style>
