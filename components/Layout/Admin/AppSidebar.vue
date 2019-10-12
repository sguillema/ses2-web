<template>
  <v-navigation-drawer
    id="app-sidebar"
    dark
    mini-variant
    mini-variant-width="55"
    stateless
    value="true"
    class="black sidebar"
  >
    <v-list>
      <v-list-tile class="logo-list-item">
        <LogoFlag class="logo-flag" />
      </v-list-tile>
      <v-list-tile @click="toggleAdminSidebar()">
        <v-list-tile-action>
          <v-icon class="icon">{{ menuIcon }}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-for="item in items" :key="item.title" @click="item.action">
        <v-list-tile-action>
          <v-icon class="icon">{{ item.icon }}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-spacer />
      <v-list-tile @click="bottomItem.action">
        <ProfileMenu />
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ADMIN_SIDEBAR_OPEN } from '../../../store/methods'
import ProfileMenu from './ProfileMenu'
import LogoFlag from '~/components/Logos/LogoFlag'

export default {
  components: { LogoFlag, ProfileMenu },
  data() {
    return {
      items: [
        { icon: 'search', action: () => console.log('search') },
        {
          icon: 'dashboard',
          action: () => this.$router.push({ path: '/admin/dashboard' })
        }
      ],
      bottomItem: { icon: 'settings', action: () => console.log('settings') }
    }
  },
  computed: {
    sidebarOpen() {
      return this.$store.getters[ADMIN_SIDEBAR_OPEN]
    },
    menuIcon() {
      return this.sidebarOpen ? 'keyboard_arrow_left' : 'menu'
    }
  },
  methods: {
    toggleAdminSidebar() {
      this.$store.commit(ADMIN_SIDEBAR_OPEN, !this.sidebarOpen)
    }
  }
}

// keyboard_arrow_left
</script>

<style lang="scss">
#app-sidebar {
  height: 100%;
  min-width: 55px;
  .logo-list-item {
    height: 92px;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      justify-content: center;
    }
  }
  .logo-flag {
    height: 30px;
  }
  .v-list {
    height: inherit;
    display: flex;
    flex-direction: column;
  }
  .v-list__tile {
    padding: 0;
    width: 100%;
  }
  .v-list__tile__action {
    width: inherit;
  }
  .v-icon {
    font-size: 21px;
  }
}
</style>
