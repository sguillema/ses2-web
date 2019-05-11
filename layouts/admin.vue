<template>
  <v-app id="admin-layout">
    <div class="layout-wrapper">
      <AppSidebar class="left-column" />
      <div class="right-column">
        <Header />
        <div class="main">
          <ContentSidebar />
          <v-content class="content">
            <nuxt />
          </v-content>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import AppSidebar from '../components/Layout/Admin/AppSidebar'
import ContentSidebar from '../components/Layout/Admin/ContentSidebar'
import Header from '../components/Layout/Admin/Header'

export default {
  components: { AppSidebar, Header, ContentSidebar },
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

  .layout-wrapper {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .right-column {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }

    .main {
      flex: 1 1 auto;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      .content {
        overflow-y: auto;
      }
    }
  }
}
</style>
