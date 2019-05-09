<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn flat dark v-on="on">
        <v-icon class="account-icon">account_circle</v-icon>
        <div class="text">{{ user.id }}</div>
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-subheader>Profile</v-subheader>
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
          title: 'My Information',
          icon: 'account_circle',
          onClick: () => this.$router.push({ path: '/student/myinformation' })
        },
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
