<template>
  <v-menu offset-y top transition="slide-y-reverse-transition">
    <template v-slot:activator="{ on }">
      <v-list-tile-action v-on="on">
        <v-icon class="icon">settings</v-icon>
      </v-list-tile-action>
    </template>
    <v-list dense>
      <v-subheader>Settings</v-subheader>
      <v-list-tile
        v-for="(link, index) in links"
        :key="index"
        @click="link.onClick"
      >
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ link.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { authModule, LOGOUT, USER } from '~/store/auth/methods'

export default {
  props: {
    dark: Boolean
  },

  data() {
    return {
      user: this.$store.getters[authModule(USER)],
      links: [
        {
          title: 'Sign Out',
          icon: 'exit_to_app',
          onClick: () => this.$store.dispatch(authModule(LOGOUT))
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.account-icon {
  margin-right: 16px;
  font-size: 30px;
}
.text {
  font-size: $font-subtitle;
}
</style>
