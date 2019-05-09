<template>
  <v-app class="app">
    <AppSidebar class="column left-column" />
    <div class="column right-column">
      <v-toolbar flat />
      <div class="content">
        <div class="sidebar"></div>
        <v-content>
          <nuxt />
        </v-content>
      </div>
    </div>
  </v-app>
</template>

<script>
import AppSidebar from '../components/AdminDashboard/AppSidebar'

export default {
  components: { AppSidebar },
  data() {
    return {
      drawer: true,
      mini: true
    }
  },
  mounted() {
    if (process.browser) {
      screen.orientation.lock('portrait')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/global.scss';

.column {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.left-column {
  background-color: aqua;
}

.right-column {
  background-color: aquamarine;
  flex: 1 1 auto;
}

.app {
  .application--wrap {
    flex-direction: unset;
  }
}

// .sidebar {
//   background-color: black;
//   height: 100vh;
//   min-width: 55px;
// }

// .header-and-content {
//   background: green;
//   width: 100%;
// }

// .header {
//   background-color: red;
//   height: 100px;
// }

// .content {
//   background: orange;
//   display: flex;
//   flex-direction: row;
// }

// .collapsible-sidebar {
//   height: 100%;
//   background-color: gray;
//   width: 240px;
// }
</style>
