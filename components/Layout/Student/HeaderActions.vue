<template>
  <v-toolbar-items class="items">
    <div v-for="(link, index) in links" :key="index">
      <v-btn flat :to="link.to">
        {{ link.title }}
      </v-btn>
      <div
        class="highlight-route"
        :class="{ active: routePath.includes(link.to) }"
      ></div>
    </div>
    <v-spacer />
    <ProfileMenu />
  </v-toolbar-items>
</template>

<script>
import ProfileMenu from './ProfileMenu'

export default {
  components: { ProfileMenu },
  data() {
    return {
      links: [
        { to: '/student/dashboard', title: 'Home' },
        { to: '/student/bookings', title: 'My Bookings' },
        { to: '/student/messages', title: 'Messages' },
        { to: '/student/faq', title: 'FAQ' }
      ],
      routePath: this.$router.currentRoute.path
    }
  },
  watch: {
    $route(to, from) {
      this.routePath = to.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.items {
  & > div {
    height: inherit;
  }
  margin-left: 34px;
  width: 100%;
}
.theme--light.v-btn,
.v-btn {
  font-size: $font-subtitle;
  color: $color-white;
}

.highlight-route {
  display: table;
  margin: 0 auto;
  height: 5px;
  background-color: $color-white;
  position: relative;
  bottom: 5px;
  width: 0;
  transition: width 0.2s ease-out;

  &.active {
    width: 100%;
  }
}
</style>
