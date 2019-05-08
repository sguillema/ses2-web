<template>
  <v-app class="app">
    <div class="sidebar"></div>
    <div class="header-and-content">
      <div class="header"></div>
      <div class="content">
        <div class="collapsible-sidebar"></div>
        <v-content>
          <nuxt />
        </v-content>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  mounted() {
    if (process.browser) {
      screen.orientation.lock('portrait')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/global.scss';

.app {
  .application--wrap {
    flex-direction: row;
  }
}

.sidebar {
  background-color: black;
  height: 100vh;
  min-width: 55px;
}

.header-and-content {
  background: green;
  width: 100%;
}

.header {
  background-color: red;
  height: 100px;
}

.content {
  background: orange;
  display: flex;
  flex-direction: row;
}

.collapsible-sidebar {
  height: 100%;
  background-color: gray;
  width: 240px;
}
</style>
