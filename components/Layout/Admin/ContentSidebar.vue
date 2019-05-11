<template>
  <v-card id="content-sidebar" class="elevation-3">
    <v-navigation-drawer stateless value="true" class="navigation-drawer">
      <v-list class="list">
        <div
          v-for="(section, sectionIndex) in listSections"
          :key="sectionIndex"
        >
          <v-subheader>{{ section.title }}</v-subheader>
          <v-list-tile
            v-for="(link, linkIndex) in section.links"
            :key="linkIndex"
            :to="link.to"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ link.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="sectionIndex !== listSections.length - 1" />
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      listSections: [
        {
          title: 'Bookings',
          links: [
            { title: 'Workshops', icon: 'exit_to_app', to: '/admin/workshops' },
            { title: 'Programs', icon: 'exit_to_app', to: '/admin/programs' },
            {
              title: 'Consultations',
              icon: 'exit_to_app',
              to: '/admin/consultations'
            }
          ]
        },
        {
          title: 'Advisor',
          links: [
            { title: 'Advisors', icon: 'exit_to_app', to: '/admin/advisors' },
            { title: 'Students', icon: 'exit_to_app', to: '/admin/students' },
            {
              title: 'Waiting Lists',
              icon: 'exit_to_app',
              to: '/admin/waitinglists'
            }
          ]
        },
        {
          title: 'Miscellaneous',
          links: [
            { title: 'Skill-set', icon: 'exit_to_app', to: '/admin/skillset' },
            { title: 'Email', icon: 'exit_to_app', to: '/admin/email' },
            { title: 'Reports', icon: 'exit_to_app', to: '/admin/reports' },
            { title: 'Room', icon: 'exit_to_app', to: '/admin/room' },
            { title: 'Messages', icon: 'exit_to_app', to: '/admin/messages' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables';
#content-sidebar {
  background: none;
  width: 240px;
  .navigation-drawer {
    height: 100%;
    background: none;
    .list {
      height: inherit;
      background: none;
    }
    .v-navigation-drawer__border {
      display: none;
    }
  }
}
</style>
