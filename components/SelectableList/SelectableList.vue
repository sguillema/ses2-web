<template>
  <v-list class="selectable-list">
    <v-list-tile
      v-for="(item, index) in items"
      :key="index"
      class="selectable-item"
      :class="[selectedIndex === index && 'selected']"
      @click="selectIndex(index)"
    >
      <v-list-tile-content class="selectable-list-content">
        {{ item.title }}
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    select: { type: Function, required: true }
  },
  data() {
    return {
      selectedIndex: null
    }
  },
  methods: {
    selectIndex(index) {
      this.selectedIndex = index
      this.select(index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.selectable-list {
  margin-bottom: 10px;
  .selectable-item {
    background-color: $color-divider;
    margin: 2px;
    .selectable-list-content {
      color: $color-darkgray;
      font-size: $font-regular;
      font-weight: $fontweight-bold;
    }
    &.selected {
      background-color: $color-primary;
      .selectable-list-content {
        color: $color-white;
      }
    }
  }
}
</style>
