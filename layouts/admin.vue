<template>
  <v-app id="admin-layout">
    <AppSidebar class="admin-layout-column left-column" />
    <div class="admin-layout-column right-column main">
      <Header />
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
import AppSidebar from '../components/Layout/Admin/AppSidebar'
import Header from '../components/Layout/Admin/Header'

export default {
  components: { AppSidebar, Header },
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

#admin-layout {
  height: 100vh;
  .application--wrap {
    flex-direction: unset;
  }

  .admin-layout-column {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    &.left-column {
    }
    &.right-column {
      flex: 1 1 auto;
    }
    > .content {
      overflow: scroll;
    }
  }
}
</style>
