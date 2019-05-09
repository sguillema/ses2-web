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
import LogoFlag from '~/components/Logos/LogoFlag'
import ProfileMenu from './ProfileMenu'
export default {
  components: { LogoFlag, ProfileMenu },
  data() {
    return {
      items: [
        { icon: 'menu', action: () => console.log('menu') },
        {
          icon: 'dashboard',
          action: () => this.$router.push({ path: '/admin/dashboard' })
        },
        { icon: 'search', action: () => console.log('search') }
      ],
      bottomItem: { icon: 'settings', action: () => console.log('settings') }
    }
  }
}
</script>

<style lang="scss">
#app-sidebar {
  height: 100%;
  min-width: 55px;
  .logo-list-item {
    height: 92px;
    display: flex;
    align-items: center;
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
