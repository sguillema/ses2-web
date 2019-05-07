<template>
  <v-sheet class="sheet" elevation="3">
    <div v-if="!!header" class="header">
      <h2>{{ header }}</h2>
    </div>
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  props: {
    header: { type: String, required: false, default: '' }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.sheet {
  padding: 14px;
}

.header {
  padding-left: 30px;
  background-color: $color-primary;
  width: 100%;
  margin-bottom: 16px;
  h2 {
    color: $color-white;
    font-size: $font-cardtitle;
    line-height: 28px;
  }
}
</style>
