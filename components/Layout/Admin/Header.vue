<template>
  <v-toolbar id="header" flat height="100">
    <v-toolbar-title>
      <div class="reee">
        {{ getRouteName() }}
      </div>
      <v-breadcrumbs class="breadcrumbs" :items="breadcrumbItems">
        <template v-slot:item="props">
          <v-breadcrumbs-item
            :href="props.item.href"
            :class="[props.item.disabled && 'disabled']"
          >
            {{ props.item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-toolbar-title>
    <v-spacer />
  </v-toolbar>
</template>

<script>
import { authModule, USER } from '~/store/auth/methods'

export default {
  data: () => ({
    dashboardBreadcrumb: {
      text: 'Dashboard',
      disabled: true,
      href: '/admin/dashboard'
    },
    breadcrumbItems: []
  }),
  computed: {
    user: {
      get() {
        return this.$store.getters[authModule(USER)]
      }
    }
  },
  watch: {
    $route() {
      console.log('route changed', this.$route)
      this.buildBreadcrumb()
    }
  },
  mounted() {
    this.buildBreadcrumb()
  },
  methods: {
    buildBreadcrumb() {
      let path = this.$route.path.replace('/admin', '')
      let items = path.split('/').filter(item => item)
      let breadcrumbItems = items.map((item, index) => ({
        text: item,
        disabled: index === items.length - 1,
        href: this.$route.path.split(item)[0] + item
      }))
      if (!(breadcrumbItems[0] && breadcrumbItems[0].text === 'dashboard'))
        breadcrumbItems.unshift({
          text: 'dashboard',
          disabled: !breadcrumbItems.length,
          href: '/admin/dashboard'
        })
      this.breadcrumbItems = breadcrumbItems
    },

    getRouteName() {
      if (this.$route.name === 'admin-dashboard') return this.getDashboardName()
      let routeName = this.$route.name.replace('admin-', '')
      if (this.$route.params.id)
        routeName = routeName.replace('-id', ` ${this.$route.params.id}`)
      return routeName
    },
    getDashboardName() {
      return `Welcome ${this.user.id}.`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
#header {
  background-color: $color-white;
  border-bottom: 1px solid $color-divider-dark;
}

.breadcrumbs {
  padding: 0;
  font-size: 13px;
}
</style>

<style lang="scss">
#header {
  .disabled {
    a {
      color: grey;
    }
    pointer-events: none;
  }
}
</style>
