<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn flat dark v-on="on">
        <v-icon class="account-icon">account_circle</v-icon>
        {{ user.id }}
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-subheader>Settings</v-subheader>
      <v-list-tile
        v-for="(item, index) in items"
        :key="index"
        @click="item.onClick"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { authModule, LOGOUT, USER } from '~/store/auth/methods'

export default {
  props: {
    isDashboard: Boolean
  },

  data() {
    return {
      user: this.$store.getters[authModule(USER)],
      items: [
        {
          title: 'My Information',
          icon: 'account_circle',
          onClick: () => this.$router.push({ path: '/profile' })
        },
        {
          title: 'Sign Out',
          icon: 'exit_to_app',
          onClick: () => {
            this.$store.dispatch(authModule(LOGOUT))
            this.$router.push({ path: '/' })
          }
        }
      ]
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch(authModule(LOGOUT))
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.account-icon {
  margin-right: 5px;
}
</style>
