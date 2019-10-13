<template>
  <v-sheet v-if="alt" class="sheet-alt" elevation="3">
    <div>
      <div
        v-if="!!header"
        class="header"
        :class="{
          red: color == 'red',
          black: color == 'black',
          centered
        }"
      >
        <h2>{{ header }}</h2>
      </div>
    </div>
    <slot></slot>
  </v-sheet>
  <v-sheet v-else class="sheet" elevation="3">
    <div v-if="!!header" class="header" :class="{ centered }">
      <h2>{{ header }}</h2>
    </div>
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  props: {
    header: { type: String, required: false, default: '' },
    alt: { type: Boolean, required: false, default: false },
    color: { type: String, require: false, default: 'black' },
    centered: { type: Boolean, required: false, default: false }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.sheet {
  padding: 14px 16px;
  .header {
    padding-left: 30px;
    background-color: $color-primary;
    width: 100%;
    margin-bottom: 16px;
    &.centered {
      padding-right: 30px;
      text-align: center;
    }
    h2 {
      color: $color-white;
      font-size: $font-cardtitle;
      line-height: 28px;
    }
  }
}

.sheet-alt {
  margin-top: 14px;
  padding: 14px 16px;
  padding-top: 34px;
  > div {
    display: flex;
    justify-content: center;
    .header {
      position: absolute;
      top: -14px;
      padding: 0 20px;
      width: calc(100% - 35px);
      height: 38px;
      display: flex;
      align-items: center;
      &.black {
        background-color: $color-black !important;
      }
      &.red {
        background-color: $color-primary !important;
      }
      &.centered {
        justify-content: center;
      }
      h2 {
        color: $color-white;
      }
    }
  }
}
</style>
