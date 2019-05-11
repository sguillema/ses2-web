<template>
  <v-toolbar id="header" flat height="100">
    <v-toolbar-title>
      <div class="reee">Welcome 12345678.</div>
      <v-breadcrumbs class="breadcrumbs" :items="items">
        <template v-slot:item="props">
          <a
            :href="props.item.href"
            :class="[props.item.disabled && 'disabled']"
          >
            {{ props.item.text.toUpperCase() }}
          </a>
        </template>
      </v-breadcrumbs>
    </v-toolbar-title>
    <v-spacer />
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'admin/dashboard'
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2'
      }
    ]
  })
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
